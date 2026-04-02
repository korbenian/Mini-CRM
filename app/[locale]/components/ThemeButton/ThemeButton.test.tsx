import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach } from 'node:test'
import { describe, it, expect, vi } from 'vitest'
import ThemeButton from './ThemeButton'
describe("ThemeButton",()=>{
    beforeEach(()=>{
        localStorage.clear()
        document.body.className=''
    })
    it('',()=>{
        render(<ThemeButton/>)
        expect(screen.getByRole('button')).toBeDefined()
    })
    it('',()=>{
        render(<ThemeButton/>)
        const button=screen.getByRole('button')
        fireEvent.click(button)
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(document.body.className).toBe('dark-mode')
    })
    it('',()=>{
        localStorage.setItem('theme','dark')
        render(<ThemeButton/>)
        expect(document.body.className).toBe('dark-mode')
    })
})