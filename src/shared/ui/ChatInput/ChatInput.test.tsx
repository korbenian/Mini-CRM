import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ChatInput from './ChatInput'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

describe('ChatInput Component', () => {
  it('should render with the correct placeholder', () => {
    render(
      <ChatInput 
        input="" 
        setInput={vi.fn()} 
        onSend={vi.fn()} 
        placeholder="Type something..." 
      />
    )
    
    expect(screen.getByPlaceholderText('Type something...')).toBeDefined()
  })

  it('should call setInput when user types', () => {
    const mockSetInput = vi.fn()
    render(<ChatInput input="" setInput={mockSetInput} onSend={vi.fn()} />)

    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'Hello AI' } })

    expect(mockSetInput).toHaveBeenCalledWith('Hello AI')
  })

  it('should call onSend when the send button is clicked', () => {
    const mockOnSend = vi.fn()
    render(<ChatInput input="Test message" setInput={vi.fn()} onSend={mockOnSend} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockOnSend).toHaveBeenCalledTimes(1)
  })

  it('should call onSend when Enter is pressed (without Shift)', () => {
    const mockOnSend = vi.fn()
    render(<ChatInput input="Hello" setInput={vi.fn()} onSend={mockOnSend} />)

    const textarea = screen.getByRole('textbox')
    fireEvent.keyDown(textarea, { key: 'Enter', code: 'Enter', shiftKey: false })

    expect(mockOnSend).toHaveBeenCalled()
  })
})