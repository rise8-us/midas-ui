import React from 'react'
import { fireEvent, render, screen } from '../../../Utilities/test-utils'
import { AssertionAccordion } from './index'

describe('<AssertionAccordion>', () => {

    test('should render', () => {
        render(
            <AssertionAccordion
                accordionHeaderProps = {{ category: 'cat', detail: 'dog' }}
            >
                <div>Hello Valheim</div>
            </AssertionAccordion>
        )

        expect(screen.getByText(/cat:/)).toBeInTheDocument()
        expect(screen.getByDisplayValue(/dog/)).toBeInTheDocument()
        expect(screen.queryByText(/Hello Valheim/)).not.toBeInTheDocument()
    })
})