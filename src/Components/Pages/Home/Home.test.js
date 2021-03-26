import React from 'react'
import ProductConstants from '../../../Redux/Products/constants'
import TeamConstants from '../../../Redux/Teams/constants'
import {
    fireEvent, render, screen, useDispatchMock, useModuleMock
} from '../../../Utilities/test-utils'
import { Home } from './index'

describe('<Home>', () => {

    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')
    const allProductsMock = useModuleMock('Redux/Products/selectors', 'getProducts')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        allProductsMock.mockReturnValue([{ name: 'testProduct', description: 'desc', tags: [], id: 0 }])
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
})