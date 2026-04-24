import { fireEvent, getByRole, render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import {Input} from './input'

describe('Input element',()=>{
    it('should handle input change', () => {
    const change = vi.fn()
    render(<Input label='' onChange={change}/>)
    
    const inputEl = screen.getByRole('textbox')
    fireEvent.change(inputEl, { target: { value: 'Senior' } })

    expect(change).toHaveBeenCalled()
    expect(change.mock.calls[0][0].target.value).toBe('Senior')
})
})