import AuthPage from "./Auth/AuthPage";
import ResetPassword from "./Auth/ResetPassword";
import EditProfile from "./EditProfile";
import AddExpense from "./ExpenseData/AddExpense";
import Navbar from "./Navbar"
import { render,screen } from "@testing-library/react";


test('renders Navbar component', () => {
    render(<Navbar />)
    const linkElement =screen.getByText(/edit profile/i)
    expect(linkElement).toBeInTheDocument()
})
test('renders Welocme component', () => {
    render(<Welcome />)
    const linkElement =screen.getByText(/Day to day expenses/i)
    expect(linkElement).toBeInTheDocument()
})
test('renders EditProfile component', () => {
    render(<EditProfile />)
    const linkElement =screen.getByText(/update/i)
    expect(linkElement).toBeInTheDocument()
})
test('renders AuthPage component', () => {
    render(<AuthPage />)
    const linkElement =screen.getByText(/Don't Have an account? SignUp/i)
    expect(linkElement).toBeInTheDocument()
})
test('renders AddExpense component', () => {
    render(<AddExpense />)
    const linkElement =screen.getByText(/add data/i)
    expect(linkElement).toBeInTheDocument()
})
test('renders resetpassord component', () => {
    render(<ResetPassword />)
    const linkElement =screen.getByText(/send link/i)
    expect(linkElement).toBeInTheDocument()
})