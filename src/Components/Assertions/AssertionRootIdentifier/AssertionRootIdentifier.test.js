import React from 'react'
import { render, screen } from 'Utilities/test-utils'
import { AssertionRootIdentifier } from './index'

describe('<AssertionRootIdentifier>', () => {

    test('should render', () => {
        render(<AssertionRootIdentifier id = {1} selected title = '' indicator = {1}/>)

        expect(screen.getByText('1')).toBeInTheDocument()
    })

    test('should call onClick', () => {
        render(<AssertionRootIdentifier indicator = {<span>1</span>} title = ''/>)

        expect(screen.getByText('1')).toHaveStyle('font-weight: 400')
    })
})