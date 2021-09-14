import React from 'react'
import { render, screen, useModuleMock } from 'Utilities/test-utils'
import { BlockerList } from './index'


jest.mock('Components/BlockerRow/BlockerRow', () => function testing(props) {
    return (
        <>
            <div>aId {props.assertionId}</div>
            <div>cId {props.commentId}</div>
            <div>pId {props.productId}</div>
        </>
    )
})

describe('<BlockerList />', () => {

    const selectBlockedAssertionsInAPortfolioMock = useModuleMock('Redux/Assertions/selectors',
        'selectBlockedAssertionsInAPortfolio')

    const blockers = [
        {
            id: 1,
            productId: 2,
            commentIds: [10, 11]
        }
    ]

    test('should render for all items within portfolios', () => {
        selectBlockedAssertionsInAPortfolioMock.mockReturnValue(blockers)

        render(<BlockerList portfolioId = {null}/>)

        expect(screen.getByText('aId 1')).toBeInTheDocument()
        expect(screen.getByText('pId 2')).toBeInTheDocument()
        expect(screen.getByText('cId 11')).toBeInTheDocument()
    })

    test('should for specific portfolioId', () => {
        const selectBlockedAssertionsByPortfolioIdMock = useModuleMock('Redux/Assertions/selectors',
            'selectBlockedAssertionsByPortfolioId')
        selectBlockedAssertionsByPortfolioIdMock.mockReturnValue([])

        render(<BlockerList portfolioId = {1}/>)

        expect(screen.getByText('No Blockers Detected! Yahoo!')).toBeInTheDocument()
    })

})