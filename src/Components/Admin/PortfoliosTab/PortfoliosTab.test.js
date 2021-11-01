import React from 'react'
import PortfolioConstants from 'Redux/Portfolios/constants'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, waitFor } from 'Utilities/test-utils'
import { PortfoliosTab } from './index'


describe('<PortfoliosTab />', () => {

    const allPortfolios = {
        name: 'Portfolio Test',
        isArchived: false,
        tags: [
            {
                id: 1,
                label: 'Tag Test',
                description: null,
                color: ''
            }
        ],
        products: [
            {
                id: 2,
                name: 'Product',
            }
        ]
    }

    const selectAllPortfoliosMock = useModuleMock('Redux/Portfolios/selectors', 'selectAllPortfolios')
    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')
    const archivePortfolioMock = useModuleMock('Redux/Tags/actions', 'requestArchivePortfolio')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectAllPortfoliosMock.mockReturnValue([allPortfolios])
    })

    test('Table display correctly', () => {
        render(<PortfoliosTab  />)

        expect(screen.getByText('Name')).toBeInTheDocument()
        expect(screen.getByText('Product(s)')).toBeInTheDocument()
        expect(screen.getByText('Tag(s)')).toBeInTheDocument()
        expect(screen.getByText('Portfolio Test')).toBeInTheDocument()
        expect(screen.getByText('Product')).toBeInTheDocument()
        expect(screen.getByText('Tag Test')).toBeInTheDocument()
    })

    test('Should fire updatePortfolioPopup', () => {
        render(<PortfoliosTab />)

        fireEvent.click(screen.getByTitle('edit'))

        expect(openPopupMock).toHaveBeenCalledWith(
            PortfolioConstants.UPDATE_PORTFOLIO, 'PortfolioPopup', { id: allPortfolios.id })
    })

    test('Should fire archive tag', () => {
        render(<PortfoliosTab />)

        fireEvent.click(screen.getByTitle('archive'))

        waitFor(() => expect(archivePortfolioMock).toHaveBeenCalledWith(allPortfolios.id, true))
    })

    test('Should fire unarchive tag', () => {
        selectAllPortfoliosMock.mockReturnValue([{ ...allPortfolios, isArchived: true }])
        render(<PortfoliosTab />)

        fireEvent.click(screen.getByTitle('unarchive'))

        waitFor(() => expect(archivePortfolioMock).toHaveBeenCalledWith(allPortfolios.id, false))
    })

    test('Add Product calls openPopup', () => {
        render(<PortfoliosTab />)

        fireEvent.click(screen.getByText('Add New Portfolio'))

        expect(openPopupMock).toHaveBeenCalledWith(
            PortfolioConstants.CREATE_PORTFOLIO, 'PortfolioPopup')
    })

})