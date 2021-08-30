import React from 'react'
import { render, screen, useModuleMock } from 'Utilities/test-utils'
import { ProductDevelopment } from './index'

describe('<ProductDevelopment />', () => {
    const selectProjectsByProductIdMock = useModuleMock('Redux/Projects/selectors', 'selectProjectsByProductId')

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

        render(<ProductDevelopment id = {1} />)

        expect(screen.getAllByText(/project/)).toHaveLength(3)
    })

})