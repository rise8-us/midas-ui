import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, waitFor } from 'Utilities/test-utils'
import { AssertionHeader } from './index'

jest.mock('../../Assertions/AssertionEntry/AssertionEntry',
    () => function testing() { return (<div>AssertionEntry</div>) })

describe('<CreateAssertions>', () => {
    const mockState = {
        app: {
            assertionStatus: {
                NOT_STARTED: { name: 'NOT_STARTED', label: 'Not Started', color: '#000000' },
                COMPLETED: { name: 'COMPLETED', label: 'Completed', color: '#000000' }
            }
        }
    }

    const requestCreateAssertionMock = useModuleMock('Redux/Assertions/actions', 'requestCreateAssertion')
    const scrollIntoViewMock = jest.fn()

    const mockRef = React.createRef(<div />)
    mockRef.current = {
        scrollIntoView: () => scrollIntoViewMock
    }

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

        render(<AssertionHeader productId = {1} ref = {mockRef} hasEdit/>, { initialState: mockState })

        fireEvent.click(screen.getByTitle('Add new OGSM'))

        expect(await screen.findByTestId('AssertionHeader__icon-add')).toBeInTheDocument()

        expect(requestCreateAssertionMock).toHaveBeenCalledWith(blankObjective)
        waitFor(() => { expect(scrollIntoViewMock).toBeCalled() })
    })
})