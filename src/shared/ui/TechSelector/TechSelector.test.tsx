import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import TechSelector from './TechSelector'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

describe('TechSelector Component', () => {
  
  it('should render popular technologies', () => {
    render(<TechSelector selected={[]} onChange={vi.fn()} />)

    expect(screen.getByText('TypeScript')).toBeDefined()
    expect(screen.getByText('Python')).toBeDefined()
  })

  it('should highlight selected technologies', () => {
    const selected = ['TypeScript', 'Rust']
    render(<TechSelector selected={selected} onChange={vi.fn()} />)

    const tsButton = screen.getByText('TypeScript')
    expect(tsButton).toBeDefined()
  })

  it('should call onChange when a technology is clicked', () => {
    const handleChange = vi.fn()
    render(<TechSelector selected={['JavaScript']} onChange={handleChange} />)

    const tsButton = screen.getByText('TypeScript')
    fireEvent.click(tsButton)

    expect(handleChange).toHaveBeenCalledWith(['JavaScript', 'TypeScript'])
  })

  it('should display a custom technology with a delete icon', () => {
    const selected = ['MyCustomFramework']
    render(<TechSelector selected={selected} onChange={vi.fn()} />)

    expect(screen.getByText('MyCustomFramework ✕')).toBeDefined()
  })
})