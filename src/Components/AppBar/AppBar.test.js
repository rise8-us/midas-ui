import {
    fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent, waitFor
} from 'Utilities/test-utils'
import { AppBar } from './index'

const mockHistoryPush = jest.fn()
jest.mock('Hooks/useHistory', () => () => ({
    push: mockHistoryPush
}))

describe('<AppBar />', () => {
    jest.setTimeout(15000)

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
        expect(screen.queryByTitle('Dashboard')).not.toBeInTheDocument()
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

        await waitFor(() => expect(setAppBarFilterStringMock).toHaveBeenCalledWith('SearchString'))
    })

    test('should links navigate correctly', () => {
        selectUserLoggedInMock.mockReturnValue({ id: 1, isAdmin: true })

        render(<AppBar />)

        fireEvent.click(screen.getByTestId('AppBar__logo'))
        expect(mockHistoryPush).toHaveBeenLastCalledWith('/portfolios')

        fireEvent.click(screen.getByTitle('tags'))
        expect(mockHistoryPush).toHaveBeenLastCalledWith('/tags')

        fireEvent.click(screen.getByTitle('admin'))
        expect(mockHistoryPush).toHaveBeenLastCalledWith('/admin')

        fireEvent.click(screen.getByTitle('account'))
        expect(mockHistoryPush).toHaveBeenLastCalledWith('/account')

        // Page links

        fireEvent.click(screen.getByText('Projects'))
        expect(mockHistoryPush).toHaveBeenLastCalledWith('/projects')

        fireEvent.click(screen.getByText('Products'))
        expect(mockHistoryPush).toHaveBeenLastCalledWith('/products')

        fireEvent.click(screen.getByText('Portfolios'))
        expect(mockHistoryPush).toHaveBeenLastCalledWith('/portfolios')

    })

    test('should link to support channels', () => {
        selectUserLoggedInMock.mockReturnValue({ id: 1, isAdmin: false })

        render(<AppBar />)

        fireEvent.click(screen.getByTestId('ContactSupportIcon'))

        expect(screen.getAllByTestId('MoreOptionsPopperMenu__link')).toHaveLength(4)
        expect(screen.getByRole('link', { name: 'Submit feedback' }))
            .toHaveAttribute('href', 'https://chat.il2.dso.mil/midas/channels/feedback')
        expect(screen.getByRole('link', { name: 'Request support' }))
            .toHaveAttribute('href', 'https://chat.il2.dso.mil/midas/channels/support')
        expect(screen.getByRole('link', { name: 'Report a bug' }))
            .toHaveAttribute('href', 'https://chat.il2.dso.mil/midas/channels/bugs')
        expect(screen.getByRole('link', { name: 'Change log' }))
            .toHaveAttribute('href', 'https://chat.il2.dso.mil/midas/channels/announcements')
    })

})