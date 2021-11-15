import React from 'react'
import { render, screen, useDispatchMock, useModuleMock, userEvent, waitFor } from 'Utilities/test-utils'
import { AppBarSearch } from './index'

describe('<AppBarSearch />', () => {

    const setAppBarFilterStringMock = useModuleMock('Redux/Filters/reducer', 'setAppBarFilterString')

    test('should dispatch searchValue', () => {
        useDispatchMock().mockReturnValue({})

        render(<AppBarSearch />)

        expect(screen.getByPlaceholderText('Search'))

        userEvent.type(screen.getByPlaceholderText('Search'), 'SearchString')

        waitFor(()=> {
            expect(setAppBarFilterStringMock).toHaveBeenCalledWith('SearchString')
        })
    })
})