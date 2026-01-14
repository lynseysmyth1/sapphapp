# Vercel Deployment Setup

Your project is now configured for Vercel deployment! Follow these steps:

## Step 1: Connect GitHub to Vercel

1. **Go to Vercel**: https://vercel.com/login
2. **Sign in with GitHub** (recommended - it will connect your GitHub account automatically)
3. **Import your repository**:
   - Click "Add New..." → "Project"
   - Find and select `lynseysmyth1/sapphapp`
   - Click "Import"

4. **Configure project** (should auto-detect):
   - Framework Preset: **Vite** ✅
   - Root Directory: `./` ✅
   - Build Command: `npm run build` ✅
   - Output Directory: `dist` ✅
   - Install Command: `npm install` ✅

5. **Click "Deploy"**
   - Wait for the build to complete (~1-2 minutes)
   - Your site will be live at `sapphapp.vercel.app` (or similar)

## Step 2: (Optional) Add Custom Domain

If you want to add a custom domain later:

1. Go to **Project Settings** → **Domains**
2. Add your domain (e.g., `www.yourdomain.com`)
3. Follow Vercel's DNS configuration instructions
4. Update your domain's DNS records at your registrar

## Automatic Deployments

- ✅ Every push to `main` branch will automatically deploy
- ✅ Pull requests will create preview deployments
- ✅ SSL certificates are automatically provisioned

## Your Repository

- **GitHub**: https://github.com/lynseysmyth1/sapphapp
- **Vercel Dashboard**: https://vercel.com/dashboard (after connecting)

## Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Vite + Vercel**: https://vercel.com/docs/frameworks/vite
