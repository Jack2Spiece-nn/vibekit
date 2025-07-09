# Testing Guide for v0-clone

This directory contains comprehensive tests for the v0-clone application, covering components, authentication, and integration scenarios.

## Test Structure

```
__tests__/
├── components/           # Component unit tests
│   ├── chat/            # Chat-related components
│   ├── ui/              # UI component tests
│   └── *.test.tsx       # Individual component tests
├── auth/                # Authentication tests
├── integration/         # Integration tests
├── mocks/              # Mock implementations
├── utils/              # Test utilities
└── README.md           # This file
```

## Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- chat.test.tsx

# Run tests matching a pattern
npm test -- --testPathPattern=components
```

### Test Categories

#### Unit Tests
- **Components**: Individual component functionality
- **Utilities**: Helper functions and utilities
- **Hooks**: Custom React hooks

#### Integration Tests
- **Auth Flow**: Complete authentication workflows
- **Chat Flow**: End-to-end chat interactions
- **User Flows**: Multi-component interactions

## Test Setup

### Configuration Files
- `jest.config.js` - Main Jest configuration
- `jest.setup.js` - Global test setup and mocks
- `__tests__/utils/test-utils.tsx` - Custom render utilities

### Mock System
The testing setup includes comprehensive mocks for:

#### External Dependencies
- **Convex**: Database operations and real-time updates
- **NextAuth**: Authentication system
- **Framer Motion**: Animation library
- **Next.js**: Navigation and routing

#### Mock Files
- `__tests__/mocks/convex.ts` - Convex database mocks
- `__tests__/mocks/next-auth.ts` - Authentication mocks
- `__tests__/mocks/actions.ts` - Server action mocks
- `__tests__/mocks/framer-motion.ts` - Animation mocks

## Writing Tests

### Component Tests

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { YourComponent } from '@/components/your-component'

describe('YourComponent', () => {
  it('renders correctly', () => {
    render(<YourComponent />)
    expect(screen.getByText('Expected text')).toBeInTheDocument()
  })

  it('handles user interactions', async () => {
    const user = userEvent.setup()
    render(<YourComponent />)
    
    await user.click(screen.getByRole('button'))
    expect(/* assertion */).toBeTruthy()
  })
})
```

### Integration Tests

```typescript
import { render, screen, waitFor } from '@testing-library/react'
import { setupDefaultMocks } from '../mocks/convex'
import { setupDefaultAuthMocks } from '../mocks/next-auth'

describe('Feature Integration', () => {
  beforeEach(() => {
    setupDefaultMocks()
    setupDefaultAuthMocks()
  })

  it('handles complete user flow', async () => {
    // Test implementation
  })
})
```

### Mock Usage

```typescript
// Setup specific mock behavior
setupMockQuery('api.messages.getBySession', mockMessages)
setupMockMutation('api.messages.add', mockAddMessage)
setupMockSession(customSessionData)
```

## Test Utilities

### Custom Render
Use the custom render function for components that need providers:

```typescript
import { render } from '../utils/test-utils'

// Automatically wraps with providers
render(<YourComponent />)
```

### Mock Data
Common mock data is available in `test-utils.tsx`:

```typescript
import { mockSession, mockMessages, mockSession_ } from '../utils/test-utils'
```

## Best Practices

### Component Testing
1. **Test user interactions, not implementation details**
2. **Use proper accessibility queries** (getByRole, getByLabelText)
3. **Test error states and edge cases**
4. **Mock external dependencies consistently**

### Integration Testing
1. **Test complete user workflows**
2. **Verify component interactions**
3. **Test error handling across boundaries**
4. **Ensure proper cleanup**

### Mock Strategy
1. **Mock at the boundary** (API calls, external libraries)
2. **Keep mocks simple and focused**
3. **Use consistent mock data**
4. **Clean up mocks between tests**

## Coverage Goals

### Current Coverage Areas
- ✅ Chat components and functionality
- ✅ Authentication flows
- ✅ Error boundaries
- ✅ Vercel free tier features
- ✅ UI components
- ✅ Integration workflows

### Coverage Targets
- **Components**: >90% line coverage
- **Critical paths**: 100% coverage
- **Error handling**: Complete coverage
- **User interactions**: Complete coverage

## Vercel Free Tier Testing

Special attention is given to testing Vercel free tier optimizations:

### Timeout Handling
- Function timeout simulation
- Graceful degradation tests
- Error boundary integration

### Performance Testing
- Component render performance
- Memory usage validation
- Bundle size considerations

### Edge Cases
- Network failures
- API rate limiting
- Cold start scenarios

## Debugging Tests

### Common Issues
1. **Timer-related tests**: Use `jest.useFakeTimers()`
2. **Async operations**: Use `waitFor()` for async assertions
3. **Mock cleanup**: Ensure `jest.clearAllMocks()` in beforeEach
4. **Provider issues**: Check wrapper setup in test-utils

### Debug Commands
```bash
# Run tests with verbose output
npm test -- --verbose

# Run single test file with debug
npm test -- --testNamePattern="specific test" --verbose

# Run tests with coverage details
npm test -- --coverage --verbose
```

## Contributing

When adding new tests:

1. **Follow the existing pattern** in similar test files
2. **Add proper mocks** for external dependencies
3. **Include both happy path and error cases**
4. **Update this README** if adding new test categories
5. **Ensure tests are deterministic** and don't depend on external state

## Continuous Integration

Tests are designed to run reliably in CI environments:

- **No external dependencies** during test execution
- **Deterministic results** with proper mocking
- **Fast execution** with optimized test setup
- **Clear failure messages** for debugging

## Troubleshooting

### Common Problems

1. **Tests timing out**: Check for unmocked async operations
2. **Inconsistent failures**: Verify mock cleanup
3. **Memory leaks**: Ensure proper component unmounting
4. **Mock interference**: Check for global mock state

### Getting Help

1. Check existing test files for patterns
2. Review mock implementations
3. Consult Jest and React Testing Library docs
4. Verify environment setup in `jest.setup.js`