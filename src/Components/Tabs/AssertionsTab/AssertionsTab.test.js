import React from 'react'
import {
    render, screen, useModuleMock,
} from '../../../Utilities/test-utils'
import { AssertionsTab } from './index'

jest.mock('../../Assertions/AssertionHeader/AssertionHeader',
    () => function testing() { return (<div>AssertionHeader</div>) })

jest.mock('../../Assertions/AssertionComments/AssertionComments',
    () => function testing() { return (<div>AssertionCommentsComponent</div>) })

jest.mock('../../Assertions/CreateAssertionsButton/CreateAssertionsButton',
    () => function testing() { return (<div>CreateAssertionsButtonComponent</div>) })

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

        expect(screen.getAllByText('AssertionHeader')).toHaveLength(1)
        expect(setAssertionCommentMock).toHaveBeenCalledWith(null)
    })

    test('should render create assertions button component', () => {
        render(<AssertionsTab productId = {0}/>)

        expect(screen.getAllByText('CreateAssertionsButtonComponent')).toHaveLength(1)
    })

    test('should show comments', () => {
        render(<AssertionsTab productId = {0}/>, {
            initialState: {
                app: {
                    assertionCommentsOpen: 1
                }
            }
        })

        expect(screen.getByText('AssertionCommentsComponent')).toBeInTheDocument()
    })
})