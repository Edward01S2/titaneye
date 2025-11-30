# Titan Eye Care Website

A modern optometry practice website built with Next.js 15 and Tina CMS.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **CMS:** Tina CMS
- **Styling:** Tailwind CSS v4
- **Deployment:** Vercel
- **Email:** Resend

## Getting Started

### Development

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables in `.env.local`:

```bash
RESEND_API_KEY=your_api_key_here
NEXT_PUBLIC_TINA_CLIENT_ID=your_client_id (optional, for production)
TINA_TOKEN=your_token (optional, for production)
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Content Management

Access the Tina CMS admin interface at:

- Local: [http://localhost:3000/admin](http://localhost:3000/admin)
- Production: [https://yourdomain.com/admin](https://yourdomain.com/admin)

## Project Structure

```
taeye/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/         # API routes
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx     # Homepage
│   └── components/       # React components
├── content/              # Tina CMS content (Markdown)
│   ├── pages/           # Homepage content
│   ├── staff/           # Team members
│   └── settings/        # Site settings
├── tina/                 # Tina CMS configuration
└── public/               # Static assets
```

## Content Editing

Edit content through Tina CMS admin interface:

- **Homepage:** Hero, services, appointments, insurance
- **Team:** Doctors and staff profiles
- **Settings:** Contact info and business hours

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `RESEND_API_KEY`
4. Deploy!

### Contact Form Setup

The contact form uses Resend for email notifications. Get your API key at [resend.com](https://resend.com).

## License

© 2024 Titan Eye Care. All rights reserved.
