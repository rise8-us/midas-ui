import React from 'react'
import { render, screen } from 'Utilities/test-utils'
import { DevelopmentSecurityRatings } from './index'

describe('<DevelopmentSecurityRatings>', () => {

    const data = {
        codeCoverage: {
            value: 94,
            color: '#FFFFFF',
            tooltipMessage: 'code tooltip'
        },
        security: {
            value: 'C',
            color: '#FFFFFF',
            tooltipMessage: 'security tooltip'
        },
        reliability: {
            value: 'B',
            color: '#FFFFFF',
            tooltipMessage: 'reliability tooltip'
        },
        maintainability: {
            value: 'A',
            color: '#FFFFFF',
            tooltipMessage: 'maintainability tooltip'
        }
    }

    test('should render', () => {
        render(<DevelopmentSecurityRatings {...data}/>)

        expect(screen.getByText('94')).toBeInTheDocument()
        expect(screen.getByText('C')).toBeInTheDocument()
        expect(screen.getByText('B')).toBeInTheDocument()
        expect(screen.getByText('A')).toBeInTheDocument()

        expect(screen.getByText('Coverage')).toBeInTheDocument()
        expect(screen.getByText('Security')).toBeInTheDocument()
        expect(screen.getByText('Reliability')).toBeInTheDocument()
        expect(screen.getByText('Maintainability')).toBeInTheDocument()
    })

})