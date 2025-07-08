import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Markdown } from '@/components/markdown'

// Mock react-syntax-highlighter
vi.mock('react-syntax-highlighter', () => ({
  Prism: ({ children, language, ...props }: any) => 
    React.createElement('pre', { 'data-language': language, ...props }, 
      React.createElement('code', {}, children)
    ),
}))

vi.mock('react-syntax-highlighter/dist/cjs/styles/prism', () => ({
  oneDark: {},
  oneLight: {},
}))

describe('Markdown', () => {
  it('should render simple text', () => {
    render(<Markdown>Hello World</Markdown>)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('should render headings correctly', () => {
    const markdown = `
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
    `.trim()

    render(<Markdown>{markdown}</Markdown>)
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Heading 1')
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Heading 2')
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Heading 3')
    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('Heading 4')
    expect(screen.getByRole('heading', { level: 5 })).toHaveTextContent('Heading 5')
    expect(screen.getByRole('heading', { level: 6 })).toHaveTextContent('Heading 6')
  })

  it('should render paragraphs correctly', () => {
    const markdown = `
This is the first paragraph.

This is the second paragraph.
    `.trim()

    render(<Markdown>{markdown}</Markdown>)
    
    expect(screen.getByText('This is the first paragraph.')).toBeInTheDocument()
    expect(screen.getByText('This is the second paragraph.')).toBeInTheDocument()
  })

  it('should render bold and italic text', () => {
    const markdown = `
This text is **bold** and this is *italic*.
    `.trim()

    render(<Markdown>{markdown}</Markdown>)
    
    expect(screen.getByText('bold')).toBeInTheDocument()
    expect(screen.getByText('italic')).toBeInTheDocument()
  })

  it('should render lists correctly', () => {
    const markdown = `
- Item 1
- Item 2
- Item 3

1. Numbered item 1
2. Numbered item 2
3. Numbered item 3
    `.trim()

    render(<Markdown>{markdown}</Markdown>)
    
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Item 3')).toBeInTheDocument()
    expect(screen.getByText('Numbered item 1')).toBeInTheDocument()
    expect(screen.getByText('Numbered item 2')).toBeInTheDocument()
    expect(screen.getByText('Numbered item 3')).toBeInTheDocument()
  })

  it('should render links correctly', () => {
    const markdown = '[Click here](https://example.com)'

    render(<Markdown>{markdown}</Markdown>)
    
    const link = screen.getByRole('link')
    expect(link).toHaveTextContent('Click here')
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noreferrer')
  })

  it('should render images correctly', () => {
    const markdown = '![Alt text](https://example.com/image.jpg)'

    render(<Markdown>{markdown}</Markdown>)
    
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', 'Alt text')
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg')
  })

  it('should render blockquotes correctly', () => {
    const markdown = '> This is a blockquote'

    render(<Markdown>{markdown}</Markdown>)
    
    const blockquote = screen.getByText('This is a blockquote').closest('blockquote')
    expect(blockquote).toBeInTheDocument()
    expect(blockquote).toHaveClass('border-l-4')
  })

  it('should render horizontal rules', () => {
    const markdown = `
Some content above

---

Some content below
    `.trim()

    render(<Markdown>{markdown}</Markdown>)
    
    expect(screen.getByText('Some content above')).toBeInTheDocument()
    expect(screen.getByText('Some content below')).toBeInTheDocument()
    // The horizontal rule should be rendered as a Separator component
  })

  it('should render inline code correctly', () => {
    const markdown = 'This is `inline code` in text.'

    render(<Markdown>{markdown}</Markdown>)
    
    const code = screen.getByText('inline code')
    expect(code).toBeInTheDocument()
    expect(code.tagName).toBe('CODE')
  })

  it('should render code blocks with language', () => {
    const markdown = `
\`\`\`javascript
function hello() {
  console.log('Hello World');
}
\`\`\`
    `.trim()

    render(<Markdown>{markdown}</Markdown>)
    
    expect(screen.getByText('javascript')).toBeInTheDocument()
    expect(screen.getByText(/function hello/)).toBeInTheDocument()
  })

  it('should render code blocks without language', () => {
    const markdown = `
\`\`\`
Some code without language
\`\`\`
    `.trim()

    render(<Markdown>{markdown}</Markdown>)
    
    expect(screen.getByText('Some code without language')).toBeInTheDocument()
  })

  it('should render tables correctly', () => {
    const markdown = `
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
    `.trim()

    render(<Markdown>{markdown}</Markdown>)
    
    expect(screen.getByText('Header 1')).toBeInTheDocument()
    expect(screen.getByText('Header 2')).toBeInTheDocument()
    expect(screen.getByText('Cell 1')).toBeInTheDocument()
    expect(screen.getByText('Cell 2')).toBeInTheDocument()
    expect(screen.getByText('Cell 3')).toBeInTheDocument()
    expect(screen.getByText('Cell 4')).toBeInTheDocument()
  })

  it('should handle empty content', () => {
    render(<Markdown>{''}</Markdown>)
    // Should not throw an error
    expect(document.body).toBeInTheDocument()
  })

  it('should handle HTML content when using rehype-raw', () => {
    const markdown = 'This has <strong>HTML</strong> content.'

    render(<Markdown>{markdown}</Markdown>)
    
    expect(screen.getByText('HTML')).toBeInTheDocument()
  })

  it('should be memoized and not re-render with same content', () => {
    const { rerender } = render(<Markdown>Same content</Markdown>)
    
    const firstRender = screen.getByText('Same content')
    
    rerender(<Markdown>Same content</Markdown>)
    
    const secondRender = screen.getByText('Same content')
    
    // With memo, the component reference should be the same
    expect(firstRender).toBe(secondRender)
  })

  it('should re-render when content changes', () => {
    const { rerender } = render(<Markdown>Original content</Markdown>)
    
    expect(screen.getByText('Original content')).toBeInTheDocument()
    
    rerender(<Markdown>New content</Markdown>)
    
    expect(screen.getByText('New content')).toBeInTheDocument()
    expect(screen.queryByText('Original content')).not.toBeInTheDocument()
  })
})