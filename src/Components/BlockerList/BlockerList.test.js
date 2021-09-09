import React from 'react'
import { render, screen, useModuleMock } from 'Utilities/test-utils'
import { BlockerList } from './index'

describe('<DashboardCard />', () => {

    const selectAllBlockedAssertionsWithParentIdMock = useModuleMock('Redux/BlockedAssertions/selectors',
        'selectAllBlockedAssertionsWithParentId')

    const mockState = {
        app: {
            assertionStatus: {
                'BLOCKED': {
                    label: 'Blocked',
                    color: '#000000'
                },
                'AT_RISK': {
                    label: 'At Risk',
                    color: '#FFFFFF'
                }
            }
        }
    }

    const blockers = [
        {
            productId: 1,
            productName: 'product_1',
            comment: {
                text: 'comment_1###',
                lastEdit: '2021-07-03T06:04:53.000Z'
            },
            assertion: {
                id: 2,
                status: 'BLOCKED',
                text: 'assertion_1'
            }
        },
        {
            productId: 2,
            productName: 'product_2',
            comment: {
                text: 'comment_2###',
                creationDate: '2021-07-03T06:04:53.000Z'
            },
            assertion: {
                id: 2,
                status: 'AT_RISK',
                text: 'assertion_2'
            }
        }
    ]

    test('should render for all items within portfolios', () => {
        selectAllBlockedAssertionsWithParentIdMock.mockReturnValue(blockers)

        render(<BlockerList portfolioId = {null}/>, { initialState: mockState })

        expect(screen.getByText('PRODUCT_1')).toBeInTheDocument()
        expect(screen.getByText('comment_1')).toBeInTheDocument()
        expect(screen.getByText('assertion_1')).toBeInTheDocument()
        expect(screen.getByText('Blocked')).toBeInTheDocument()

        expect(screen.getByText('PRODUCT_2')).toBeInTheDocument()
        expect(screen.getByText('comment_2')).toBeInTheDocument()
        expect(screen.getByText('assertion_2')).toBeInTheDocument()
        expect(screen.getByText('At Risk')).toBeInTheDocument()
    })

    test('should for specific portfolioId', () => {
        const selectBlockedAssertionsByParentIdMock = useModuleMock('Redux/BlockedAssertions/selectors',
            'selectBlockedAssertionsByParentId')
        selectBlockedAssertionsByParentIdMock.mockReturnValue([])

        render(<BlockerList portfolioId = {1}/>, { initialState: mockState })

        expect(screen.getByText('No Blockers Detected! Yahoo!')).toBeInTheDocument()
    })

})