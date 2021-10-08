import React from 'react'
import { render, screen } from 'Utilities/test-utils'
import { CircularStatus } from './index'

describe('<CircularStatus />', () => {

    test('should display title and value', () => {
        render(<CircularStatus title = 'test' value = {80} valueColor = 'red'/>)

        expect(screen.getByText('test')).toBeInTheDocument()
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '80')
        expect(screen.getByRole('progressbar')).toHaveStyle('color: red')
    })

    test('should render displayValue and color', () => {
        render(<CircularStatus value = {80} displayValue = {80} displayValueColor = 'red'/>)

        expect(screen.getByText('80')).toBeInTheDocument()
        expect(screen.getByText('80')).toHaveStyle('color: red')
    })

    test('should render title adornment', () => {
        render(<CircularStatus value = {80} title = 'foo' titleAdornment = {<div>Hello</div>}/>)

        expect(screen.getByText('Hello')).toBeInTheDocument()
    })

    test('should render tooltip', () => {
        render(<CircularStatus value = {80} tooltip = 'foobar'/>)

        expect(screen.getByTitle('foobar')).toBeInTheDocument()
    })
})