import React from 'react'
import ProductConstants from '../../../Redux/Products/constants'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, waitFor } from '../../../Utilities/test-utils'
import { ProductsTab } from './index'


describe('<ProductsTab />', () => {

    const allProducts = {
        id: 0,
        name: 'Product Test',
        description: 'desc 1',
        productJourneyMap: 1,
        gitlabProjectId: 1234567,
        tagIds: [1],
        isArchived: false,
        tags: [
            { id: 1,
                label: 'Tag Test',
                description: null,
                color: ''
            }
        ]
    }

    const selectAllProductsMock = useModuleMock('Redux/Products/selectors', 'getProducts')
    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')
    const archiveProductMock = useModuleMock('Redux/Tags/actions', 'requestArchiveProduct')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectAllProductsMock.mockReturnValue([allProducts])
    })

    test('Table display correctly', () => {
        render(<ProductsTab  />)

        expect(screen.getByText('Tags')).toBeInTheDocument()
        expect(screen.getByText('Description')).toBeInTheDocument()
        expect(screen.getByText('GitLab Project Id')).toBeInTheDocument()
        expect(screen.getByText('Product Test')).toBeInTheDocument()
        expect(screen.getByText('desc 1')).toBeInTheDocument()
        expect(screen.getByText('Tag Test')).toBeInTheDocument()
        expect(screen.getByText('1234567')).toBeInTheDocument()
    })

    test('Should fire updateProductPopup', () => {
        render(<ProductsTab />)

        fireEvent.click(screen.getByTitle('edit'))

        expect(openPopupMock).toHaveBeenCalledWith(
            ProductConstants.UPDATE_PRODUCT, 'UpdateProductPopup', { id: allProducts.id })
    })

    test('Should fire archive tag', () => {
        render(<ProductsTab />)

        fireEvent.click(screen.getByTitle('archive'))

        waitFor(() => expect(archiveProductMock).toHaveBeenCalledWith(allProducts.id, true))
    })

    test('Should fire unarchive tag', () => {
        selectAllProductsMock.mockReturnValue([{ ...allProducts, isArchived: true }])
        render(<ProductsTab />)

        fireEvent.click(screen.getByTitle('unarchive'))

        waitFor(() => expect(archiveProductMock).toHaveBeenCalledWith(allProducts.id, false))
    })

    test('Add Product calls openPopup', () => {
        render(<ProductsTab />)

        fireEvent.click(screen.getByText('Add New Product'))

        expect(openPopupMock).toHaveBeenCalledWith(ProductConstants.CREATE_PRODUCT, 'CreateProductPopup')
    })

})