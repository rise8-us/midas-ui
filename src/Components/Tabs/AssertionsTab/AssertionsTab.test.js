import React from 'react'
import { fireEvent, renderWithRouter, screen, useModuleMock } from 'Utilities/test-utils'
import { AssertionsTab } from './index'

jest.mock('Components/Assertions/AssertionHeader/AssertionHeader',
    () => function testing(props) { return (<div onClick = {props.onCreate}>Header</div>) })

jest.mock('Components/Assertions/Assertion/Assertion',
    () => function testing() { return (<div>Assertion</div>) })

jest.mock('Components/Assertions/AssertionComments/AssertionComments',
    () => function testing() { return (<div>AssertionCommentsComponent</div>) })

describe('<AssertionsTab>', () => {
    const setAssertionCommentMock = useModuleMock('Redux/AppSettings/reducer', 'setAssertionComment')
    const requestSearchAssertionsMock = useModuleMock('Redux/Assertions/actions', 'requestSearchAssertions')
    const selectRootAssertionIdMock = useModuleMock('Redux/Assertions/selectors', 'selectRootAssertionId')
    const selectAssertionsByTypeAndProductIdMock =
        useModuleMock('Redux/Assertions/selectors', 'selectAssertionsByTypeAndProductId')

    beforeEach(() => {
        selectAssertionsByTypeAndProductIdMock.mockReturnValue([{ id: 1, text: '', commentIds: [] }])
        requestSearchAssertionsMock.mockReturnValue({ type: '/', payload: {} })
        setAssertionCommentMock.mockReturnValue({ type: '' })
    })

    test('should render selected OGSM', () => {
        selectRootAssertionIdMock.mockReturnValue(42)

        renderWithRouter(<AssertionsTab productId = {0} hasEdit = {false}/>)

        fireEvent.click(screen.getByText('Header'))
        fireEvent.click(screen.getByText('1'))

        expect(screen.getByText('1')).toHaveStyle('font-weight: 900')
        expect(screen.getAllByText('Assertion')).toHaveLength(1)
        expect(setAssertionCommentMock).toHaveBeenCalledWith({ assertionId: null, deletedAssertionId: null })
    })

    test('should render selected objective id through params', () => {
        selectAssertionsByTypeAndProductIdMock.mockReturnValue([{ id: 1, text: '', commentIds: [] }])
        selectRootAssertionIdMock.mockReturnValue(1)

        renderWithRouter(<AssertionsTab productId = {0} hasEdit = {false}/>)

        expect(screen.getByText('1')).toHaveStyle('font-weight: 900')
    })

    test('should show comments', () => {
        renderWithRouter(<AssertionsTab productId = {0} hasEdit = {false}/>, {
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