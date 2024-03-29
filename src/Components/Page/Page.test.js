import { fireEvent, render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { Page } from './index'

jest.mock('Hooks/useHistory')

describe('<Page />', () => {

    const setPageScrollYMock = useModuleMock('Redux/AppSettings/reducer', 'setPageScrollY')

    test('should handle scroll', () => {
        useDispatchMock().mockReturnValue()
        render(<Page><div /></Page>)

        fireEvent.scroll(screen.getByTestId('Page__div'))

        expect(setPageScrollYMock).toHaveBeenCalled()
    })
})