import React from 'react'
import { render, screen } from '../../../Utilities/test-utils'
import { AssertionAccordion } from './index'

jest.mock('../../Assertions/AssertionHeader/AssertionHeader',
    () => function testing() { return (<div>AssertionHeaderComponent</div>) })


describe('<AssertionAccordion>', () => {
    test('should render', () => {
        render(
            <AssertionAccordion
                category = 'cat'
            >
                <div>Hello Valheim</div>
            </AssertionAccordion>
        )

        expect(screen.getByText('AssertionHeaderComponent')).toBeInTheDocument()
        expect(screen.queryByText(/Hello Valheim/)).not.toBeInTheDocument()
    })
})