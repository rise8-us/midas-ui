import React from 'react'
import { render, screen } from 'Utilities/test-utils'
import { LegendItem } from './index'

describe('<LegendItem>', () => {

    test('should render', () => {

        render(<LegendItem color = '#00FF00' text = 'tag'/>)

        expect(screen.getByText('tag')).toBeInTheDocument()
        expect(screen.getByTestId('LegendItem__circle')).toHaveStyle('background-color: rgb(0, 255, 0)')
    })
})