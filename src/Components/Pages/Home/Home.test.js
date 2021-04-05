import React from 'react'
import ProductConstants from '../../../Redux/Products/constants'
import TagConstants from '../../../Redux/Tags/constants'
import TeamConstants from '../../../Redux/Teams/constants'
import {
    fireEvent, render, screen, useDispatchMock, useModuleMock
} from '../../../Utilities/test-utils'
import { Home } from './index'

describe('<Home>', () => {

    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')
    const allProductsMock = useModuleMock('Redux/Products/selectors', 'getProducts')
    const getProductByIdMock = useModuleMock('Redux/Products/selectors', 'getProductById')

    const products = {
        id: 0,
        name: 'product 1',
        description: 'desc 1',
        productJourneyMap: 2,
        tagIds: [1],
    }

    const product = {
        id: 0,
        name: 'product 1',
        description: 'desc 1',
        productJourneyMap: 2,
        tagIds: [1],
        tags: [
            { id: 1,
                label: 'Some tags',
                description: null,
                color: ''
            }
        ]
    }

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        allProductsMock.mockReturnValue([products])
        getProductByIdMock.mockReturnValue(product)
    })

    test('Has correct text', () => {
        render(<Home />)

        expect(screen.getByText('Add New Team')).toBeInTheDocument()
        expect(screen.getByText('Add New Product')).toBeInTheDocument()
        expect(screen.getByText('Measuring Inception to Production')).toBeInTheDocument()
    })

    test('Add Team calls openPopup', () => {
        render(<Home />)

        fireEvent.click(screen.getByText('Add New Team'))

        expect(openPopupMock).toHaveBeenCalledWith(TeamConstants.CREATE_TEAM, 'CreateTeamPopup')
    })

    test('Add Product calls openPopup', () => {
        render(<Home />)

        fireEvent.click(screen.getByText('Add New Product'))

        expect(openPopupMock).toHaveBeenCalledWith(ProductConstants.CREATE_PRODUCT, 'CreateProductPopup')
    })

    test('Add Tag calls openPopup', () => {
        render(<Home />)

        fireEvent.click(screen.getByText('Add New Tag'))

        expect(openPopupMock).toHaveBeenCalledWith(TagConstants.CREATE_TAG, 'CreateTagPopup')
    })
})