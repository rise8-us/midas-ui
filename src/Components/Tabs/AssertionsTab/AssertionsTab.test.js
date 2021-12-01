import React from 'react'
import { renderWithRouter, screen, useModuleMock } from 'Utilities/test-utils'
import { commentSidebarOpen } from './AssertionsTab'
import { AssertionsTab } from './index'

jest.mock('Components/Cards/OGSM/StrategyCard/StrategyCard',
    () => (function testing() { return (<div>StrategyCard</div>) }))

jest.mock('Components/Cards/OGSM/MeasureContainer/MeasureContainer',
    () => (function testing() { return (<div>GoalCard</div>) }))

jest.mock('Components/Assertions/AssertionComments/AssertionComments',
    () => (function testing() { return (<div>AssertionCommentsComponent</div>) }))

describe('<AssertionsTab>', () => {
    const selectAssertionCommentInfoMock = useModuleMock('Redux/AppSettings/selectors', 'selectAssertionCommentInfo')
    const setAssertionCommentMock = useModuleMock('Redux/AppSettings/reducer', 'setAssertionComment')
    const requestSearchAssertionsMock = useModuleMock('Redux/Assertions/actions', 'requestSearchAssertions')
    const selectAssertionsByProductIdMock = useModuleMock('Redux/Assertions/selectors', 'selectAssertionsByProductId')

    const allAssertions = [
        { id: 1, text: '', commentIds: [], parentId: null },
        { id: 2, text: '', commentIds: [], parentId: 1 }
    ]

    beforeEach(() => {
        selectAssertionsByProductIdMock.mockReturnValue(allAssertions)
        requestSearchAssertionsMock.mockReturnValue({ type: '/', payload: {} })
        setAssertionCommentMock.mockReturnValue({ type: '' })
        selectAssertionCommentInfoMock.mockReturnValue({ id: null, type: null })
    })

    test('should render', () => {
        renderWithRouter(<AssertionsTab productId = {0} hasEdit = {false}/>)

        expect(screen.getByText('Objectives, Goals, Strategies, and Measures')).toBeInTheDocument()
        expect(screen.getByText('GoalCard')).toBeInTheDocument()
        expect(screen.getByText('StrategyCard')).toBeInTheDocument()
    })

    test('should show comments', () => {
        selectAssertionCommentInfoMock.mockReturnValue({ id: 1, type: 'assertions' })

        renderWithRouter(<AssertionsTab productId = {0} hasEdit = {false}/>)

        expect(screen.getByText('AssertionCommentsComponent')).toBeInTheDocument()
    })

    test('commentSidebarOpen', () => {
        expect(commentSidebarOpen(1, null)).toEqual(false)
        expect(commentSidebarOpen(null, 'foo')).toEqual(false)
        expect(commentSidebarOpen(null, null)).toEqual(false)
        expect(commentSidebarOpen(2, 'foo')).toEqual(true)
    })
})