import React from 'react'
import { render, screen } from '../../../Utilities/test-utils'
import { OGSMMeasure } from './index'

describe('<OGSMMeasure>', () => {
    test('renders background green', () => {
        render(<OGSMMeasure detail = 'test detail' completed = {true}/>)

        expect(screen.getByText('test detail')).toBeInTheDocument()
        expect(screen.getByText('test detail')).toHaveStyle({ 'background-color': 'rgb(76, 175, 80)' })
    })

    test('renders background red', () => {
        render(<OGSMMeasure detail = 'test detail' completed = {false}/>)

        expect(screen.getByText('test detail')).toHaveStyle({ 'background-color': 'rgb(244, 67, 54)' })
    })

})