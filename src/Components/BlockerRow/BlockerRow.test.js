import React from 'react'
import { render, screen } from '../../Utilities/test-utils'
import { BlockerRow } from './index'

describe('<BlockerRow />', () => {

    test('should render', () => {
        render(<BlockerRow
            name = 'product'
            date = 'today'
            title = 'title'
            detail = 'details'
            tag = {{
                label: 'tag',
                color: '#FFFFFF'
            }}
        />)

        expect(screen.getByText('PRODUCT')).toBeInTheDocument()
        expect(screen.getByText('today')).toBeInTheDocument()
        expect(screen.getByText('details')).toBeInTheDocument()
        expect(screen.getByText('tag')).toBeInTheDocument()
    })

})