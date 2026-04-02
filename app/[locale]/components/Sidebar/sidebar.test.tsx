import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Sidebar from './Sidebar'

vi.mock('@/utils/supabase', () => ({
  supabase: {
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: { id: 'test-user-id' } },
        error: null,
      }),
      signIn: vi.fn(),
      signOut: vi.fn(),
    },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      upsert: vi.fn().mockReturnThis(),
      single: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
    })),
  },
}))


vi.mock('next-intl', () => ({
  useLocale: () => 'ru', 

  useTranslations: () => (key: string) => key,
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
}))


vi.mock('next-intl/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/',
}))


vi.mock('../hooks/useProfile', () => ({
  useRenderProfile: () => ({
    profileData: { role: 'user' },
    loading: false,
  }),
}))

describe('Sidebar Component', () => {
  it('должен отображать название Mini-CRM', () => {
    render(<Sidebar />)
    const brandName = screen.getByText(/Mini-CRM/i)
    expect(brandName).toBeDefined()
  })

  it('должен содержать ссылку на Dashboard', () => {
    render(<Sidebar />)

    expect(screen.getByText('navigation.dashboard')).toBeDefined()
  })

  it('should NOT show admin panel for a regular user',()=>{
    render(<Sidebar/>)
    const adminTitle =screen.queryByText('navigation.admin_title')
    expect(adminTitle).toBeNull()
  })
})