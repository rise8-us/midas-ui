import React from 'react'
import { render, screen } from '../../../Utilities/test-utils'
import { OGSMHeader } from './index'

describe('<OGSMHeader>', () => {
    test('should render', () => {
        render(<OGSMHeader category = 'category' detail = 'detail'/>)

        expect(screen.getByText(/category:/)).toBeInTheDocument()
        expect(screen.getByText(/detail/)).toBeInTheDocument()
    })
})