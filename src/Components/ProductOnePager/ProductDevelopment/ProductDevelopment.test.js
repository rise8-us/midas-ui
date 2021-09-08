import React from 'react'
import { act, render, screen, useModuleMock } from 'Utilities/test-utils'
import { ProductDevelopment } from './index'

describe('<ProductDevelopment />', () => {
    const selectProjectsByProductIdMock = useModuleMock('Redux/Projects/selectors', 'selectProjectsByProductId')

    const mockState = {
        app: {
            sonarqubeSecurity: {
                'A': { description: 'secA' },
                'D': { description: 'secD' },
            },
            sonarqubeReliability: {
                'A': { description: 'redA' },
                'B': { description: 'relB' },
                'E': { description: 'relE' },
            },
            sonarqubeMaintainability: {
                'A': { description: 'maiA' },
                'C': { description: 'maiC' },
                'U': { description: 'maiU' },
            }
        }
    }

    test('should render', () => {
        selectProjectsByProductIdMock.mockReturnValue([
            {
                name: 'project 1',
                projectJourneyMap: 7,
                coverage: {
                    testCoverage: 90,
                    securityRating: 'A',
                    reliabilityRating: 'B',
                    maintainabilityRating: 'C'
                }
            }, {
                name: 'project 2',
                projectJourneyMap: 3,
                coverage: {
                    testCoverage: 60,
                    securityRating: 'D',
                    reliabilityRating: 'E',
                    maintainabilityRating: 'U'
                }
            }, {
                name: 'project 3',
                projectJourneyMap: 1,
                coverage: {
                    testCoverage: 49,
                    securityRating: 'A',
                    reliabilityRating: 'A',
                    maintainabilityRating: 'A'
                }
            }
        ])

        act(() => {
            render(<ProductDevelopment id = {1} />, { initialState: mockState })
        })

        expect(screen.getAllByText(/project/)).toHaveLength(3)
    })

})