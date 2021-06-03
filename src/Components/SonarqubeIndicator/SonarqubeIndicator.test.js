import React from 'react'
import { render, screen } from '../../Utilities/test-utils'
import { SonarqubeIndicator } from './index'

describe('<SonarqubeIndicator />', () => {

    const checkLogic = (value, color) => {
        expect(screen.getByText(value)).toBeInTheDocument()
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow',
            typeof value === 'number' ? value.toString() : '100')
        expect(screen.getByRole('progressbar')).toHaveStyle(`color: ${color}`)
    }

    test('should handle above 80%', () => {
        render(<SonarqubeIndicator title = 'test' value = {80}/>)

        expect(screen.getByText('test')).toBeInTheDocument()
        checkLogic(80, 'rgb(76, 175, 80)')
    })

    test('should handle between 55 & 80%', () => {
        render(<SonarqubeIndicator title = 'test' value = {55}/>)

        checkLogic(55, 'rgb(255, 152, 0)')
    })

    test('should handle below 55%', () => {
        render(<SonarqubeIndicator title = 'test' value = {54}/>)

        checkLogic(54, 'rgb(244, 67, 54)')
    })

    test('should handle A', () => {
        render(<SonarqubeIndicator title = 'test' value = {'A'}/>)

        checkLogic('A', 'rgb(76, 175, 80)')
    })

    test('should handle B', () => {
        render(<SonarqubeIndicator title = 'test' value = {'B'}/>)

        checkLogic('B', 'rgb(255, 152, 0)')
    })

    test('should handle C', () => {
        render(<SonarqubeIndicator title = 'test' value = {'C'}/>)

        checkLogic('C', 'rgb(255, 152, 0)')
    })
    test('should handle D', () => {
        render(<SonarqubeIndicator title = 'test' value = {'D'}/>)

        checkLogic('D', 'rgb(244, 67, 54)')
    })

    test('should handle E', () => {
        render(<SonarqubeIndicator title = 'test' value = {'E'}/>)

        checkLogic('E', 'rgb(244, 67, 54)')
    })

    test('should handle U', () => {
        render(<SonarqubeIndicator title = 'test' value = {'U'}/>)

        checkLogic('U', 'rgb(33, 150, 243)')
    })
})