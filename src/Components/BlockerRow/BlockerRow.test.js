import { createMemoryHistory } from 'history'
import React from 'react'
import { fireEvent, renderWithRouter, screen } from '../../Utilities/test-utils'
import { BlockerRow } from './index'

describe('<BlockerRow />', () => {
    const history = createMemoryHistory()

    test('should go to product', () => {
        renderWithRouter(<BlockerRow
            assertionId = {1}
            productId = {2}
            name = 'product'
            date = 'today'
            title = 'title'
            detail = 'details'
            tag = {{
                label: 'tag',
                color: '#FFFFFF'
            }}
        />, { history })

        expect(screen.getByText('PRODUCT')).toBeInTheDocument()
        expect(screen.getByText('today')).toBeInTheDocument()
        expect(screen.getByText('details')).toBeInTheDocument()
        expect(screen.getByText('tag')).toBeInTheDocument()

        fireEvent.click(screen.getByText('PRODUCT'))

        expect(history.location.pathname).toEqual('/products/2')
    })

    test('should go to ogsm', () => {
        renderWithRouter(<BlockerRow
            assertionId = {1}
            productId = {2}
            name = 'a'
            date = 'b'
            title = 'ogsm'
            detail = 'd'
            tag = {{
                label: 'tag',
                color: '#FFFFFF'
            }}
        />, { history })

        fireEvent.click(screen.getByText('ogsm'))

        expect(history.location.pathname).toEqual('/products/2/ogsms/1')
    })

})