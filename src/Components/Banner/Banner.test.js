import { render, screen, useSelectorMock } from 'Utilities/test-utils'
import { Banner } from './index'


describe('<Banner />', () => {

    beforeEach(() => {
        useSelectorMock().mockClear()
    })

    test('should have correct info', () => {
        const initialState = {
            app: {
                classification: {
                    name: 'FOO',
                    caveat: 'BAR',
                    backgroundColor: '#000000',
                    textColor: '#FFFFFF'
                }
            }
        }
        render(<Banner><div/></Banner>, { initialState: initialState })
        const linkElement = screen.getAllByText(/FOO\/\/BAR/i)
        expect(linkElement).toHaveLength(2)
    })

    test('should display not conneted to server error', () => {
        useSelectorMock().mockReturnValue({})
        render(<Banner><div/></Banner>)
        expect(screen.getAllByText('NOT CONNECTED TO SERVER')).toHaveLength(2)
    })

})