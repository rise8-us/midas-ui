import React from 'react'
import { fireEvent, renderWithRouter, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { Assertion } from './index'

describe('<Assertion>', () => {

    const selectAssertionByIdMock = useModuleMock('Redux/Assertions/selectors', 'selectAssertionById')
    const selectAssertionsByParentIdMock = useModuleMock('Redux/Assertions/selectors', 'selectAssertionsByParentId')
    const requestCreateAssertionMock = useModuleMock('Redux/Assertions/actions', 'requestCreateAssertion')
    const requestUpdateAssertionMock = useModuleMock('Redux/Assertions/actions', 'requestUpdateAssertion')
    const requestDeleteAssertionMock = useModuleMock('Redux/Assertions/actions', 'requestDeleteAssertion')
    const hasProductAccessMock = useModuleMock('Redux/Auth/selectors', 'hasProductAccess')

    const assertionMock = {
        id: 1,
        text: 'TestAssertion',
        type: 'OBJECTIVE',
        status: 'ON_TRACK',
        parentId: undefined,
        productId: 3,
        children: []
    }

    const childAssertionMock = {
        id: 2,
        text: 'TestAssertionChild',
        type: 'MEASURE',
        status: 'NOT_STARTED',
        parentId: 1,
        productId: 3,
        children: []
    }

    test('should render', () => {
        selectAssertionByIdMock.mockReturnValue(assertionMock)
        selectAssertionsByParentIdMock.mockReturnValue([childAssertionMock])
        hasProductAccessMock.mockReturnValue(false)

        renderWithRouter(
            <Assertion
                productId = {3}
                order = {['OBJECTIVE', 'GOAL', 'STRATEGY', 'MEASURE']}
                id = {1}
            />
        )

        screen.getByText('Objective:')
        screen.getByDisplayValue('TestAssertion')
    })

    test('should not render add button', () => {
        selectAssertionByIdMock.mockReturnValue(childAssertionMock)
        selectAssertionsByParentIdMock.mockReturnValue([])
        hasProductAccessMock.mockReturnValue(true)

        renderWithRouter(
            <Assertion
                productId = {3}
                order = {['MEASURE']}
                id = {2}
            />
        )

        screen.getByText('Measure:')
        screen.getByDisplayValue('TestAssertionChild')
        expect(screen.queryAllByTitle('add new measure')).toHaveLength(0)
    })

    test('should call dispatch to request assertion creation', () => {
        useDispatchMock().mockReturnValueOnce({})

        selectAssertionByIdMock.mockReturnValue(assertionMock)
        selectAssertionsByParentIdMock.mockReturnValue([])
        hasProductAccessMock.mockReturnValue(true)

        renderWithRouter(
            <Assertion
                productId = {3}
                order = {['OBJECTIVE', 'GOAL', 'STRATEGY', 'MEASURE']}
                id = {1}
            />
        )

        fireEvent.mouseEnter(screen.getByDisplayValue('TestAssertion'))

        userEvent.click(screen.getByTitle('add new goal'))
        expect(requestCreateAssertionMock).toHaveBeenCalledWith({
            text: 'Enter new goal here...',
            type: 'GOAL',
            productId: 3,
            parentId: 1,
            status: 'NOT_STARTED',
            children: []
        })
    })

    test('should call dispatch to request assertion update', () => {
        useDispatchMock().mockReturnValueOnce({})

        selectAssertionByIdMock.mockReturnValue(assertionMock)
        selectAssertionsByParentIdMock.mockReturnValue([])
        hasProductAccessMock.mockReturnValue(true)

        renderWithRouter(
            <Assertion
                productId = {3}
                order = {['OBJECTIVE', 'GOAL', 'STRATEGY', 'MEASURE']}
                id = {1}
            />
        )

        userEvent.type(screen.getByDisplayValue(/TestAssertion/), 'TestAssertion Edit{Enter}')
        expect(requestUpdateAssertionMock).toHaveBeenCalledWith({
            ...assertionMock,
            text: 'TestAssertion Edit',
            children: []
        })
    })

    test('should not call dispatch to request assertion update if no change', () => {
        useDispatchMock().mockReturnValueOnce({})

        selectAssertionByIdMock.mockReturnValue(assertionMock)
        selectAssertionsByParentIdMock.mockReturnValue([])
        hasProductAccessMock.mockReturnValue(true)

        renderWithRouter(
            <Assertion
                productId = {3}
                order = {['OBJECTIVE', 'GOAL', 'STRATEGY', 'MEASURE']}
                id = {1}
            />
        )

        userEvent.type(screen.getByDisplayValue(/TestAssertion/), 'TestAssertion{Enter}')
        expect(requestUpdateAssertionMock).not.toHaveBeenCalled()
    })

    test('should call dispatch to request assertion deletion', () => {
        useDispatchMock().mockReturnValueOnce({})

        selectAssertionByIdMock.mockReturnValue(assertionMock)
        selectAssertionsByParentIdMock.mockReturnValue([])
        hasProductAccessMock.mockReturnValue(true)

        renderWithRouter(
            <Assertion
                productId = {3}
                order = {['OBJECTIVE', 'GOAL', 'STRATEGY', 'MEASURE']}
                id = {1}
            />
        )

        fireEvent.mouseEnter(screen.getByDisplayValue('TestAssertion'))

        userEvent.click(screen.getByTitle('delete'))
        userEvent.click(screen.getByText('confirm'))
        expect(requestDeleteAssertionMock).toHaveBeenCalledWith(1)
    })
})