import { createMemoryHistory } from 'history'
import ProductConstants from 'Redux/Products/constants'
import { fireEvent, render, renderWithRouter, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { ProductCard } from './index'

describe('<ProductCard />', () => {
    const product = {
        id: 4,
        name: 'Midas',
        description: 'New Product',
        projectIds: [2],
        isArchived: false,
        portfolioId: 2,
        tagIds: [4],
        tags: [
            {   id: 4,
                label: 'Some tags',
                description: null,
                color: ''
            }
        ],
        projects: [{ id: 2, name: 'project 1', projectJourneyMap: 0 }]
    }
    const product2 = {
        ...product,
        projects: []
    }

    const hasProductAccessMock = useModuleMock('Redux/Auth/selectors', 'hasProductAccess')
    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')
    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectProductByIdMock.mockReturnValue(product)
        hasProductAccessMock.mockReturnValue(false)
    })

    test('should display data with projects', () => {
        render(<ProductCard id = {product.id}/>)

        expect(screen.getByText('Midas')).toBeInTheDocument()
        expect(screen.getByText('Some tags')).toBeInTheDocument()
        expect(screen.getByText('project 1')).toBeInTheDocument()
    })

    test('should display data without projects', () => {
        selectProductByIdMock.mockReturnValue(product2)
        render(<ProductCard id = {product.id}/>)

        expect(screen.getByText('Midas')).toBeInTheDocument()
        expect(screen.getByText('Some tags')).toBeInTheDocument()
        expect(screen.queryByText('project 1')).not.toBeInTheDocument()
    })

    test('should call ProductPopup', () => {
        hasProductAccessMock.mockReturnValue(true)
        render(<ProductCard id = {product.id}/>)

        fireEvent.click(screen.getByTestId('ProductCard__button-edit'))

        expect(openPopupMock).toHaveBeenCalledWith(
            ProductConstants.UPDATE_PRODUCT, 'ProductPopup', { id: product.id })
    })

    test('should go to products page', () => {
        const history = createMemoryHistory()

        renderWithRouter(<ProductCard id = {product.id}/>, { history })

        fireEvent.click(screen.getByText('Midas'))

        expect(history.location.pathname).toEqual('/products/4/overview')
    })

})