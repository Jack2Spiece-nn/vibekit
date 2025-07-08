#!/bin/bash

echo "🚀 V0-Clone Convex Setup Script"
echo "================================"

# Check if we're in the right directory
if [ ! -f "convex/schema.ts" ]; then
    echo "❌ Error: Please run this from the templates/v0-clone directory"
    echo "   Current directory: $(pwd)"
    echo "   Expected: .../templates/v0-clone"
    exit 1
fi

# Check if Convex CLI is installed
if ! command -v convex &> /dev/null; then
    echo "📦 Installing Convex CLI..."
    npm install -g convex
fi

echo "📝 Current Convex version: $(convex --version)"

# Step 1: Login (if not already logged in)
echo "🔐 Step 1: Checking Convex authentication..."
if ! convex auth --check 2>/dev/null; then
    echo "🌐 Please login to Convex (this will open your browser):"
    convex login
    if [ $? -ne 0 ]; then
        echo "❌ Login failed. Please try again."
        exit 1
    fi
else
    echo "✅ Already logged in to Convex"
fi

# Step 2: Configure project
echo "⚙️  Step 2: Configuring Convex project..."
if [ ! -f "convex.json" ] || [ ! -s "convex.json" ] || ! grep -q "team" convex.json 2>/dev/null; then
    echo "🔧 Running convex dev --configure..."
    convex dev --configure
    if [ $? -ne 0 ]; then
        echo "❌ Project configuration failed"
        exit 1
    fi
else
    echo "✅ Project already configured"
fi

# Step 3: Deploy to production
echo "🚀 Step 3: Deploying to production..."
convex deploy --prod
if [ $? -ne 0 ]; then
    echo "❌ Production deployment failed"
    exit 1
fi

# Step 4: Get the URL
echo "🌐 Step 4: Getting your Convex URL..."
CONVEX_URL=$(convex dashboard --json 2>/dev/null | grep -o 'https://[^"]*\.convex\.cloud' | head -1)

if [ -z "$CONVEX_URL" ]; then
    echo "⚠️  Could not automatically detect Convex URL"
    echo "   Please go to https://dashboard.convex.dev/"
    echo "   Find your project and copy the URL from Settings"
else
    echo "✅ Your Convex URL: $CONVEX_URL"
    echo ""
    echo "📋 COPY THIS URL TO VERCEL:"
    echo "   Variable Name: NEXT_PUBLIC_CONVEX_URL"
    echo "   Value: $CONVEX_URL"
    echo ""
fi

echo "🎉 Convex setup complete!"
echo ""
echo "📌 NEXT STEPS:"
echo "1. Copy the Convex URL above"
echo "2. Add it to your Vercel environment variables"
echo "3. Set up the other services (Anthropic, Northflank, GitHub OAuth)"
echo "4. Redeploy your Vercel app"
echo ""
echo "📖 Full guide: See MOBILE_SETUP.md"