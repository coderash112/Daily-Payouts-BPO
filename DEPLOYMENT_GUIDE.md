# 🔄 Files to Update in Your GitHub Repo

## ✅ MongoDB Removed - Only Google Sheets + Email Now!

---

## 📋 FILES TO COPY (2 Files Only)

### 1️⃣ `/app/api/leads/route.js`
**Location in your repo:** `app/api/leads/route.js`

**Action:** Replace the entire file with the updated version

**What changed:**
- ❌ Removed MongoDB connection
- ❌ Removed database save logic
- ✅ Kept Google Sheets integration
- ✅ Kept Email notifications
- ✅ Better error handling

---

### 2️⃣ `/package.json`
**Location in your repo:** `package.json` (root folder)

**Action:** Replace the entire file with the updated version

**What changed:**
- ❌ Removed `"mongodb": "^6.6.0"`
- ❌ Removed `"googleapis": "^144.0.0"`
- ✅ Added `"jsonwebtoken": "^9.0.3"` (for Google Sheets auth)
- ✅ All other dependencies stay the same

---

## 🔧 VERCEL ENVIRONMENT VARIABLES

### ✅ Keep These (Required):
```
GOOGLE_SERVICE_ACCOUNT_EMAIL=website-sheets-bot@bpo-website-integration.iam.gserviceaccount.com

GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQClZlv36EXY7EmS\nRI8/41hB8nSV8D069kwnlYXl0AspPjaAOiTv0V72k9kL5JvyRBlf1En49wqImhwt\nAXHUP04SvAaBmOgF7PIFIdUGRgwqlwFj6Rc3PmWBkLwO0JROBTojraxiR/qFVAc2\nVA4P5jG2cS1NF7C6rMgIpKRUyZhdsNg2rDUWSrtJ001Y7VLK9IjWOpL4uUY3rVSN\nmxUEMl9sK+0p7dH/p1/mvUfuVaUTyLZdxckoykhSzYgeIY/HWcBn1dqhkE6vywn8\nDIOtjdt2nKTBfsWosnNrEGvVWu11Vmv2TxOGBYH7eN3R5sRzCsjUFvjtjCF5Ocfq\ncE7eqbMHAgMBAAECggEAAyRfqOT7trQ+bY3p3r/V5GLTvilzMFSPe80GXyhFngH1\njRgNrZSfpjWG0QgFwmNyy/Q/d4BR7ehnkp9NZ0fQluCFix65gatPqbNL1bOs9X4q\n45gA/easjPqP6AQkXRsSUK0y8icF5lSDUo/kOH8aAKpDvwwtKk6v+iIOkSHHSDhV\nAaXEuRSxmazR2CDK/W7+T9dL5QiHGTxLZwbigGlXP8lBaW1sz34FaGuNeRk+nAQA\n/xwnF+AdJOHSWgfZ5U16Xi05dNMc3IjTOr0XIz2rHNctVZpWAG4+4LPAe/frliqW\nLjmiTwE+pUInQu01Rq1C41mwFfRUZ6wRlgEzh7YkoQKBgQDPeTr04ST5Pwwh6a35\nyZEyZWljzRteRM7lBYlhlf4qvebMRBq4tJ3vIO4OQeubM6vRJ7tGs1QgDiaEEgLM\nORgKPhmhts6W6r/0YrsHMMZVNhwordbPgA2xk33nBakrCQCe5euIBQTfe+q0NOPA\nkfluXYXBk1JfomsIqlZSJvMssQKBgQDMFegGQMhD62/hAow56OwhA00F+mLdgrlK\n3VfqRVFEsXTKzp9wSdZ3d65Y//R7h/r3E6vhqACJh0f4W3Lg7Zazj5oqGiNz/KA1\nj2H2JddI3y7RC0sZ/C2ja7JaGW3+2782yu0zxwGHdVDHuHf5AT1yMImEvXSyasIm\nqdXQ8B7pNwKBgQCSYlbWsIQF2BYXV2kI9M8dX7AcWnsU6DeSH3XvBIVwYsyVEvhH\nmihUsEdGh/xUZQC1cfMQzzZr55AFXy/aJ+5uS6KKFxFsKfWF2KNdT2ygcq0rhnwp\nq4/92rLabYQOeSuW8WJddi0aAbR3sVmAZX44AIR/MBLOpyod0xFUpWauAQKBgHZ7\nwVjgA2RrK2jWsdJtB6mi4PS3iO5RFoIAPyojVCstW0Di9G2ccIarVO0WrDmLmIgZ\nQ5CemLE/eOkXLnqndPaKSFZpFmwgHmL5+0WMcpA8AlIa3F8ZqOVXgRQN724m5bxJ\n06xbvOeHlH5e+kf2EFZbF3uZAkcS8+S+dQP4Y/nBAoGAKc1vZFML4U2EbVe5QfSD\nvuQMdxOjN+jZV6AIIPUQgN7pBlWXmk2u/gs3nLc+98dWG8iw5OZCJq5+EvcPxqmp\n8M2aS/2BzQ7RBFlGFQPL26rrMh+wihdJEZcMVtur3qR1nCrMqrKvFCk2DkwOtAD4\n/XgmGVPdrG9ShCufeRBaBvg=\n-----END PRIVATE KEY-----\n"

GOOGLE_SHEET_ID=1N1rxSh9mBTQ72p31Lk9DrgAUxxmScnT3SvVrHj_2mGU

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=ashrutpanhal112@gmail.com
SMTP_PASS=gdntzxandfhpvyxe
SMTP_TO_EMAIL=ashrut@gorack.in
```

### ❌ Delete These (Not Needed):
```
MONGO_URL (delete this completely)
NEXT_PUBLIC_BASE_URL (optional - can delete)
```

---

## 🚀 DEPLOYMENT STEPS

### Step 1: Update GitHub
```bash
# In your local repo or GitHub web interface:
1. Replace app/api/leads/route.js
2. Replace package.json
3. Commit and push changes
```

### Step 2: Update Vercel
```bash
# Go to Vercel Dashboard:
1. Click on your project
2. Go to Settings → Environment Variables
3. Delete: MONGO_URL
4. Keep all Google Sheets and SMTP variables
5. Click Save
```

### Step 3: Redeploy (Automatic)
```bash
# Vercel will automatically redeploy when you push to GitHub
# Or manually trigger:
1. Go to Deployments tab
2. Click "..." on latest deployment
3. Click "Redeploy"
```

---

## ✅ VERIFICATION CHECKLIST

After deployment, test your website:

1. **Open your Vercel URL**
2. **Click the floating chat button**
3. **Fill out the form:**
   - Company: "Test Company"
   - City: "New York"
   - Seats: "50"
   - Name: "John Doe"
   - Email: "john@test.com"
   - Phone: "+1-555-0123"
4. **Click Submit**
5. **Check for success message**
6. **Verify data saved:**
   - ✅ Check Google Sheet for new row
   - ✅ Check email inbox for notification

---

## 🎯 WHAT'S CHANGED

### Before (with MongoDB):
- ❌ Required MongoDB Atlas setup
- ❌ Database connection errors on Vercel
- ❌ More complex deployment
- ❌ Additional cost for database

### After (Google Sheets only):
- ✅ No database needed
- ✅ Works perfectly on Vercel
- ✅ Simpler deployment
- ✅ Free forever
- ✅ Data in Google Sheets (easy to view/export)
- ✅ Email notifications still working

---

## 📝 IMPORTANT NOTES

### Google Sheets Setup:
Make sure your Google Sheet is shared with:
```
website-sheets-bot@bpo-website-integration.iam.gserviceaccount.com
```
Permission: **Editor**

### GOOGLE_PRIVATE_KEY Format:
- Must be wrapped in double quotes: `"..."`
- Must have `\n` as literal text (not line breaks)
- Copy exactly as shown in environment variables above

### If Form Still Not Working:
1. Check Vercel Function Logs for errors
2. Verify all environment variables are set
3. Make sure Google Sheet is shared with service account
4. Test Gmail SMTP credentials

---

## 📞 SUPPORT

If you encounter any issues:
1. Check Vercel Function Logs
2. Check browser console (F12)
3. Verify environment variables are correct
4. Make sure you've committed both files to GitHub

---

**Your website will now save leads to Google Sheets only - no database needed!** ✨
