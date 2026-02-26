import { MongoClient } from 'mongodb'
import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const uri = process.env.MONGO_URL

async function connectDB() {
  const client = new MongoClient(uri)
  await client.connect()
  return client.db('bpo_services')
}

// Get Google Sheets Access Token using JWT
async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000)
  
  const payload = {
    iss: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  }
  
  // Sign JWT with private key
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  const signedJWT = jwt.sign(payload, privateKey, { algorithm: 'RS256' })
  
  // Exchange JWT for access token
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${signedJWT}`
  })
  
  const data = await response.json()
  
  if (data.error) {
    throw new Error(`Google Auth Error: ${data.error} - ${data.error_description || ''}`)
  }
  
  return data.access_token
}

// Email Setup
function getEmailTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

async function saveToGoogleSheets(data) {
  try {
    const accessToken = await getAccessToken()
    const spreadsheetId = process.env.GOOGLE_SHEET_ID
    
    // Append the new data using simpler range
    const values = [[
      new Date().toLocaleString(),
      data.companyName,
      data.city,
      data.seats,
      data.contactName,
      data.email,
      data.phone,
    ]]
    
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A:G:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values })
      }
    )
    
    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Sheets API error: ${error}`)
    }

    return { success: true }
  } catch (error) {
    console.error('Google Sheets Error:', error)
    throw new Error(`Failed to save to Google Sheets: ${error.message}`)
  }
}

async function sendEmailNotification(data) {
  try {
    const transporter = getEmailTransporter()

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_TO_EMAIL,
      subject: `New Lead: ${data.companyName} - ${data.city}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">New Lead Submission</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">Company Information</h3>
            <p><strong>Company Name:</strong> ${data.companyName}</p>
            <p><strong>City:</strong> ${data.city}</p>
            <p><strong>Number of Seats:</strong> ${data.seats}</p>
          </div>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #1f2937;">Contact Details</h3>
            <p><strong>Name:</strong> ${data.contactName}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Phone:</strong> ${data.phone}</p>
          </div>
          <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
            Submitted on: ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Email Error:', error)
    throw new Error(`Failed to send email: ${error.message}`)
  }
}

export async function POST(request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.companyName || !data.city || !data.seats || !data.contactName || !data.email || !data.phone) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const leadData = {
      companyName: data.companyName,
      city: data.city,
      seats: data.seats,
      contactName: data.contactName,
      email: data.email,
      phone: data.phone,
      createdAt: new Date(),
    }

    // Save to MongoDB
    const database = await connectDB()
    const leads = database.collection('leads')
    const mongoResult = await leads.insertOne(leadData)

    // Save to Google Sheets (parallel with email)
    const [sheetsResult, emailResult] = await Promise.allSettled([
      saveToGoogleSheets(leadData),
      sendEmailNotification(leadData),
    ])

    const warnings = []
    if (sheetsResult.status === 'rejected') {
      console.error('Sheets error:', sheetsResult.reason)
      warnings.push('Google Sheets sync failed')
    }
    if (emailResult.status === 'rejected') {
      console.error('Email error:', emailResult.reason)
      warnings.push('Email notification failed')
    }

    return NextResponse.json({
      success: true,
      id: mongoResult.insertedId,
      message: 'Lead submitted successfully',
      warnings: warnings.length > 0 ? warnings : undefined,
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
