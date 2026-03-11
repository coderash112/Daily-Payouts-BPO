# 🚀 Quick Start Guide

## Step 1: Extract & Install (2 minutes)

```bash
# Extract the zip file
unzip bpo-services-website.zip -d my-bpo-website
cd my-bpo-website

# Install dependencies
yarn install
# OR
npm install
```

## Step 2: Setup Environment Variables (5 minutes)

Create a `.env` file in the root directory:

```env
# MongoDB (use local or MongoDB Atlas)
MONGO_URL=mongodb://localhost:27017/bpo_services

# App URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Google Sheets Service Account
GOOGLE_SERVICE_ACCOUNT_EMAIL=website-sheets-bot@bpo-website-integration.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=1N1rxSh9mBTQ72p31Lk9DrgAUxxmScnT3SvVrHj_2mGU

# Gmail SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
SMTP_TO_EMAIL=recipient@example.com
```

### Get Gmail App Password:
1. Visit: https://myaccount.google.com/apppasswords
2. Enable 2-Step Verification if needed
3. Create app password for "Mail"
4. Copy 16-character password to `.env`

### Get Google Service Account:
1. Visit: https://console.cloud.google.com
2. Create project → Enable Google Sheets API
3. Create Service Account → Download JSON key
4. Copy `client_email` and `private_key` to `.env`
5. **Important:** Share your Google Sheet with the service account email (Editor access)

## Step 3: Run the Website (1 minute)

```bash
# Start development server
yarn dev

# Open browser
http://localhost:3000
```

## Step 4: Test Everything

1. **Test the website:** Open http://localhost:3000
2. **Toggle theme:** Click sun/moon icon
3. **Test chat widget:** Click floating chat button
4. **Submit a test lead:**
   - Company: "Test Corp"
   - City: "New York"
   - Seats: "50"
   - Name: "John Doe"
   - Email: "john@test.com"
   - Phone: "+1-555-0123"
5. **Check results:**
   - MongoDB: Lead saved
   - Google Sheet: New row added
   - Email: Notification received

## 🌐 Deploy to Production

### Vercel (Easiest - Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard:
# Settings → Environment Variables → Add each variable from .env
```

### DigitalOcean / AWS / Any VPS

```bash
# Build for production
yarn build

# Install PM2
npm install -g pm2

# Start with PM2
pm2 start yarn --name "bpo-website" -- start

# Save PM2 config
pm2 save
pm2 startup
```

### Docker

```bash
# Build
docker build -t bpo-website .

# Run
docker run -p 3000:3000 --env-file .env bpo-website
```

## 📝 Customize Your Website

### Update Company Name
Edit `/app/page.js` - Line 198:
```javascript
BPO Services → Your Company Name
```

### Update Contact Email
Edit `/app/page.js` - Line 485:
```javascript
ashrut@gorack.in → your-email@company.com
```

### Update Services
Edit `/app/page.js` - Lines 17-29:
```javascript
const services = [
  { icon: Car, title: 'Your Service', description: 'Your description' },
  // Add/remove services here
]
```

### Change Colors
Edit `/app/globals.css`:
```css
:root {
  --primary: 220 70% 50%;  /* Change these values */
  --background: 0 0% 100%;
}
```

## 🆘 Common Issues & Solutions

### MongoDB Not Connecting
```bash
# Install MongoDB locally
# Mac: brew install mongodb-community
# Ubuntu: sudo apt install mongodb
# Windows: Download from mongodb.com

# Or use MongoDB Atlas (cloud - free tier)
# Visit: https://www.mongodb.com/cloud/atlas/register
```

### Port 3000 Already in Use
```bash
# Change port in package.json
"dev": "next dev -p 3001"
```

### Google Sheets Not Working
- ✅ Share sheet with service account email
- ✅ Check private key format (must have \n)
- ✅ Verify Sheet ID is correct

### Email Not Sending
- ✅ Use App Password, not regular password
- ✅ Enable 2-Step Verification on Gmail
- ✅ Check SMTP settings

## 📚 Full Documentation

For complete deployment options and advanced configuration, see:
**DEPLOYMENT_GUIDE.md**

## 🎯 You're Ready!

Your website includes:
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Dark/Light theme
- ✅ Lead capture system
- ✅ Database integration
- ✅ Email notifications
- ✅ Google Sheets sync
- ✅ Professional animations

**Questions?** Check DEPLOYMENT_GUIDE.md for detailed instructions!

---
**Happy deploying! 🚀**
