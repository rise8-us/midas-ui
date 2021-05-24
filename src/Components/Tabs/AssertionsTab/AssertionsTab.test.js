import React from 'react'
import { render, screen, useModuleMock } from '../../../Utilities/test-utils'
import { AssertionsTab } from './index'

describe('<AssertionsTab>', () => {

    // const requestCreateAssertionMock = useModuleMock('Redux/Assertions/actions', 'requestCreateAssertion')
    const requestSearchAssertionsMock = useModuleMock('Redux/Assertions/actions', 'requestSearchAssertions')
    const selectAssertionsByTypeAndProductIdMock =
        useModuleMock('Redux/Assertions/selectors', 'selectAssertionsByTypeAndProductId')
    const selectAssertionByIdMock = useModuleMock('Redux/Assertions/selectors', 'selectAssertionById')

    const objective = {
        id: 1,
        productId: 2,
        parentId: null,
        text: 'Yolo goal',
        type: 'GOAL',
        status: 'NOT_STARTED',
        children: []
    }

    beforeEach(() => {
        selectAssertionsByTypeAndProductIdMock
            .mockReturnValueOnce([])
            .mockReturnValue([{ id: 1 }])

        requestSearchAssertionsMock.mockReturnValue({ type: '/', payload: {} })
        selectAssertionByIdMock.mockReturnValueOnce(objective)
    })

    test('should not render ProjectCards', () => {
        render(<AssertionsTab productId = {0}/>)

        expect(screen.getByDisplayValue('Yolo goal')).toBeInTheDocument()
    })

    // test.only('should call submitOGSM', async() => {
    //     requestCreateAssertionMock.mockResolvedValue({ type: '/', payload: {} })
    //     render(<AssertionsTab productId = {0}/>)

    //     fireEvent.click(screen.getByText(/add a new ogsm/i))
    //     fireEvent.click(screen.getByText(/submit ogsm/i))

    //     expect(screen.queryByText(/submit ogsm/i)).not.toBeInTheDocument()
    //     expect(screen.getAllByText('Objective:')).toHaveLength(2)
    // })

})