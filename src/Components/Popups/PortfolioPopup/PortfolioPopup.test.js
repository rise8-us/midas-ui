import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent } from '../../../Utilities/test-utils'
import { PortfolioPopup } from './index'

describe('<PortfolioPopup />', () => {
    jest.setTimeout(15000)

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitPortfolioMock = useModuleMock('Redux/Portfolios/actions', 'requestCreatePortfolio')
    const submitUpdatePortfolioMock = useModuleMock('Redux/Portfolios/actions', 'requestUpdatePortfolio')
    const selectTagsByTypesMock = useModuleMock('Redux/Tags/selectors', 'selectTagsByTypes')
    const selectAvailableProductsMock = useModuleMock('Redux/Products/selectors', 'selectAvailableProducts')

    const returnedTags = [
        { id: 4, label: 'Tag 1', description: '', color: '#000000' },
        { id: 2, label: 'Tag 2', description: '', color: '#000000' },
        { id: 13, label: 'scoped::label 1', description: '', color: '#000000' },
        { id: 14, label: 'scoped::label 2', description: '', color: '#000000' }
    ]

    const returnedProducts = [
        { id: 20, name: 'product 1' },
        { id: 21, name: 'product 2' },
    ]

    const returnedFoundPortfolio = {
        id: 4,
        name: 'Midas Portfolio',
        description: 'New Portfolio',
        projectIds: [4],
        isArchived: false,
        portfolioId: 2,
        tagIds: [4, 13],
        productManagerId: null,
        tags: [returnedTags[0], returnedTags[2]],
        products: [returnedProducts[0]]
    }

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({ payload: [{ id: 1, username: 'pm' }] })
        selectTagsByTypesMock.mockReturnValue(returnedTags)
        selectAvailableProductsMock.mockReturnValue(returnedProducts)
    })

    test('should render properly', async() => {
        render(<PortfolioPopup />)

        expect(await screen.findByText('Create Portfolio')).toBeInTheDocument()
    })

    test('should call onSubmit', async() => {
        useDispatchMock().mockResolvedValue({ payload: [] })
        render(<PortfolioPopup />)

        fireEvent.click(await screen.findByText('Submit'))

        expect(submitPortfolioMock).toHaveBeenCalledWith({
            name: '',
            description: '',
            tags: [],
            tagIds: [],
            teamIds: [],
            products: [],
            projectIds: [],
            childIds: [],
            productManagerId: null,
            type: 'PORTFOLIO'
        })
    })

    test('should close popup', async() => {
        render(<PortfolioPopup />)

        fireEvent.click(await screen.findByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })

    test('should display error messages', async() => {
        const state = {
            errors: {
                'portfolios/createOne': [
                    'portfolio name',
                    'Tag error'
                ]
            }
        }
        render(<PortfolioPopup />, { initialState: state })

        expect(await screen.findByText('portfolio name')).toBeInTheDocument()
        expect(screen.getByText('Tag error')).toBeInTheDocument()
    })

    test('should call onSubmit for updatePortfolio', async() => {
        const selectPortfolioByIdMock = useModuleMock('Redux/Portfolios/selectors', 'selectPortfolioById')
        selectPortfolioByIdMock.mockReturnValue(returnedFoundPortfolio)

        render(<PortfolioPopup id = {4} />)

        const name = 'My Edited Portfolio'
        const description = 'New description'

        const nameInput = screen.getByTestId('PortfolioPopup__input-name')
        const descriptionInput = screen.getByTestId('PortfolioPopup__input-description')

        userEvent.clear(descriptionInput)
        userEvent.clear(nameInput)

        userEvent.type(descriptionInput, description)
        userEvent.type(nameInput, name)

        fireEvent.click(screen.getAllByTitle(/open/i)[0])
        fireEvent.click(screen.getByText(/Tag 2/i))

        fireEvent.click(screen.getAllByTitle(/open/i)[1])
        fireEvent.click(screen.getByText('product 2'))

        fireEvent.click(screen.getByText('Submit'))

        expect(submitUpdatePortfolioMock).toHaveBeenCalledWith({
            ...returnedFoundPortfolio,
            name,
            description,
            projectIds: [],
            teamIds: [],
            childIds: [20, 21],
            tagIds: [4, 13, 2],
            productManagerId: null,
            type: 'PORTFOLIO'
        })
    })
})