import {render, screen} from '@testing-library/react'
import LoginForm from './Login'

describe('Async Login component', () => {
    test('renders login componnet', () => {
        render(<LoginForm />)
        const element = screen.getByText(/login/i)
        expect(element).toBeInTheDocument()
    })
})