import React from 'react'
import { render, screen } from 'Utilities/test-utils'
import { AssertionAccordion } from './index'

jest.mock('Components/Assertions/AssertionEntry/AssertionEntry',
    () => (function testing() { return (<div>AssertionEntryComponent</div>) }))


describe('<AssertionAccordion>', () => {
    test('should render', () => {
        render(
            <AssertionAccordion
                category = 'cat'
            >
                <div>Hello Valheim</div>
            </AssertionAccordion>
        )

        expect(screen.getByText('AssertionEntryComponent')).toBeInTheDocument()
        expect(screen.queryByText(/Hello Valheim/)).not.toBeInTheDocument()
    })
})