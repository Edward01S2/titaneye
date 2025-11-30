# Vercel Deployment Guide

## ✅ Pre-Deployment Checklist

### 1. **Fix `.gitignore` (CRITICAL)**
- ✅ Already updated! The `public/` folder is now tracked by git
- Old Gatsby config was ignoring it, but Next.js needs these files

### 2. **Setup Resend Email Service**

Before deploying, you need to configure Resend:

#### Step 1: Create Resend Account
1. Sign up at [resend.com](https://resend.com)
2. Verify your email address

#### Step 2: Add Your Domain (Recommended)
1. In Resend dashboard, go to **Domains**
2. Add your domain: `taeyecare.com`
3. Add the DNS records they provide to your domain registrar
4. Wait for verification (usually 5-10 minutes)

#### Step 3: Update the "From" Email Address
Once your domain is verified, update `src/app/api/contact/route.ts`:

```typescript
// Change line 15 from:
from: 'Ta Eye Associates <onboarding@resend.dev>',

// To:
from: 'Ta Eye Associates <noreply@taeyecare.com>',
```

**Note:** If you skip domain verification, emails will work but show `via resend.dev` which looks less professional.

#### Step 4: Get API Key
1. In Resend dashboard, go to **API Keys**
2. Create a new API key
3. Copy it (you'll need it for Vercel)

### 3. **Commit and Push Your Changes**

```bash
# Stage all changes
git add .

# Commit
git commit -m "Migrate from Gatsby to Next.js 15 with Tina CMS"

# Push to GitHub
git push origin master
```

## 🚀 Deploying to Vercel

### Step 1: Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your `taeye` repository
4. Vercel will auto-detect Next.js

### Step 2: Configure Environment Variables
Before clicking "Deploy", add environment variables:

| Name | Value | Where to Get It |
|------|-------|-----------------|
| `RESEND_API_KEY` | Your Resend API key | Resend Dashboard → API Keys |

**Important:** Add this to **Production**, **Preview**, and **Development** environments.

### Step 3: Deploy!
1. Click **"Deploy"**
2. Wait 2-3 minutes for the build to complete
3. Your site will be live at `your-project.vercel.app`

### Step 4: Add Custom Domain
1. In Vercel project settings, go to **Domains**
2. Add `taeyecare.com` and `www.taeyecare.com`
3. Update your DNS records as instructed by Vercel
4. SSL certificate will be auto-generated

## 🎨 Optional: Tina Cloud Setup (Production CMS)

If you want to edit content directly in production:

### Step 1: Sign up for Tina Cloud
1. Go to [app.tina.io](https://app.tina.io/)
2. Sign in with GitHub
3. Connect your repository

### Step 2: Get Credentials
Tina Cloud will provide:
- `NEXT_PUBLIC_TINA_CLIENT_ID`
- `TINA_TOKEN`

### Step 3: Add to Vercel
1. Go to Vercel project → **Settings** → **Environment Variables**
2. Add both variables
3. Redeploy your site

Now you can access the CMS at `https://taeyecare.com/admin` in production!

## 🔍 Verifying Deployment

After deployment, test:

- ✅ Homepage loads correctly
- ✅ All images display properly
- ✅ Navigation works (scroll to sections)
- ✅ Contact form submits successfully
- ✅ You receive email at office@taeyecare.com
- ✅ Custom font displays correctly

## 🐛 Troubleshooting

### Build Fails
- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Verify `public/` folder is committed to git

### Contact Form Not Working
- Verify `RESEND_API_KEY` is set in Vercel
- Check Vercel function logs for errors
- Ensure email address in route.ts is verified in Resend

### Images Not Loading
- Ensure `public/` folder is committed to git
- Check image paths start with `/` (e.g., `/img/logo.svg`)
- Clear browser cache

### Fonts Not Working
- Verify `public/fonts/Optician-Sans.otf` exists in git
- Check font path in `globals.css`

## 📞 Support

If you run into issues:
- Vercel Docs: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- Resend Docs: [resend.com/docs](https://resend.com/docs)
- Tina CMS Docs: [tina.io/docs](https://tina.io/docs)

