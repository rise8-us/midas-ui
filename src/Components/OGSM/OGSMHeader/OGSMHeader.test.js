import React from 'react'
import { render, screen, userEvent } from '../../../Utilities/test-utils'
import { OGSMHeader } from './index'

describe('<OGSMHeader>', () => {
    const onChangeMock = jest.fn()

    afterEach(() => {
        onChangeMock.mockReset()
    })

    test('should render', () => {
        render(<OGSMHeader category = 'category' detail = 'detail'/>)

        expect(screen.getByText(/category:/)).toBeInTheDocument()
        expect(screen.getByText(/detail/)).toBeInTheDocument()
    })

    test('should call onChange & update value', () => {
        render(<OGSMHeader category = 'cat' detail = 'devils' onChange = {onChangeMock}/>)

        userEvent.type(screen.getByDisplayValue(/devils/), 'in the details')

        expect(onChangeMock).toHaveBeenCalled()
        expect(screen.getByDisplayValue(/in the details/i)).toBeInTheDocument()
    })
})