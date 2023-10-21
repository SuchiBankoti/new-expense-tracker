import {render, screen} from '@testing-library/react'
import SignUpForm from './SignUp'

describe('Async Login component', () => {
    test('renders login componnet', () => {
        render(<SignUpForm />)
        const element = screen.getByText(/Sign Up/i)
        expect(element).toBeInTheDocument()
    })
})