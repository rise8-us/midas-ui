import React from 'react'
import { render, screen, useModuleMock } from 'Utilities/test-utils'
import { AssertionsTab } from './index'

jest.mock('Components/Assertions/Assertion/Assertion',
    () => function testing() { return (<div>Assertion</div>) })

jest.mock('Components/Assertions/AssertionComments/AssertionComments',
    () => function testing() { return (<div>AssertionCommentsComponent</div>) })

describe('<AssertionsTab>', () => {

    const setAssertionCommentMock = useModuleMock('Redux/AppSettings/reducer', 'setAssertionComment')
    const requestSearchAssertionsMock = useModuleMock('Redux/Assertions/actions', 'requestSearchAssertions')
    const selectAssertionsByTypeAndProductIdMock =
        useModuleMock('Redux/Assertions/selectors', 'selectAssertionsByTypeAndProductId')

    beforeEach(() => {
        selectAssertionsByTypeAndProductIdMock
            .mockReturnValueOnce([])
            .mockReturnValue([{ id: 1, commentIds: [] }])

        requestSearchAssertionsMock.mockReturnValue({ type: '/', payload: {} })
        setAssertionCommentMock.mockReturnValue({ type: '' })
    })

    test('should render OGSM', () => {
        render(<AssertionsTab productId = {0}/>)

        expect(screen.getAllByText('Assertion')).toHaveLength(1)
        expect(setAssertionCommentMock).toHaveBeenCalledWith({ assertionId: null, deletedAssertionId: null })
    })

    test('should show comments', () => {
        render(<AssertionsTab productId = {0}/>, {
            initialState: {
                app: {
                    assertionCommentsOpen: 1,
                    assertionStatus: {
                        COMPLETED: { name: 'COMPLETED', label: 'Completed', color: '#000000' }
                    }
                }
            }
        })

        expect(screen.getByText('AssertionCommentsComponent')).toBeInTheDocument()
    })
})