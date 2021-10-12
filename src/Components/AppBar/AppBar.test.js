import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import {
    fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent, waitFor
} from 'Utilities/test-utils'
import { AppBar } from './index'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}))

describe('<AppBar />', () => {

    const selectUserLoggedInMock = useModuleMock('Redux/Auth/selectors', 'selectUserLoggedIn')
    const selectAppBarFilterMock = useModuleMock('Redux/Filters/selectors', 'selectAppBarFilter')
    const setAppBarFilterStringMock = useModuleMock('Redux/Filters/reducer', 'setAppBarFilterString')
    const getRootMock = useModuleMock('Utilities/queryParams', 'getRoot')

    beforeEach(() => {
        selectAppBarFilterMock.mockReturnValue('')
        getRootMock.mockReturnValue('products')
        useDispatchMock().mockReturnValue({})
    })

    test('should render no authd user', () => {
        selectUserLoggedInMock.mockReturnValue({})

        render(<AppBar />)

        expect(screen.getByTestId('AppBar__logo')).toBeInTheDocument()
        expect(screen.getByText('Dashboard')).toBeInTheDocument()
        expect(screen.getByText('Projects')).toBeInTheDocument()
        expect(screen.getByText('Products')).toBeInTheDocument()
        expect(screen.getByText('Portfolios')).toBeInTheDocument()

        expect(screen.getByTitle('tags')).toBeInTheDocument()
        expect(screen.queryByTitle('account')).not.toBeInTheDocument()
        expect(screen.queryByTitle('admin')).not.toBeInTheDocument()
    })

    test('should render regular user', () => {
        selectUserLoggedInMock.mockReturnValue({ id: 1, isAdmin: false })

        render(<AppBar/>)

        expect(screen.getByTitle('account')).toBeInTheDocument()
        expect(screen.queryByTitle('admin')).not.toBeInTheDocument()
    })

    test('should render admin user', () => {
        selectUserLoggedInMock.mockReturnValue({ id: 1, isAdmin: true })

        render(<AppBar/>)

        expect(screen.getByTitle('account')).toBeInTheDocument()
        expect(screen.getByTitle('admin')).toBeInTheDocument()
    })

    test('should handle search input', async() => {
        selectUserLoggedInMock.mockReturnValue({ id: 1, isAdmin: false })
        selectAppBarFilterMock.mockReturnValue('test')

        render(<AppBar/>)
        userEvent.type(screen.getByPlaceholderText('Search'), 'SearchString')

        waitFor(() => expect(setAppBarFilterStringMock).toHaveBeenCalledWith('SearchString'))
    })

    test('should links navigate correctly', () => {
        selectUserLoggedInMock.mockReturnValue({ id: 1, isAdmin: true })

        render(<MemoryRouter><AppBar /></MemoryRouter>)

        fireEvent.click(screen.getByTestId('AppBar__logo'))
        expect(mockHistoryPush).toHaveBeenCalledWith('/dashboard')

        fireEvent.click(screen.getByTitle('tags'))
        expect(mockHistoryPush).toHaveBeenCalledWith('/tags')

        fireEvent.click(screen.getByTitle('admin'))
        expect(mockHistoryPush).toHaveBeenCalledWith('/admin')

        fireEvent.click(screen.getByTitle('account'))
        expect(mockHistoryPush).toHaveBeenCalledWith('/account')

        // Page links

        fireEvent.click(screen.getByText('Dashboard'))
        expect(mockHistoryPush).toHaveBeenCalledWith('/dashboard')

        fireEvent.click(screen.getByText('Projects'))
        expect(mockHistoryPush).toHaveBeenCalledWith('/projects')

        fireEvent.click(screen.getByText('Products'))
        expect(mockHistoryPush).toHaveBeenCalledWith('/products')

        fireEvent.click(screen.getByText('Portfolios'))
        expect(mockHistoryPush).toHaveBeenCalledWith('/portfolios')
    })
})