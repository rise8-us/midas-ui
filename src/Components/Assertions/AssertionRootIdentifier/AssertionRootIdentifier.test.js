import React from 'react'
import { fireEvent, render, screen } from 'Utilities/test-utils'
import { AssertionRootIdentifier } from './index'

describe('<AssertionRootIdentifier>', () => {

    test('should render', () => {
        render(<AssertionRootIdentifier id = {1} selected onClick = {jest.fn()} title = ''/>)

        expect(screen.getByText('1')).toBeInTheDocument()
    })

    test('should call onClick', () => {
        const onClickMock = jest.fn()

        render(<AssertionRootIdentifier id = {1} onClick = {onClickMock} title = ''/>)

        fireEvent.click(screen.getByText('1'))

        expect(onClickMock).toBeCalled()
    })
})