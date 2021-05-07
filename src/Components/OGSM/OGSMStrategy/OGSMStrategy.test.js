import React from 'react'
import { render, screen } from '../../../Utilities/test-utils'
import { OGSMStrategy } from './index'

describe('<OGSMStrategy>', () => {

    test('should render', () => {
        render(<OGSMStrategy id = {0} childIds = {[]} text = 'test strategy'/>)

        expect(screen.getByText(/Strategy:/)).toBeInTheDocument()
        expect(screen.getByText(/test strategy/)).toBeInTheDocument()
    })

    // test('should edit title', () => {
    //     render(<OGSMStrategy id = {0} childIds = {[]} text = 'test strategy'/>)

    //     fireEvent.click(screen.getByTitle('edit'))
    //     userEvent.type(screen.getByDisplayValue('test strategy'), 'finish this epic')
    //     fireEvent.click(screen.getByTitle('edit'))

    //     expect(screen.getByText('finish this epic')).toBeInTheDocument()
    // })

    // test('should add new measure', () => {
    //     render(<OGSMStrategy id = {0} childIds = {[]} text = 'test strategy' defaultExpanded/>)

    //     fireEvent.click(screen.getByTitle('edit'))
    //     fireEvent.click(screen.getByText(/add another measure/i))
    //     fireEvent.click(screen.getByTitle('edit'))

    //     expect(screen.getByText(/enter measure here.../i)).toBeInTheDocument()
    // })

    // test('should edit measure', () => {
    //     render(<OGSMStrategy id = {0} text = 'test strategy' defaultExpanded/>)

    //     fireEvent.click(screen.getByTitle('edit'))
    //     fireEvent.click(screen.getByText(/add another measure/i))
    //     userEvent.type(screen.getByDisplayValue(/enter measure here.../i), 'foo')
    //     fireEvent.click(screen.getByTitle('edit'))

    //     expect(screen.getByText(/foo/)).toBeInTheDocument()
    // })

})