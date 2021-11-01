import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, waitFor } from 'Utilities/test-utils'
import { AssertionHeader } from './index'

describe('<AssertionHeader>', () => {
    const mockState = {
        app: {
            assertionStatus: {
                NOT_STARTED: { name: 'NOT_STARTED', label: 'Not Started', color: '#000000' },
                COMPLETED: { name: 'COMPLETED', label: 'Completed', color: '#000000' }
            }
        }
    }

    const requestCreateAssertionMock = useModuleMock('Redux/Assertions/actions', 'requestCreateAssertion')

    const blankMeasure = {
        text: 'Enter new measure here...',
        type: 'MEASURE',
        productId: 1,
        parentId: undefined,
        status: 'NOT_STARTED',
        children: []
    }
    const blankStrategy = {
        text: 'Enter new strategy here...',
        type: 'STRATEGY',
        productId: 1,
        parentId: undefined,
        status: 'NOT_STARTED',
        children: [blankMeasure]
    }
    const blankGoal = {
        text: 'Enter new goal here...',
        type: 'GOAL',
        productId: 1,
        parentId: undefined,
        status: 'NOT_STARTED',
        children: [blankStrategy]
    }
    const blankObjective = {
        text: 'Enter new objective here...',
        type: 'OBJECTIVE',
        productId: 1,
        parentId: undefined,
        status: 'NOT_STARTED',
        children: [blankGoal]
    }

    test('should fire request to create new OGSM', async() => {
        requestCreateAssertionMock.mockReturnValue({ type: '/', payload: {} })
        useDispatchMock().mockResolvedValue({ data: {} })
        const onCreateMock = jest.fn()

        render(<AssertionHeader productId = {1} onCreate = {onCreateMock} hasEdit/>, { initialState: mockState })

        fireEvent.click(screen.getByLabelText('Add new OGSM'))

        expect(await screen.findByTestId('AssertionHeader__icon-add')).toBeInTheDocument()

        expect(requestCreateAssertionMock).toHaveBeenCalledWith(blankObjective)
        waitFor(() => { expect(onCreateMock).toBeCalled() })
    })
})