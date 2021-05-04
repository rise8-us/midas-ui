import React from 'react'
import { render, screen, userEvent } from '../../../Utilities/test-utils'
import { OGSMMeasure } from './index'

describe('<OGSMMeasure>', () => {
    test('renders ', () => {
        render(<OGSMMeasure detail = 'test detail'/>)

        expect(screen.getByText('test detail')).toBeInTheDocument()
    })

    test('should call onChange', () => {
        const onChangeMock = jest.fn()

        render(<OGSMMeasure detail = 'test detail' onChange = {onChangeMock}/>)
        userEvent.type(screen.getByDisplayValue('test detail'), 'change detail')

        expect(screen.getByDisplayValue(/change detail/)).toBeInTheDocument()
    })

})