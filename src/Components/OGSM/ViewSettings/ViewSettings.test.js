import React from 'react'
import { fireEvent, render, screen, userEvent } from 'Utilities/test-utils'
import { ViewSettings } from './index'

jest.mock('Components/Assertions/AssertionHeader/AssertionHeader',
    () => function testing(props) { return (<div onClick = {() => props.onCreate()}>AssertionHeader</div>) })

describe('<ViewSettings />', () => {
    jest.setTimeout(40000)

    const objectives = [
        {
            id: 1,
            text: '1',
            isArchived: false,
            status: 'JACK SKELEYTON'
        }, {
            id: 2,
            text: '2',
            isArchived: false,
            status: 'OOOGHY BOOGIE'
        }, {
            id: 3,
            text: '3',
            isArchived: true,
            status: 'BAH'
        }, {
            id: 4,
            text: '4',
            isArchived: false,
            status: 'COMPLETED'
        }
    ]

    const requiredProps = {
        onChange: jest.fn,
        productId: 0,
        hasEdit: true
    }

    test('should render', () => {
        render(<ViewSettings objectives = {objectives} {...requiredProps}/>)

        expect(screen.getByText('1')).toBeInTheDocument()
        expect(screen.getByText('2')).toBeInTheDocument()
        expect(screen.queryByText('3')).not.toBeInTheDocument()
    })

    test('should handle show completed & archived filters', async() => {
        render(<ViewSettings objectives = {objectives} {...requiredProps}/>)

        userEvent.click(screen.getByTestId('FilterListIcon'))
        await screen.findByTestId('tooltipTitle')

        fireEvent.click(screen.getByTestId('ViewSettings__checkbox-completed'))
        expect(screen.getByText('3')).toBeInTheDocument()

        fireEvent.click(screen.getByTestId('ViewSettings__checkbox-archived'))
        expect(screen.getByText('4')).toBeInTheDocument()
    })

    test('should handle selected change', () => {
        render(<ViewSettings objectives = {objectives} {...requiredProps}/>)

        expect(screen.getByTestId('AssertionRootIdentifier-true')).toHaveAttribute('aria-label', '1')
        fireEvent.click(screen.getByText('2'))

        expect(screen.getByTestId('AssertionRootIdentifier-true')).toHaveAttribute('aria-label', '2')
    })

    test('should handle creation', () => {
        render(<ViewSettings objectives = {objectives} {...requiredProps}/>)

        expect(screen.getByTestId('AssertionRootIdentifier-true')).toHaveAttribute('aria-label', '1')

        fireEvent.click(screen.getByText('AssertionHeader'))

        expect(screen.queryByTestId('AssertionRootIdentifier-true')).not.toBeInTheDocument()
    })

})