import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, waitFor } from '../../../Utilities/test-utils'
import { CreateAssertionsButton } from './index'

jest.mock('../../Assertions/AssertionHeader/AssertionHeader',
    () => function testing() { return (<div>AssertionHeader</div>) })

describe('<CreateAssertions>', () => {

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

        render(<CreateAssertionsButton productId = {1} ref = {mockRef} />)

        fireEvent.click(screen.getByText(/add a new ogsm/i))

        expect(screen.queryAllByText(/add a new ogsm/i)).toHaveLength(0)
        expect(await screen.findByText(/adding new ogsm/i)).toBeInTheDocument()

        expect(requestCreateAssertionMock).toHaveBeenCalledWith(blankObjective)
        waitFor(() => { expect(scrollIntoViewMock).toBeCalled() })
    })
})