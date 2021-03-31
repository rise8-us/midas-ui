import React from 'react'
import { render, screen } from '../../Utilities/test-utils'
import { IconStepper } from './index'

describe('<IconStepper />', () => {
    test('should display no tooltip', () => {
        render(<IconStepper steps = {['test']} currentStep = {0}/>)

        expect(screen.getByText('test')).toBeInTheDocument()
    })
})