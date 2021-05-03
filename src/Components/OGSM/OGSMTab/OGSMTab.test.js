import React from 'react'
import { render, screen } from '../../../Utilities/test-utils'
import { OGSMTab } from './index'

describe('<OGSMTab>', () => {
    test('Has correct text', () => {
        render(<OGSMTab />)
        expect(screen.getAllByText(/objective/i)).toHaveLength(1)
    })
})