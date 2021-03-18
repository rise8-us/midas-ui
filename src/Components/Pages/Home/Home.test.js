import React from 'react'
import ProductConstants from '../../../Redux/Products/constants'
import TeamConstants from '../../../Redux/Teams/constants'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from '../../../Utilities/test-utils'
import { Home } from './index'

const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')

beforeEach(() => {
    useDispatchMock().mockReturnValue({})
})

test('<Home /> - Has correct text', () => {
    render(<Home />)

    expect(screen.getByText('Add New Team')).toBeInTheDocument()
    expect(screen.getByText('Add New Product')).toBeInTheDocument()
    expect(screen.getByText('Measuring Inception to Production')).toBeInTheDocument()
})

test('<Home /> - Add Team calls openPopup', () => {
    render(<Home />)

    fireEvent.click(screen.getByText('Add New Team'))

    expect(openPopupMock).toHaveBeenCalledWith(TeamConstants.CREATE_TEAM, 'CreateTeamPopup')
})

test('<Home /> - Add Product calls openPopup', () => {
    render(<Home />)

    fireEvent.click(screen.getByText('Add New Product'))

    expect(openPopupMock).toHaveBeenCalledWith(ProductConstants.CREATE_PRODUCT, 'CreateProductPopup')
})