import { MemoryRouter } from 'react-router-dom'
import { render, screen } from 'Utilities/test-utils'
import { PageNotFound } from './index'

describe('<PageNotFound />', () => {

    test('should have correct text', () => {
        render(<MemoryRouter><PageNotFound /></MemoryRouter>)

        expect(screen.getByText(/This is not the page you are looking for./i)).toBeInTheDocument()
    })

    test('should redirect to home', () => {
        render(<MemoryRouter><PageNotFound /></MemoryRouter>)
        const linkElement = screen.getByText(/Go Home/i)

        expect(linkElement).toBeInTheDocument()
        expect(linkElement).toHaveAttribute('href', '/home')
    })

})