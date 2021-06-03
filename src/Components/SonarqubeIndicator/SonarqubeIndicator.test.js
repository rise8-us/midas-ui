import React from 'react'
import { render, screen } from '../../Utilities/test-utils'
import { SonarqubeIndicator } from './index'

describe('<SonarqubeIndicator />', () => {

    test('should handle above 80%', () => {
        render(<SonarqubeIndicator title = 'test' value = {80}/>)

        expect(screen.getByText('test')).toBeInTheDocument()
        expect(screen.getByText('80')).toBeInTheDocument()
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '80')
        expect(screen.getByRole('progressbar')).toHaveStyle('color: rgb(76, 175, 80)')
    })

    test('should handle between 55 & 80%', () => {
        render(<SonarqubeIndicator title = 'test' value = {55}/>)

        expect(screen.getByText('55')).toBeInTheDocument()
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '55')
        expect(screen.getByRole('progressbar')).toHaveStyle('color: rgb(255, 152, 0)')
    })

    test('should handle below 55%', () => {
        render(<SonarqubeIndicator title = 'test' value = {54}/>)

        expect(screen.getByText('54')).toBeInTheDocument()
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '54')
        expect(screen.getByRole('progressbar')).toHaveStyle('color: rgb(244, 67, 54)')
    })

    test('should handle A', () => {
        render(<SonarqubeIndicator title = 'test' value = {'A'}/>)

        expect(screen.getByText('A')).toBeInTheDocument()
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
        expect(screen.getByRole('progressbar')).toHaveStyle('color: rgb(76, 175, 80)')
    })

    test('should handle B', () => {
        render(<SonarqubeIndicator title = 'test' value = {'B'}/>)

        expect(screen.getByText('B')).toBeInTheDocument()
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
        expect(screen.getByRole('progressbar')).toHaveStyle('color: rgb(255, 152, 0)')
    })

    test('should handle C', () => {
        render(<SonarqubeIndicator title = 'test' value = {'C'}/>)

        expect(screen.getByText('C')).toBeInTheDocument()
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
        expect(screen.getByRole('progressbar')).toHaveStyle('color: rgb(255, 152, 0)')
    })
    test('should handle D', () => {
        render(<SonarqubeIndicator title = 'test' value = {'D'}/>)

        expect(screen.getByText('D')).toBeInTheDocument()
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
        expect(screen.getByRole('progressbar')).toHaveStyle('color: rgb(244, 67, 54)')
    })

    test('should handle E', () => {
        render(<SonarqubeIndicator title = 'test' value = {'E'}/>)

        expect(screen.getByText('E')).toBeInTheDocument()
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
        expect(screen.getByRole('progressbar')).toHaveStyle('color: rgb(244, 67, 54)')
    })

    test('should handle U', () => {
        render(<SonarqubeIndicator title = 'test' value = {'U'}/>)

        expect(screen.getByText('U')).toBeInTheDocument()
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
        expect(screen.getByRole('progressbar')).toHaveStyle('color: rgb(33, 150, 243)')
    })
})