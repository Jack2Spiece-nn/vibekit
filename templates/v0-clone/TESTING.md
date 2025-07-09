# Testing Documentation

This document provides comprehensive information about the testing setup for the v0-clone application.

## Quick Start

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Test Structure

The testing architecture is designed to provide comprehensive coverage while maintaining fast execution and reliability:

### Test Categories

1. **Unit Tests**: Individual component and utility function tests
2. **Integration Tests**: Multi-component workflow tests
3. **Authentication Tests**: Complete auth flow validation
4. **UI Component Tests**: Isolated UI component testing

### Key Test Files

- `__tests__/components/chat/chat.test.tsx` - Main chat component tests
- `__tests__/components/error-boundary.test.tsx` - Error handling tests
- `__tests__/components/vercel-free-tier-warning.test.tsx` - Vercel-specific feature tests
- `__tests__/integration/chat-flow.test.tsx` - End-to-end chat workflows
- `__tests__/integration/auth-flow.test.tsx` - Authentication workflows

## Framework and Tools

### Core Testing Stack
- **Jest**: Test runner and assertion library
- **React Testing Library**: React component testing utilities
- **@testing-library/user-event**: User interaction simulation
- **@testing-library/jest-dom**: Extended DOM matchers

### Mock System
Comprehensive mocking for external dependencies:

- **Convex**: Database operations and real-time features
- **NextAuth**: Authentication system
- **Framer Motion**: Animation library
- **Next.js**: Navigation and routing

## Test Coverage

### Component Coverage
- ✅ Chat system (messages, todos, form submission)
- ✅ Error boundary (error handling and recovery)
- ✅ Vercel free tier warnings (timeout simulation)
- ✅ Authentication provider
- ✅ UI components (Button, alerts, etc.)

### Integration Coverage
- ✅ Complete chat interaction flows
- ✅ Authentication state management
- ✅ Error handling across component boundaries
- ✅ Form submission and validation

### Vercel Free Tier Specific Tests
- ✅ 10-second timeout simulation
- ✅ Function timeout warnings
- ✅ Graceful degradation
- ✅ Error boundary integration

## Running Tests

### Development Workflow
```bash
# Watch mode during development
npm run test:watch

# Run specific test file
npm test -- chat.test.tsx

# Run tests with specific pattern
npm test -- --testPathPattern=components/chat

# Debug specific test
npm test -- --testNamePattern="submits message correctly"
```

### Coverage Analysis
```bash
# Generate coverage report
npm run test:coverage

# View coverage in browser
open coverage/lcov-report/index.html
```

## Mock Configuration

### Setting up Mocks

The mock system is designed to be consistent and easy to use:

```typescript
// In your test file
import { setupDefaultMocks } from '../mocks/convex'
import { setupDefaultAuthMocks } from '../mocks/next-auth'

beforeEach(() => {
  setupDefaultMocks()
  setupDefaultAuthMocks()
})
```

### Custom Mock Data
```typescript
// Use custom session data
setupMockSession({
  user: { name: 'Custom User' },
  accessToken: 'custom-token'
})

// Use custom messages
setupMockQuery('api.messages.getBySession', customMessages)
```

## Best Practices

### Writing Tests
1. **Test behavior, not implementation**
2. **Use semantic queries** (getByRole, getByLabelText)
3. **Test user interactions** realistically
4. **Include error scenarios**
5. **Test accessibility** features

### Mock Strategy
1. **Mock at system boundaries** (API calls, external services)
2. **Keep mocks focused** and minimal
3. **Use consistent mock data** across tests
4. **Clean up mocks** between tests

### Test Organization
1. **Group related tests** with describe blocks
2. **Use descriptive test names**
3. **Follow AAA pattern** (Arrange, Act, Assert)
4. **Test edge cases** and error conditions

## Common Patterns

### Component Testing Pattern
```typescript
describe('ComponentName', () => {
  beforeEach(() => {
    setupMocks()
  })

  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<ComponentName />)
      expect(screen.getByText('Expected text')).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('handles user click', async () => {
      const user = userEvent.setup()
      render(<ComponentName />)
      
      await user.click(screen.getByRole('button'))
      expect(/* assertion */).toBeTruthy()
    })
  })
})
```

### Integration Testing Pattern
```typescript
describe('Feature Integration', () => {
  beforeEach(() => {
    setupDefaultMocks()
    setupDefaultAuthMocks()
  })

  it('handles complete user workflow', async () => {
    const user = userEvent.setup()
    render(<FeatureComponent />)
    
    // Simulate user actions
    await user.type(screen.getByRole('textbox'), 'input')
    await user.click(screen.getByRole('button'))
    
    // Verify results
    await waitFor(() => {
      expect(screen.getByText('Success')).toBeInTheDocument()
    })
  })
})
```

## Debugging Tests

### Common Issues
1. **Timer-related tests**: Use `jest.useFakeTimers()`
2. **Async operations**: Use `waitFor()` for assertions
3. **Mock interference**: Ensure proper cleanup
4. **Provider issues**: Check test-utils wrapper

### Debug Strategies
```bash
# Run with verbose output
npm test -- --verbose

# Run single test with debug info
npm test -- --testNamePattern="specific test" --verbose

# Check coverage for specific files
npm test -- --coverage --collectCoverageFrom="**/chat/**"
```

## Continuous Integration

Tests are optimized for CI environments:

- **No external dependencies** during test execution
- **Deterministic results** with comprehensive mocking
- **Fast execution** with optimized setup
- **Clear failure reporting**

## Performance Considerations

### Test Performance
- Tests run in parallel by default
- Mocks are optimized for speed
- Minimal DOM manipulation
- Efficient cleanup between tests

### Memory Management
- Proper component unmounting
- Mock cleanup after each test
- Avoiding memory leaks in long-running tests

## Future Enhancements

### Planned Improvements
1. **Visual regression tests** for UI components
2. **Performance testing** for critical paths
3. **End-to-end tests** with Playwright
4. **API contract tests** for external services

### Test Automation
- **Pre-commit hooks** for test validation
- **CI/CD integration** with coverage reporting
- **Automated test generation** for new components

## Contributing

When adding new tests:

1. **Follow existing patterns** in similar test files
2. **Add appropriate mocks** for external dependencies
3. **Include both success and failure scenarios**
4. **Update documentation** for new test categories
5. **Ensure tests are fast and reliable**

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Vercel Testing Guidelines](https://vercel.com/docs/functions/serverless-functions/testing)

For more detailed information, see the full test documentation in `__tests__/README.md`.