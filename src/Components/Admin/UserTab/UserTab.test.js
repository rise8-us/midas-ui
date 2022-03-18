import { act, render, screen, useDispatchMock, useModuleMock, userEvent, waitFor } from 'Utilities/test-utils'
import { UserTab } from './index'

jest.mock('Components/UserRoles/UserRoles',
    () => (function testing() { return (<div>UserRoles test</div>) }))

jest.mock('Components/UserSettings/UserSettings',
    () => (function testing() { return (<div>UserSettings test</div>) }))

describe('<UserTab />', () => {
    jest.setTimeout(15000)

    const selectUserByIdMock = useModuleMock('Redux/Users/selectors', 'selectUserById')

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

        expect(screen.queryByText('baby yoda')).not.toBeInTheDocument()
        const element = screen.getByTestId('UserTab__search-input')
        userEvent.type(element, 'yoda')

        selectUserByIdMock.mockReturnValue(user)
        rerender(<UserTab />)

        expect(await screen.findByText('baby yoda')).toBeInTheDocument()

        userEvent.click(screen.getByTestId('Table__row'))

        expect(screen.getByText('UserRoles test')).toBeInTheDocument()
        expect(screen.getByText('UserSettings test')).toBeInTheDocument()

        userEvent.click(screen.queryByDisplayValue('yoda'))
        userEvent.clear(screen.queryByDisplayValue('yoda'))
        expect(screen.queryByDisplayValue('yoda')).not.toBeInTheDocument()

    })

})