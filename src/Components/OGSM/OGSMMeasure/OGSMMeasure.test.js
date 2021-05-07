import React from 'react'
import { render, screen, userEvent } from '../../../Utilities/test-utils'
import { OGSMMeasure } from './index'

describe('<OGSMMeasure>', () => {

    test('should call onChange', () => {
        const onChangeMock = jest.fn()

        render(<OGSMMeasure detail = 'test detail' onChange = {onChangeMock}/>)
        userEvent.type(screen.getByDisplayValue('test detail'), 'change detail')

        expect(screen.getByDisplayValue(/change detail/)).toBeInTheDocument()
    })

    test('should be readOnly', () => {
        const onChangeMock = jest.fn()

        render(<OGSMMeasure detail = 'test detail' readOnly onChange = {onChangeMock}/>)
        userEvent.type(screen.getByText('test detail'), 'change detail')

        expect(onChangeMock).toHaveBeenCalledTimes(0)
    })

})