import { act, render, screen, useDispatchMock, userEvent, waitFor } from 'Utilities/test-utils'
import { SearchUsers } from './index'

describe('<SearchUsers />', () => {
    jest.setTimeout(15000)

    const allUsers = [
        {
            id: 10,
            username: 'jsmith',
            displayName: 'Jon Jacob Jingle Hiemer Smith'
        }, {
            id: 11,
            username: 'foobar',
            dislayName: ''
        }
    ]

    beforeEach(() => {
        useDispatchMock()
            .mockResolvedValue({ type: '/', payload: allUsers })
    })

    test('should dispatch to onDataReturn', async() => {
        const onDataReturnMock = jest.fn()

        render(<SearchUsers onChange = {jest.fn} onDataReturn = { onDataReturnMock }/>)

        act(() => {
            userEvent.type(screen.getByPlaceholderText('username, display name, or email'), 'jsmith')
        })

        await waitFor(() => {
            expect(onDataReturnMock).toHaveBeenCalledWith(allUsers)
        })
    })

    test('should display users in dropdown', async() => {
        render(<SearchUsers/>)

        act(() => {
            userEvent.type(screen.getByPlaceholderText('username, display name, or email'), 'o')
        })

        expect(await screen.findByText(/Jacob/)).toBeInTheDocument()
        expect(screen.getByText('foobar')).toBeInTheDocument()
    })
})
