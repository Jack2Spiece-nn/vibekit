# Vercel Deployment Guide - v0 Clone Template

## ⚠️ Important: Free Tier Limitations

This template has been optimized for Vercel's **free tier** but comes with several limitations:

### Free Tier Constraints:
- **10-second function timeout** (original template had 800 seconds)
- **100GB bandwidth/month**
- **Non-commercial use only**
- **No team collaboration features**
- **Community support only**

### Performance Optimizations Made:
1. ✅ Reduced `maxDuration` from 800s to 10s
2. ✅ Added `vercel.json` configuration
3. ✅ Optimized Next.js config for Vercel
4. ✅ Disabled telemetry for faster builds
5. ✅ Added timeout warnings in UI
6. ✅ Implemented error boundaries for better error handling
7. ✅ Optimized webpack configuration for smaller bundles
8. ✅ Added secure AUTH_SECRET generation

## 🚀 What Works on Free Tier

### ✅ Fully Functional:
- User authentication (GitHub OAuth)
- Session management
- Real-time UI updates
- File browsing and basic operations
- Template selection
- Basic chat interface

### ⚠️ Limited Functionality:
- **AI code generation** - Will timeout after 10 seconds
- **Complex repository operations** - May timeout
- **Long-running tasks** - Will be interrupted
- **Sandbox environment creation** - May fail due to timeout

### 🚫 Requires Paid Services:
- **Northflank** - Sandbox environments (requires paid account)
- **Anthropic API** - AI functionality (requires paid API key)
- **Convex** - Database (free tier available but limited)

## 🚀 Deploy to Vercel

### Step 1: Fork the Repository
1. Fork the `vibekit/templates/v0-clone` repository
2. Clone your fork locally

### Step 2: Set Up Environment Variables
Create these variables in your Vercel dashboard:

```bash
# Required for AI functionality
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Required for sandbox environments
NORTHFLANK_API_KEY=your_northflank_api_key_here
NORTHFLANK_PROJECT_ID=your_northflank_project_id_here

# Required for database
NEXT_PUBLIC_CONVEX_URL=your_convex_url_here

# Required for authentication
AUTH_SECRET=your_auth_secret_here
AUTH_GITHUB_ID=your_github_client_id
AUTH_GITHUB_SECRET=your_github_client_secret

# Auto-configured by Vercel
VERCEL_URL=auto-configured
NEXTAUTH_URL=https://your-app.vercel.app
```

### Step 3: Deploy
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy

## 🔧 Configuration Details

### Modified Files:
- `app/api/inngest/route.ts` - Reduced maxDuration to 10s
- `next.config.ts` - Added Vercel optimizations
- `vercel.json` - Added Vercel-specific configuration
- `.env.example` - Added Vercel environment variables

### Known Limitations on Free Tier:
1. **Function Timeout**: Long-running AI tasks may timeout after 10 seconds
2. **Bandwidth**: Heavy usage may exceed 100GB monthly limit
3. **Commercial Use**: Not allowed on free tier
4. **Concurrent Executions**: Limited by Vercel free tier

## 🛠️ Troubleshooting

### Common Issues:

#### 1. Function Timeout (10s limit)
**Problem**: AI generation tasks timing out
**Solution**: 
- Break down complex tasks into smaller chunks
- Consider upgrading to Pro plan for 60s timeout
- Use background processing with Inngest for longer tasks

#### 2. Environment Variables
**Problem**: Missing or incorrect environment variables
**Solution**:
- Double-check all variables are set in Vercel dashboard
- Ensure no extra spaces or quotes
- Verify API keys are valid

#### 3. GitHub OAuth Issues
**Problem**: Authentication not working
**Solution**:
- Update GitHub OAuth app callback URL to your Vercel domain
- Set `NEXTAUTH_URL` to your Vercel app URL
- Ensure GitHub app is configured correctly

#### 4. Northflank Connection Issues
**Problem**: Sandbox creation failing
**Solution**:
- Verify Northflank API key has proper permissions
- Check project ID is correct
- Ensure Northflank account is active

#### 5. Convex Database Issues
**Problem**: Database operations failing
**Solution**:
- Verify Convex URL is correct
- Check Convex deployment is active
- Ensure database schema is deployed

## 📈 Upgrading to Pro Plan

If you need more resources:
- **Pro Plan**: $20/month
- **60-second function timeout**
- **1TB bandwidth**
- **Commercial use allowed**
- **Team collaboration**
- **Priority support**

## 🔗 Getting API Keys

### Anthropic API Key
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Create account and get API key
3. Add billing information for usage

### Northflank API Key
1. Sign up at [Northflank](https://northflank.com/)
2. Create a project
3. Generate API key in settings

### Convex Setup
1. Visit [Convex Console](https://dashboard.convex.dev/)
2. Create new project
3. Deploy schema from local development

### GitHub OAuth App
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create new OAuth App
3. Set callback URL to `https://your-app.vercel.app/api/auth/callback/github`

## 🎯 Production Considerations

### Security:
- Use strong `AUTH_SECRET` value
- Rotate API keys regularly
- Monitor usage and costs

### Performance:
- Monitor function execution times
- Optimize for 10-second timeout
- Consider caching strategies

### Cost Management:
- Monitor bandwidth usage
- Set up alerts for approaching limits
- Consider Pro plan for production use

## 📝 Support

- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Next.js Documentation: [nextjs.org/docs](https://nextjs.org/docs)
- VibeKit Documentation: [vibekit.dev/docs](https://vibekit.dev/docs)
- Inngest Documentation: [inngest.com/docs](https://www.inngest.com/docs)

---

**Note**: This template is optimized for Vercel's free tier but may require a Pro plan for production use due to function timeout limitations.