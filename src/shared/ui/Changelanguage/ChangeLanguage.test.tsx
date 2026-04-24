import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import LanguageSwitcher from './ChangeLanguage'
const mockReplace = vi.fn()
const mockPathname = '/ru/dashboard'

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
  usePathname: () => mockPathname,
}))

vi.mock('next-intl', () => ({
  useLocale: () => 'ru',
}))

describe('ChangeLanguage Component',()=>{
it("have lang",()=>{
    render(<LanguageSwitcher />)

    expect(screen.getByText(/Русский/i)).toBeDefined()
})
it("should change language English",()=>{
    render(<LanguageSwitcher/>)
    const select=screen.getByRole("combobox")
    fireEvent.mouseDown(select)
    expect(screen.getByText(/English/i)).toBeDefined()
})
})