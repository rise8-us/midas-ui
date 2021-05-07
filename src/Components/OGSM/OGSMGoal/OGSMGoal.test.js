import React from 'react'
import { render, screen } from '../../../Utilities/test-utils'
import { OGSMGoal } from './index'

describe('<OGSMGoal>', () => {

    test('should render', () => {
        render(<OGSMGoal id = {0} childIds = {[]} text = 'test goal'/>)

        expect(screen.getByText(/Goal:/)).toBeInTheDocument()
        expect(screen.getByText(/test goal/)).toBeInTheDocument()
    })

    // test('should edit title', () => {
    //     render(<OGSMGoal id = {0} childIds = {[]} text = 'test goal'/>)

    //     fireEvent.click(screen.getByTitle('edit'))
    //     userEvent.type(screen.getByDisplayValue('test goal'), 'finish this epic')
    //     fireEvent.click(screen.getByTitle('edit'))

    //     expect(screen.getByText('finish this epic')).toBeInTheDocument()
    // })

    // test('should add new strategy', () => {
    //     render(<OGSMGoal id = {0} childIds = {[]} text = 'test goal' defaultExpanded/>)

    //     fireEvent.click(screen.getAllByTitle('edit')[0])
    //     fireEvent.click(screen.getByText(/add another strategy/i))
    //     fireEvent.click(screen.getAllByTitle('edit')[0])

    //     expect(screen.getByText(/enter strategy here.../i)).toBeInTheDocument()
    // })

})