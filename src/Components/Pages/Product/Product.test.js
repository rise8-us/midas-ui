import React from 'react'
import { fireEvent, renderWithRouter, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { Product } from './index'

jest.mock('../../Tabs/ProjectsTab/ProjectsTab',
    () => function testing() { return (<div>ProjectsTab</div>) })

jest.mock('../../Tabs/AssertionsTab/AssertionsTab',
    () => function testing() { return (<div>AssertionsTab</div>) })

jest.mock('../../ProductOnePager/ProductOnePager',
    () => function testing() { return (<div>ProductOnePager</div>) })

jest.mock('../../Page/Page',
    () => function testing({ children }) { return (<div>{children}</div>) })

describe('<Product>', () => {

    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')

    const product = {
        id: 0,
        name: 'Product 1',
        description: '',
        tagIds: [4],
        tags: [
            {   id: 4,
                label: 'Some tags',
                description: null,
                color: ''
            }
        ]
    }

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectProductByIdMock.mockReturnValue(product)
    })

    test('should have correct header text', () => {
        renderWithRouter(<Product />)

        expect(screen.getByTestId('ProductHeader__input-name').querySelector('input')).toHaveValue('Product 1')
        expect(screen.getByPlaceholderText('Description not set...')).toBeInTheDocument()
        expect(screen.getByText(/Some tags/i)).toBeInTheDocument()
    })

    test('should render projects tab', () => {
        renderWithRouter(<Product />)

        fireEvent.click(screen.getByText(/Projects/i))
        expect(screen.getByText('ProjectsTab')).toBeInTheDocument()
    })

    test('should render about tab', () => {
        renderWithRouter(<Product />)

        fireEvent.click(screen.getByText(/about/i))
        expect(screen.getByText('ProductOnePager')).toBeInTheDocument()
    })

})