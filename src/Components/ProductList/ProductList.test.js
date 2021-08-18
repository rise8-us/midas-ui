import React from 'react'
import { fireEvent, render, screen, userEvent } from 'Utilities/test-utils'
import { ProductList } from './index'

jest.mock('../ProductOnePager/ProductOnePager',
    () => function testing() { return (<div>ProductOnePager</div>) })

describe('<ProductList>', () => {

    const productsList = [
        {
            id: 1,
            name: 'product 1',
            tags: [
                {
                    label: 'nope::not this',
                    color: '#000000'
                },
                {
                    label: 'yolo::this',
                    color: '#FFFFFF'
                },
            ],
            projects: [
                {
                    name: 'project 1',
                    projectJourneyMap: 3
                },
                {
                    name: 'project 2',
                    projectJourneyMap: 7
                }
            ]
        }
    ]

    test('should render', () => {
        render(<ProductList products = {productsList} tagScope = 'yolo'/>)

        expect(screen.getByText('product 1')).toBeInTheDocument()
    })

    test('should open and close popup', () => {
        render(<ProductList products = {productsList} tagScope = 'agileAF'/>)

        fireEvent.click(screen.getByText('product 1'))

        expect(screen.getByText('ProductOnePager')).toBeInTheDocument()

        userEvent.type(screen.getByText('ProductOnePager'), '{esc}')

        expect(screen.queryByText('ProductOnePager')).not.toBeInTheDocument()
    })

})