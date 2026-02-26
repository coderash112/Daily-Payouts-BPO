# BPO Services Website - Complete Package

## 📦 What's Inside

This is a complete, production-ready Next.js website for BPO & IT services with:

- ✅ **Fully Responsive Design** - Perfect on mobile, tablet, and desktop
- ✅ **Dark/Light Theme Toggle** - User preference persists
- ✅ **Interactive Chat Widget** - 4-step lead capture form
- ✅ **MongoDB Integration** - All leads saved to database
- ✅ **Google Sheets Sync** - Automatic lead export to spreadsheet
- ✅ **Email Notifications** - Instant alerts via Gmail SMTP
- ✅ **Premium Animations** - Smooth Framer Motion effects
- ✅ **SEO Optimized** - Proper metadata and structure

## 🚀 Quick Start (5 Minutes)

### 1. Extract Files
```bash
unzip bpo-services-website-complete.zip
cd bpo-services-website-complete
```

### 2. Install Dependencies
```bash
yarn install
# or
npm install
```

### 3. Configure Environment
Copy `.env` and update with your credentials:
- MongoDB connection string
- Google Service Account details
- Gmail SMTP credentials

### 4. Run Development Server
```bash
yarn dev
```

Visit: http://localhost:3000

**📖 For detailed setup instructions, see: [QUICKSTART.md](QUICKSTART.md)**

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Fast setup guide (5 minutes)
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Complete deployment options (Vercel, Docker, VPS)

## 🌟 Features Overview

### Frontend
- Modern SaaS-style design with glassmorphism
- 12 service cards with icons and hover effects
- "Why Choose Us" section with 5 key benefits
- About Team section with statistics
- Contact footer with social links
- Floating chat button with multi-step form

### Backend
- Health check endpoint: `/api/health`
- Lead submission endpoint: `/api/leads`
- MongoDB for data persistence
- Google Sheets API integration
- Nodemailer for email notifications
- Full form validation

### Tech Stack
- **Framework:** Next.js 14.2.3
- **Styling:** Tailwind CSS + Shadcn/ui
- **Animations:** Framer Motion
- **Database:** MongoDB
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React

## 📝 Environment Variables Required

Create a `.env` file with:

```env
MONGO_URL=your_mongodb_connection_string
NEXT_PUBLIC_BASE_URL=http://localhost:3000
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="your_private_key_here"
GOOGLE_SHEET_ID=your_google_sheet_id
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_specific_password
SMTP_TO_EMAIL=recipient@example.com
```

## 🎨 Customization

### Update Company Branding
Edit `/app/page.js`:
- Line 198: Company name
- Line 485: Contact email
- Lines 17-29: Services list

### Change Theme Colors
Edit `/app/globals.css`:
```css
:root {
  --primary: 220 70% 50%;
  --background: 0 0% 100%;
  /* Update these values */
}
```

### Update SEO
Edit `/app/layout.js`:
```javascript
export const metadata = {
  title: 'Your Company Name',
  description: 'Your description',
}
```

## 🌐 Deployment Options

### Vercel (Recommended)
```bash
vercel
```

### Docker
```bash
docker build -t bpo-website .
docker run -p 3000:3000 bpo-website
```

### VPS (Ubuntu/Debian)
```bash
yarn build
pm2 start yarn --name "bpo-website" -- start
```

**See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions**

## 🧪 Testing

Test the API endpoints:

```bash
# Health check
curl http://localhost:3000/api/health

# Submit test lead
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

## 📱 Responsive Breakpoints

- **Mobile:** < 768px (single column)
- **Tablet:** 768px - 1024px (2 columns)
- **Desktop:** > 1024px (3 columns)

## 🔒 Security Features

- Environment variables for all secrets
- Form validation on frontend and backend
- Email format validation
- Required field validation
- CORS headers configured

## 📊 File Structure

```
├── app/
│   ├── api/
│   │   ├── health/route.js      # Health endpoint
│   │   └── leads/route.js       # Lead submission
│   ├── globals.css              # Global styles
│   ├── layout.js                # Root layout
│   └── page.js                  # Main page
├── components/ui/               # Shadcn components
├── lib/utils.js                 # Utilities
├── .env                         # Environment vars
├── package.json                 # Dependencies
├── QUICKSTART.md                # Quick setup
└── DEPLOYMENT_GUIDE.md          # Full deployment docs
```

## 🆘 Support & Troubleshooting

### Common Issues

**MongoDB not connecting?**
- Check if MongoDB is running
- Verify connection string
- For Atlas: whitelist your IP

**Google Sheets not working?**
- Share sheet with service account email (Editor)
- Verify private key format in .env
- Enable Google Sheets API

**Emails not sending?**
- Use Gmail App Password (not regular password)
- Enable 2-Step Verification
- Check SMTP settings

## 📞 Additional Resources

- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- MongoDB: https://www.mongodb.com/docs/
- Shadcn/ui: https://ui.shadcn.com/

## 📄 License

This project is ready for commercial use. Customize and deploy as needed!

---

## 🎯 Next Steps

1. Read [QUICKSTART.md](QUICKSTART.md) for fast setup
2. Configure your environment variables
3. Run `yarn dev` to start developing
4. Test the chat widget and integrations
5. Deploy using [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

**Made with ❤️ for your BPO business success!**

Need help? Check the deployment guide for detailed troubleshooting.
