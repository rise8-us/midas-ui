import React from 'react'
import { fireEvent, render, screen } from '../../../Utilities/test-utils'
import { AddAnotherAssertion } from './index'

describe('<AddAnotherAssertion>', () => {

    test('should call onClick', () => {
        const onClickMock = jest.fn()
        render(<AddAnotherAssertion label = 'test' onClick = {onClickMock}/>)

        fireEvent.click(screen.getByText(/Add another test.../))

        expect(onClickMock).toHaveBeenCalled()
    })

})