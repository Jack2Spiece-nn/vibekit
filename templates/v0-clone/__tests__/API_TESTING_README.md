# API Routes and Server Actions Testing Documentation

This directory contains comprehensive tests for all API routes and server-side functionality in the v0-clone template, with special focus on Vercel free tier constraints and external service integration.

## Test Structure

```
__tests__/
├── api/                          # API route tests
│   ├── auth/
│   │   └── nextauth.test.ts      # NextAuth authentication tests
│   ├── check-url/
│   │   └── route.test.ts         # URL validation API tests
│   └── inngest/
│       └── route.test.ts         # Inngest webhook tests
├── actions/                      # Server action tests
│   ├── github.test.ts            # GitHub integration tests
│   ├── inngest.test.ts           # Inngest realtime tests
│   ├── session.test.ts           # Session management tests
│   └── vibekit.test.ts           # VibeKit integration tests
├── integration/                  # Integration tests
│   ├── environment-validation.test.ts  # Environment variable validation
│   └── vercel-timeout.test.ts    # Vercel free tier timeout handling
├── mocks/                        # Mock implementations
│   ├── external-services.ts      # Comprehensive external service mocks
│   └── ...                       # Other mock files
└── utils/                        # Test utilities
    ├── api-test-utils.ts          # API testing utilities
    └── ...                        # Other utility files
```

## Test Coverage

### API Routes

#### `/api/auth/[...nextauth]/route.ts`
- **Authentication flows**: Sign in, sign out, callback handling
- **Provider configuration**: GitHub OAuth integration
- **Session management**: JWT and session callbacks
- **Error handling**: Authentication failures, invalid tokens
- **Environment validation**: Required OAuth credentials

#### `/api/inngest/route.ts`
- **Webhook handling**: GET, POST, PUT request processing
- **Function registration**: Inngest function discovery
- **Timeout configuration**: 10-second Vercel free tier limit
- **Concurrency handling**: 100 concurrent functions
- **Security validation**: Signature verification
- **Error scenarios**: Service unavailability, malformed requests

#### `/api/check-url/route.ts`
- **URL validation**: HTTP/HTTPS URL accessibility
- **Response status handling**: 2xx, 3xx, 4xx, 5xx status codes
- **Error handling**: Network errors, timeouts, DNS failures
- **Edge cases**: Invalid URLs, missing parameters
- **Security considerations**: URL format validation

### Server Actions

#### `/app/actions/github.ts`
- **Repository management**: List, create, branch operations
- **Authentication**: GitHub token validation
- **API integration**: Octokit REST API calls
- **Error handling**: Rate limiting, permissions, network errors
- **Organization support**: Multi-org repository access
- **Data transformation**: GitHub API to internal format

#### `/app/actions/inngest.ts`
- **Realtime subscriptions**: Token generation and management
- **Channel configuration**: Status and update topics
- **Error handling**: Service unavailability, authentication
- **Concurrent requests**: Multiple token generation
- **Timeout scenarios**: Request timeouts, network errors

#### `/app/actions/session.ts`
- **AI integration**: Claude API for title generation
- **Schema validation**: Zod schema enforcement
- **Error handling**: API failures, malformed responses
- **Rate limiting**: Anthropic API constraints
- **Concurrent processing**: Multiple session title requests

#### `/app/actions/vibekit.ts`
- **Agent orchestration**: Run agent actions via Inngest
- **Session lifecycle**: Create, update, delete operations
- **Pull request creation**: GitHub integration
- **Configuration management**: VibeKit SDK setup
- **Error recovery**: Timeout handling, retry logic

### Integration Tests

#### Vercel Free Tier Timeout Handling
- **10-second timeout limit**: Function execution constraints
- **Warning system**: 8-second timeout warnings
- **Chunked processing**: Breaking long tasks into smaller parts
- **Timeout recovery**: Resume from checkpoints
- **Performance optimization**: Reduced API calls
- **Error messaging**: Clear timeout error messages

#### Environment Variable Validation
- **Required variables**: Authentication, AI, infrastructure
- **Production validation**: All critical variables present
- **Development defaults**: Fallback values for dev environment
- **Format validation**: URL, key, and ID format checks
- **Security**: Sensitive value redaction
- **Runtime errors**: Graceful handling of missing variables

## Testing Frameworks and Tools

### Core Testing Stack
- **Jest**: JavaScript testing framework
- **@testing-library/react**: React component testing
- **@testing-library/jest-dom**: DOM testing matchers
- **@testing-library/user-event**: User interaction simulation

### Mocking Strategy
- **External APIs**: GitHub, Anthropic, Northflank
- **Database**: Convex mutations and queries
- **Authentication**: NextAuth and session management
- **Real-time**: Inngest and WebSocket connections
- **Infrastructure**: VibeKit SDK and deployment services

### Test Utilities
- **API testing helpers**: Request/response mocking
- **Authentication simulation**: User session management
- **Performance testing**: Timeout and memory validation
- **Concurrent operations**: Multi-request handling
- **Error simulation**: Network, timeout, and rate limit errors

## Running Tests

### All Tests
```bash
npm test
```

### Watch Mode
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

### Specific Test Suites
```bash
# API routes only
npm test -- __tests__/api/

# Server actions only
npm test -- __tests__/actions/

# Integration tests only
npm test -- __tests__/integration/

# Specific test file
npm test -- __tests__/api/auth/nextauth.test.ts
```

## Test Configuration

### Jest Configuration (`jest.config.js`)
- **Environment**: jsdom for DOM testing
- **Module mapping**: Path aliases (@/)
- **Setup files**: Global mocks and utilities
- **Coverage**: Components, actions, and API routes
- **Transform**: TypeScript and modern JavaScript

### Setup Files
- **`jest.setup.js`**: Global mocks and environment setup
- **`__tests__/mocks/`**: External service mocks
- **`__tests__/utils/`**: Testing utilities and helpers

## Environment Variables for Testing

### Required Test Variables
```env
NODE_ENV=test
AUTH_GITHUB_ID=test-github-id
AUTH_GITHUB_SECRET=test-github-secret
NEXTAUTH_SECRET=test-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
ANTHROPIC_API_KEY=test-anthropic-key
NORTHFLANK_API_KEY=test-northflank-key
NORTHFLANK_PROJECT_ID=test-project-id
NEXT_PUBLIC_CONVEX_URL=https://test-convex-url.convex.cloud
```

### Test-Specific Variables
```env
JEST_TIMEOUT=30000
JEST_VERBOSE=true
```

## Mock Implementations

### External Services
- **GitHub API**: Repository, user, and organization operations
- **Anthropic API**: AI model interactions
- **Northflank API**: Infrastructure management
- **Convex Database**: Mutations and queries
- **Inngest**: Event processing and real-time updates

### Mock Utilities
- **Response simulation**: Success, error, and timeout scenarios
- **Data generation**: Realistic test data
- **State management**: Mock service state
- **Error injection**: Controlled failure scenarios

## Best Practices

### Test Organization
1. **Group related tests**: Use `describe` blocks for logical grouping
2. **Clear test names**: Descriptive test descriptions
3. **Setup/teardown**: Consistent test environment preparation
4. **Mock isolation**: Reset mocks between tests

### Error Testing
1. **Comprehensive error scenarios**: Network, timeout, validation errors
2. **Edge cases**: Invalid input, missing data
3. **Recovery testing**: Retry logic and fallback behavior
4. **User experience**: Error messages and handling

### Performance Testing
1. **Timeout validation**: Vercel free tier constraints
2. **Memory usage**: Prevent memory leaks
3. **Concurrent operations**: Multi-request handling
4. **API optimization**: Minimal external calls

### Security Testing
1. **Authentication validation**: Token verification
2. **Input sanitization**: Malicious input handling
3. **Environment security**: Sensitive data protection
4. **Access control**: Permission validation

## Continuous Integration

### GitHub Actions
```yaml
name: Test API Routes and Server Actions
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v3
```

### Test Coverage Goals
- **API Routes**: 100% line coverage
- **Server Actions**: 95% line coverage
- **Error Handling**: 90% branch coverage
- **Integration**: 85% overall coverage

## Debugging Tests

### Common Issues
1. **Mock not working**: Check mock import order
2. **Timeout errors**: Increase Jest timeout
3. **Environment variables**: Verify test env setup
4. **Async operations**: Ensure proper await usage

### Debug Tools
```bash
# Run tests with debug info
npm test -- --verbose

# Run single test with logs
npm test -- --testNamePattern="specific test" --verbose

# Debug with Node.js inspector
node --inspect-brk node_modules/.bin/jest --runInBand
```

## Contributing

### Adding New Tests
1. **Follow naming conventions**: `*.test.ts` for test files
2. **Use test utilities**: Leverage existing helpers
3. **Mock external dependencies**: Don't make real API calls
4. **Test error scenarios**: Include failure cases
5. **Document test purpose**: Clear comments and descriptions

### Test Review Checklist
- [ ] Tests cover happy path scenarios
- [ ] Error cases are tested
- [ ] Mocks are properly configured
- [ ] Tests are isolated and independent
- [ ] Performance considerations are addressed
- [ ] Security implications are tested
- [ ] Documentation is updated

## Resources

### Documentation
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Library](https://testing-library.com/docs/)
- [Next.js Testing](https://nextjs.org/docs/testing)

### External Service Documentation
- [GitHub API](https://docs.github.com/en/rest)
- [Anthropic API](https://docs.anthropic.com/claude/reference/)
- [Inngest](https://www.inngest.com/docs)
- [Convex](https://docs.convex.dev/)
- [VibeKit](https://github.com/vibekit/vibekit)

### Vercel Deployment
- [Vercel Functions](https://vercel.com/docs/functions)
- [Vercel Free Tier Limits](https://vercel.com/docs/concepts/limits/overview)
- [Vercel Timeouts](https://vercel.com/docs/concepts/limits/overview#serverless-function-timeout)