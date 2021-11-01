import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { Page } from './index'

describe('<Page />', () => {

    const setPageScrollYMock = useModuleMock('Redux/AppSettings/reducer', 'setPageScrollY')

    test('should handle scroll', () => {
        useDispatchMock().mockReturnValue()
        render(<Page><div /></Page>)

        fireEvent.scroll(screen.getByTestId('Page__div'))

        expect(setPageScrollYMock).toHaveBeenCalled()
    })
})