/**
 * Basic test to verify Jest setup is working
 */

describe('Basic Test Suite', () => {
  test('Jest setup is working', () => {
    expect(true).toBe(true)
  })

  test('Environment variables are set', () => {
    expect(process.env.NODE_ENV).toBe('test')
    expect(process.env.NEXT_PUBLIC_CONVEX_URL).toBeTruthy()
  })

  test('Math operations work correctly', () => {
    expect(2 + 2).toBe(4)
    expect(10 * 3).toBe(30)
  })
})