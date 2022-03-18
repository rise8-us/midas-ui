import { act, render, screen, userEvent } from 'Utilities/test-utils'
import { CollapsableCard } from './index'

describe('<CollapsableCard />', () => {

    test('should render', async() => {
        jest.useFakeTimers()

        render(<><div>outside</div><CollapsableCard><div>Hello World</div></CollapsableCard></>)

        expect(screen.getByTestId('Collapsable__card')).toBeInTheDocument()

        userEvent.hover(screen.getByTestId('Collapsable__card'))

        act(() => {
            jest.runAllTimers()
        })

        expect(await screen.findByText('Hello World')).toBeInTheDocument()

        userEvent.unhover(screen.getByTestId('Collapsable__card'))

        userEvent.click(screen.getByTestId('Collapsable__card'))
        userEvent.click(screen.getByText('outside'))

        jest.useRealTimers()
    })

})