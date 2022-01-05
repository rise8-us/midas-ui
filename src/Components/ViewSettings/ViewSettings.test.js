import React from 'react'
import { fireEvent, render, screen, userEvent } from 'Utilities/test-utils'
import { ViewSettings } from './index'

jest.mock('Components/Assertions/AssertionHeader/AssertionHeader',
    () => function testing(props) { return (<div onClick = {props.onCreate}>AssertionHeader</div>) })

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
        await screen.findByTestId('TooltipOptions__wrap')

        fireEvent.click(screen.getByText('Show Completed'))
        expect(screen.getByText('3')).toBeInTheDocument()

        fireEvent.click(screen.getByText('Show Archived'))
        expect(screen.getByText('4')).toBeInTheDocument()
    })

    test('should handle selected change', () => {
        render(<ViewSettings objectives = {objectives} {...requiredProps}/>)

        expect(screen.getByTestId('AssertionRootIdentifier-true')).toContainElement(screen.getByText('1'))
        fireEvent.click(screen.getByText('2'))

        expect(screen.getByTestId('AssertionRootIdentifier-true')).toContainElement(screen.getByText('2'))
    })

    test('should handle creation', () => {
        const { rerender } = render(<ViewSettings objectives = {objectives} {...requiredProps}/>)
        const newObjectives = [...objectives, { id: 5, text: '5', isArchived: false, status: 'SANTY CLAWS' }]

        expect(screen.getAllByTestId('ViewSettings__item')).toHaveLength(2)
        fireEvent.click(screen.getByText('AssertionHeader'))

        rerender(<ViewSettings objectives = {newObjectives} {...requiredProps} selectedIndex = {5}/>)

        expect(screen.getAllByTestId('ViewSettings__item')).toHaveLength(3)

        expect(screen.getByTestId('AssertionRootIdentifier-true')).toContainElement(screen.getByText('3'))
    })

})