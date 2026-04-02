import { render, screen, fireEvent, getByText } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Button from '../Button/Button'
describe('Button Element',()=>{

it('render ',()=>{
    render(<Button label='something' type='button' />)
const ButtonElement = screen.getByText('something')
expect(ButtonElement).toBeDefined()
})
it('should call onClick when submit',()=>{
    const clicked =vi.fn()
    render(<Button label='submit' type='button' onClick={clicked} />)
    const buttonElement =screen.getByText('submit')
fireEvent.click(buttonElement)
expect(clicked).toHaveBeenCalledTimes(1)
})

})