# 📱 MOBILE SETUP GUIDE - V0 Clone

**Perfect for phone users!** Follow these steps to get your v0-clone deployed.

## 🎯 QUICK START (5 services to set up)

### 1️⃣ CONVEX (Database) - **FREE** ✅
📍 **Go to:** https://dashboard.convex.dev/
1. Sign up/login
2. **Click "Create Project"**
3. Name: `v0-clone`
4. After creation, go to **Settings** tab
5. **Copy the URL** (looks like: `https://happy-animal-123.convex.cloud`)
6. Save this URL for later ⭐

### 2️⃣ ANTHROPIC (AI) - **$20+ needed** 💳
📍 **Go to:** https://console.anthropic.com/
1. Sign up with email
2. **Go to "API Keys"** section
3. **Click "Create Key"**
4. Copy the key (starts with `sk-ant-`)
5. **Go to "Billing"** → Add payment method
6. **Add $20+ credits**
7. Save the API key ⭐

### 3️⃣ NORTHFLANK (Sandbox) - **FREE** ✅
📍 **Go to:** https://northflank.com/
1. Sign up (free tier)
2. **Click "Create Project"**
3. Name: `v0-sandbox`
4. **Copy Project ID** from URL or dashboard
5. **Go to Account Settings** (top right avatar)
6. **Click "API Keys"** → **"Generate API Key"**
7. Save both Project ID and API key ⭐

### 4️⃣ GITHUB OAUTH (Login) - **FREE** ✅
📍 **Go to:** https://github.com/settings/developers
1. **Click "New OAuth App"**
2. Fill in:
   - **App name:** `v0-clone`
   - **Homepage:** `https://your-app.vercel.app` *(you'll get this from Vercel)*
   - **Callback:** `https://your-app.vercel.app/api/auth/callback/github`
3. **Click "Register application"**
4. **Copy Client ID**
5. **Generate Client Secret** → Copy it
6. Save both Client ID and Secret ⭐

### 5️⃣ VERCEL (Hosting) - **FREE** ✅
📍 **Go to:** https://vercel.com/
1. Sign up with GitHub
2. **Click "Add New..." → "Project"**
3. **Import your GitHub repo**
4. **IMPORTANT:** Set **Root Directory** to: `templates/v0-clone`
5. **Deploy** (it will fail first time - that's normal!)

## 🔧 ADD ENVIRONMENT VARIABLES TO VERCEL

After Vercel deployment fails:
1. **Go to Project → Settings → Environment Variables**
2. **Add these 6 variables:**

| Variable | Value | 
|----------|-------|
| `NEXT_PUBLIC_CONVEX_URL` | Your Convex URL from step 1 |
| `ANTHROPIC_API_KEY` | Your Anthropic key from step 2 |
| `NORTHFLANK_API_KEY` | Your Northflank key from step 3 |
| `NORTHFLANK_PROJECT_ID` | Your Northflank project ID from step 3 |
| `AUTH_GITHUB_ID` | Your GitHub client ID from step 4 |
| `AUTH_GITHUB_SECRET` | Your GitHub secret from step 4 |

3. **Set each for:** Production, Preview, Development
4. **Go to Deployments → Redeploy**

## 🎉 FINAL STEPS

1. **Update GitHub OAuth app:**
   - Replace `your-app.vercel.app` with your actual Vercel URL
   - Update both Homepage and Callback URLs

2. **Test your app:**
   - Visit your Vercel URL
   - Try GitHub login
   - Test AI chat features

## ❓ NEED HELP?

**Common Issues:**
- ❌ **"Convex error":** Check `NEXT_PUBLIC_CONVEX_URL` is correct
- ❌ **"GitHub OAuth failed":** Check callback URL matches exactly  
- ❌ **"AI not working":** Check Anthropic API key and credits
- ❌ **"Build failed":** Check all 6 environment variables are set

**Cost Breakdown:**
- ✅ Convex: FREE
- ✅ Northflank: FREE  
- ✅ GitHub: FREE
- ✅ Vercel: FREE
- 💳 Anthropic: $20+ (only paid service)

**Total cost: ~$20 to get started** 🎯