import { render, screen } from '@testing-library/react'
import VercelFreeTierWarning from '@/components/vercel-free-tier-warning'

describe('VercelFreeTierWarning', () => {
  test('renders warning message', () => {
    render(<VercelFreeTierWarning />)
    
    expect(screen.getByText(/Vercel Free Tier Notice/)).toBeInTheDocument()
    expect(screen.getByText(/Functions timeout after 10 seconds/)).toBeInTheDocument()
  })

  test('displays test timeout button', () => {
    render(<VercelFreeTierWarning />)
    
    expect(screen.getByText('Test Timeout')).toBeInTheDocument()
  })
})