import React from 'react'
import {
    act, fireEvent, render, screen, useModuleMock, useDispatchMock, waitFor
} from '../../../Utilities/test-utils'
import { CreateAssertions } from './index'

describe('<CreateAssertions>', () => {

    const requestCreateAssertionMock = useModuleMock('Redux/Assertions/actions', 'requestCreateAssertion')

    test('should call submitOGSM', async() => {
        const setShowCreateMock = jest.fn()
        requestCreateAssertionMock.mockReturnValue({ type: '/', payload: {} })
        useDispatchMock().mockResolvedValue({ data: {} })

        render(<CreateAssertions productId = {0} setShowCreate = {setShowCreateMock} />)

        act(() => {
            fireEvent.click(screen.getByText(/submit ogsm/i))
        })
        expect(screen.queryAllByText(/submit ogsm/i)).toHaveLength(0)
        await waitFor(() => screen.getByText(/submitting ogsm/i))

        expect(requestCreateAssertionMock).toHaveBeenCalled()
        expect(setShowCreateMock).toHaveBeenCalledWith(false)
    })

})