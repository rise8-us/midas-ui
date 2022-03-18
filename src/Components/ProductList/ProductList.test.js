import { createMemoryHistory } from 'history'
import { fireEvent, renderWithRouter, screen } from 'Utilities/test-utils'
import { ProductList } from './index'

describe('<ProductList>', () => {
    const history = createMemoryHistory()

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
        renderWithRouter(<ProductList products = {productsList} tagScope = 'yolo'/>)

        expect(screen.getByText('product 1')).toBeInTheDocument()
    })

    test('should nav to product Page', () => {
        renderWithRouter(<ProductList products = {productsList} tagScope = 'agileAF'/>, { history })

        fireEvent.click(screen.getByText('product 1'))

        expect(history.location.pathname).toEqual('/products/1/overview')
    })

})