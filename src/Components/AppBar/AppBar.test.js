import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import {
    fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent, waitFor
} from '../../Utilities/test-utils'
import { AppBar } from './index'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    })
}))

describe('<AppBar />', () => {

    const selectUserLoggedInMock = useModuleMock('Redux/auth/selectors', 'selectUserLoggedIn')
    const selectAppBarFilterMock = useModuleMock('Redux/filters/selectors', 'selectAppBarFilter')
    const setAppBarFilterStringMock = useModuleMock('Redux/filters/reducer', 'setAppBarFilterString')
    const getRootMock = useModuleMock('Utilities/queryParams', 'getRoot')

    beforeEach(() => {
        selectAppBarFilterMock.mockReturnValue('')
        getRootMock.mockReturnValue('home')
        useDispatchMock().mockReturnValue({})
    })

    test('should render no authd user', () => {
        selectUserLoggedInMock.mockReturnValue({})

        render(<AppBar appName = 'Midas'/>)

        expect(screen.getByText('Midas')).toBeInTheDocument()
        expect(screen.getByText('Dashboard (TBA)')).toBeInTheDocument()
        expect(screen.getByText('Projects')).toBeInTheDocument()
        expect(screen.getByText('Products')).toBeInTheDocument()
        expect(screen.getByText('Portfolios (TBA)')).toBeInTheDocument()

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
        render(
            <MemoryRouter>
                <AppBar appName = 'APP'/>
            </MemoryRouter>
        )

        fireEvent.click(screen.getByTitle('logo'))
        expect(mockHistoryPush).toHaveBeenCalledWith('/home')

        fireEvent.click(screen.getByText('APP'))
        expect(mockHistoryPush).toHaveBeenCalledWith('/home')

        fireEvent.click(screen.getByTitle('tags'))
        expect(mockHistoryPush).toHaveBeenCalledWith('/tags')

        fireEvent.click(screen.getByTitle('admin'))
        expect(mockHistoryPush).toHaveBeenCalledWith('/admin')

        fireEvent.click(screen.getByTitle('account'))
        expect(mockHistoryPush).toHaveBeenCalledWith('/account')

        // Page links

        fireEvent.click(screen.getByText('Dashboard (TBA)'))
        expect(mockHistoryPush).toHaveBeenCalledWith('/home')

        fireEvent.click(screen.getByText('Projects'))
        expect(mockHistoryPush).toHaveBeenCalledWith('/projects')

        fireEvent.click(screen.getByText('Products'))
        expect(mockHistoryPush).toHaveBeenCalledWith('/products')

        fireEvent.click(screen.getByText('Portfolios (TBA)'))
        expect(mockHistoryPush).toHaveBeenCalledWith('/portfolios')
    })
})