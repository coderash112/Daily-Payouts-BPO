# BPO Services Website - Deployment Guide

## 📦 Package Contents

This package contains a complete Next.js website with:
- Premium BPO & IT Services website
- Dark/Light theme support
- Chat widget for lead capture
- MongoDB, Google Sheets, and Email integrations
- Fully responsive design

## 🚀 Quick Start

### 1. Prerequisites

Make sure you have installed:
- Node.js 18+ (https://nodejs.org/)
- MongoDB (local or cloud like MongoDB Atlas)
- Yarn package manager: `npm install -g yarn`

### 2. Installation

```bash
# Extract the zip file
unzip bpo-services-website.zip -d bpo-website

# Navigate to project directory
cd bpo-website

# Install dependencies
yarn install

# Or use npm
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory with the following:

```env
# MongoDB Connection
MONGO_URL=mongodb://localhost:27017/bpo_services
# Or for MongoDB Atlas:
# MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/bpo_services

# App URL (update with your domain)
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Google Sheets Service Account
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-google-sheet-id

# Gmail SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
SMTP_TO_EMAIL=recipient@example.com
```

### 4. Google Sheets Setup

1. Go to Google Cloud Console (https://console.cloud.google.com)
2. Create a new project
3. Enable Google Sheets API
4. Create a Service Account and download the JSON key
5. Copy `client_email` and `private_key` to your `.env` file
6. Share your Google Sheet with the service account email (Editor access)

### 5. Gmail SMTP Setup

1. Go to Google Account Security: https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Go to App Passwords: https://myaccount.google.com/apppasswords
4. Create an app password for "Mail"
5. Copy the 16-character password to `SMTP_PASS` in `.env`

### 6. Run Development Server

```bash
# Start the development server
yarn dev

# Or with npm
npm run dev
```

Visit http://localhost:3000 to see your website!

## 🌐 Production Deployment

### Option 1: Vercel (Recommended for Next.js)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### Option 2: Docker

```bash
# Build production
yarn build

# Create Dockerfile (example):
FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]

# Build and run
docker build -t bpo-website .
docker run -p 3000:3000 --env-file .env bpo-website
```

### Option 3: VPS (Ubuntu/Debian)

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
# Follow: https://www.mongodb.com/docs/manual/installation/

# Clone/upload your project
cd /var/www
# Upload your files here

# Install dependencies
yarn install

# Build for production
yarn build

# Install PM2 for process management
npm install -g pm2

# Start the application
pm2 start yarn --name "bpo-website" -- start

# Setup nginx as reverse proxy (optional)
sudo apt install nginx

# Create nginx config at /etc/nginx/sites-available/bpo-website
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site and restart nginx
sudo ln -s /etc/nginx/sites-available/bpo-website /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

## 📝 File Structure

```
bpo-website/
├── app/
│   ├── api/
│   │   ├── health/route.js      # Health check endpoint
│   │   └── leads/route.js       # Lead submission API
│   ├── globals.css              # Global styles
│   ├── layout.js                # Root layout with theme
│   └── page.js                  # Main homepage
├── components/
│   └── ui/                      # Shadcn UI components
├── lib/
│   └── utils.js                 # Utility functions
├── .env                         # Environment variables (create this)
├── package.json                 # Dependencies
├── tailwind.config.js           # Tailwind configuration
└── next.config.js               # Next.js configuration
```

## 🔧 Configuration

### Update Content

Edit `/app/page.js` to customize:
- Company name and branding
- Services list
- Contact information
- Social media links

### Customize Colors

Edit `/app/globals.css` to change theme colors:
```css
:root {
  --primary: YOUR_COLOR;
  --background: YOUR_COLOR;
  /* etc */
}
```

### Update SEO

Edit `/app/layout.js` metadata:
```javascript
export const metadata = {
  title: 'Your Company Name',
  description: 'Your description',
}
```

## 🧪 Testing

```bash
# Test the health endpoint
curl http://localhost:3000/api/health

# Test lead submission
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "Test Corp",
    "city": "New York",
    "seats": "50",
    "contactName": "John Doe",
    "email": "john@test.com",
    "phone": "+1-555-0123"
  }'
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Check if MongoDB is running: `sudo systemctl status mongodb`
- Verify connection string in `.env`
- For Atlas, whitelist your IP address

### Google Sheets Not Working
- Verify service account email has Editor access to the sheet
- Check that the private key is properly formatted in `.env`
- Ensure Google Sheets API is enabled in Cloud Console

### Email Not Sending
- Verify Gmail app password (not regular password)
- Check SMTP settings are correct
- Ensure 2-Step Verification is enabled on Google Account

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or change port in package.json
"dev": "next dev -p 3001"
```

## 📊 Features

✅ Fully responsive (mobile, tablet, desktop)
✅ Dark/Light theme with persistence
✅ Step-by-step chat widget for lead capture
✅ MongoDB database integration
✅ Google Sheets auto-sync
✅ Email notifications
✅ Form validation
✅ Smooth animations (Framer Motion)
✅ SEO optimized
✅ Accessibility friendly

## 🔒 Security Notes

1. **Never commit `.env` file to Git**
2. Use environment variables for all secrets
3. Enable MongoDB authentication in production
4. Use HTTPS in production (Let's Encrypt)
5. Keep dependencies updated: `yarn upgrade`

## 📞 Support

For issues or questions:
- Check Next.js docs: https://nextjs.org/docs
- MongoDB docs: https://www.mongodb.com/docs/
- Tailwind CSS: https://tailwindcss.com/docs

## 📄 License

This project is ready for commercial use. Customize as needed!

---

**Made with ❤️ for your BPO business success!**
