import { fireEvent, render, screen } from 'Utilities/test-utils'
import { ProductList } from './index'

const mockHistoryPush = jest.fn()
jest.mock('Hooks/useHistory', () => () => ({
    push: mockHistoryPush
}))

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

    test('should nav to product Page', () => {
        render(<ProductList products = {productsList} tagScope = 'agileAF'/>)

        fireEvent.click(screen.getByText('product 1'))

        expect(mockHistoryPush).toHaveBeenCalledWith('/products/1/overview')
    })

})