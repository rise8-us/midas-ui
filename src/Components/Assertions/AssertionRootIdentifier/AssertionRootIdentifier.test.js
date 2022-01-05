import React from 'react'
import { fireEvent, render, screen, userEvent } from 'Utilities/test-utils'
import { AssertionRootIdentifier } from './index'

describe('<AssertionRootIdentifier>', () => {

    test('should render', () => {
        render(<AssertionRootIdentifier title = '' selected><span>1</span></AssertionRootIdentifier>)

        expect(screen.getByText('1')).toBeInTheDocument()
    })

    test('should call onClick', () => {
        render(<AssertionRootIdentifier title = ''><span>1</span></AssertionRootIdentifier>)

        expect(screen.getByText('1')).toHaveStyle('font-weight: 400')
    })

    test('should handle utility', () => {
        jest.useFakeTimers()

        render(<AssertionRootIdentifier title = 'oogie' utility><span>1</span></AssertionRootIdentifier>)

        userEvent.click(screen.getByText('1'))
        expect(screen.getByText('1')).toHaveStyle('font-weight: 900')
        expect(screen.getByText('oogie')).toBeInTheDocument()

        // should work, doesn't
        // https://github.com/mui-org/material-ui/issues/24783
        fireEvent.click(document.body)
    })
})