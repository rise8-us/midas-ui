import React from 'react'
import {
    act, fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent, waitFor
} from 'Utilities/test-utils'
import { SearchEpics } from './index'

describe('<SearchEpics>', () => {

    const requestFetchSearchEpicsMock = useModuleMock('Redux/Epics/actions', 'requestFetchSearchEpics')

    const mockResponse = [
        { id: 1, productId: 10, title: 'titleA' },
        { id: 2, productId: 11, title: 'titleB' },
        { id: 3, productId: 10, title: 'titleC' },
        { id: 4, productId: 12, title: 'titleD' }
    ]

    const mockStore = {
        products: {
            10: { name: 'product1' },
            11: { name: 'product2' },
            12: { name: 'product3' }
        }
    }

    test('should render', async() => {
        useDispatchMock().mockResolvedValue({ type: '/', payload: [] })

        render(<SearchEpics onChange = {jest.fn}/>)

        expect(await screen.findByPlaceholderText('Link epics by title or product name')).toBeInTheDocument()
    })

    test('should call onChange & searchEpics API', async() => {
        jest.useFakeTimers()

        await waitFor(() => {
            useDispatchMock().mockResolvedValue({ type: '/', payload: mockResponse })
        })
        const onChangeMock = jest.fn()

        render(<SearchEpics onChange = {onChangeMock}/>, { initialState: mockStore })

        act(() => {
            userEvent.type(screen.getByPlaceholderText('Link epics by title or product name'), 'A')
            jest.runAllTimers()
        })

        expect(await screen.findByText('titleA')).toBeInTheDocument()
        expect(screen.getByText('product1')).toBeInTheDocument()
        expect(screen.queryByText('title')).not.toBeInTheDocument()

        fireEvent.click(screen.getByText('titleA'))

        expect(onChangeMock.mock.calls[0][1]).toEqual([{ ...mockResponse[0], productName: 'product1' }])
        expect(requestFetchSearchEpicsMock)
            .toHaveBeenLastCalledWith('title:*A* OR product.name:*A*')
        jest.useRealTimers()
    })

    test('should handle search params', async() => {
        jest.useFakeTimers()

        await waitFor(() => {
            useDispatchMock().mockResolvedValue({ type: '/', payload: mockResponse })
        })

        render(
            <SearchEpics
                onChange = {jest.fn()}
                excludeClosed
                defaultSearchTerms = 'foobar'
            />, { initialState: mockStore }
        )

        act(() => {
            userEvent.type(screen.getByPlaceholderText('Link epics by title or product name'), 'A')
        })
        act(() => {
            jest.runAllTimers()
        })

        expect(await screen.findByText('titleA')).toBeInTheDocument()

        expect(requestFetchSearchEpicsMock)
            .toHaveBeenLastCalledWith('state!closed AND title:*A* OR product.name:*A* AND foobar')
        jest.useRealTimers()
    })

})