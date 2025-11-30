# Environment Variables Setup

## Required Environment Variables

### For Local Development

Create a `.env.local` file in the root directory:

```bash
# Resend API Key for contact form emails
# Get your key at: https://resend.com/api-keys
RESEND_API_KEY=re_your_api_key_here
```

### For Vercel Deployment

Add the following environment variable in your Vercel project settings:

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings → Environment Variables**
3. Add:

| Name | Value | Environment |
|------|-------|-------------|
| `RESEND_API_KEY` | Your Resend API key | Production, Preview, Development |

**How to get your Resend API Key:**
1. Sign up at [resend.com](https://resend.com)
2. Go to API Keys section
3. Create a new API key
4. Copy and paste it into Vercel

### Optional: Tina Cloud (Production CMS)

If you want to edit content in production (not just locally), sign up for Tina Cloud:

1. Go to [app.tina.io](https://app.tina.io/)
2. Connect your GitHub repository
3. Get your credentials and add to Vercel:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_TINA_CLIENT_ID` | Your Tina client ID | Production, Preview |
| `TINA_TOKEN` | Your Tina token | Production, Preview |

**Note:** Without Tina Cloud, you can still edit content locally at `localhost:3000/admin`, but you won't have access to the CMS in production.

