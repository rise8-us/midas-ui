import React from 'react'
import { fireEvent, render, screen, waitFor } from '../../Utilities/test-utils'
import { IconStepper } from './index'

describe('<IconStepper />', () => {
    test('should display no tooltip', () => {
        render(<IconStepper steps = {['test']} currentStep = {0}/>)

        expect(screen.getByText('test')).toBeInTheDocument()
    })

    test('should display tooltip with jira info', () => {
        render(<IconStepper steps = {['Jira blah boop']} currentStep = {0}/>)

        fireEvent.mouseOver(screen.getByText('Jira blah boop'))
        waitFor(() => { expect(screen.getByText('Jira Kanban board')).toBeInTheDocument() })
    })
})