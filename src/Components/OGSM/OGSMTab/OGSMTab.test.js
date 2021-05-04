import React from 'react'
import { fireEvent, render, screen } from '../../../Utilities/test-utils'
import { OGSMTab } from './index'

jest.mock('../OGSMCreate/OGSMCreate',
    () => function testing() { return (<div>OGSMCreate component</div>) })

describe('<OGSMTab>', () => {
    test('Has correct text', () => {
        render(<OGSMTab />)
        expect(screen.getAllByText(/objective/i)).toHaveLength(1)
    })

    test('should render OSGMCreate', () => {
        render(<OGSMTab />)

        fireEvent.click(screen.getByText(/Add a new ogsm/i))

        expect(screen.getByText('OGSMCreate component')).toBeInTheDocument()
    })
})