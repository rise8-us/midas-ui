import {
    act, fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent, waitFor
} from 'Utilities/test-utils'
import { UserTab } from './index'

describe('<UserTab />', () => {
    jest.setTimeout(15000)

    const selectUserByIdMock = useModuleMock('Redux/Users/selectors', 'selectUserById')
    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')

    beforeEach(() => {
        selectUserByIdMock.mockReturnValue({})
    })

    const user = {
        id: 42,
        username: 'grogu',
        displayName: 'baby yoda',
        email: 'yoda.2@mando.space'
    }

    test('should render', async() => {
        act(() => {
            useDispatchMock().mockResolvedValue({ action: '/', payload: null })
        })

        render(<UserTab />)

        waitFor(() => { expect(screen.getByPlaceholderText('Search…')).toBeInTheDocument() })
    })

    test('should render with zero results', async() => {
        act(() => {
            useDispatchMock().mockResolvedValue({ action: '/', payload: null })
        })

        render(<UserTab />)

        const element = screen.getByTestId('UserTab__search-input')
        userEvent.type(element, 'yoda{enter}')

        await waitFor(() => { expect(screen.getByPlaceholderText('Search…')).toBeInTheDocument() })
    })

    test('should render search results', async() => {
        act(() => {
            useDispatchMock().mockResolvedValue({ payload: [user] })
        })

        const { rerender } = render(<UserTab />)

        userEvent.type(screen.getByTestId('UserTab__search-input'), 'yoda')

        selectUserByIdMock.mockReturnValue(user)
        rerender(<UserTab />)

        expect(await screen.findByText('baby yoda')).toBeInTheDocument()

        fireEvent.click(screen.getByTestId('Table__row'))

        expect(openPopupMock).toHaveBeenCalledWith('users/update', 'UserPopup', { 'id': 42 })
    })

})