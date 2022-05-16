import { render, screen, userEvent } from 'Utilities/test-utils'
import { AddItem } from './index'

describe('<AddItem/>', () => {

    test('should render', () => {
        render(<AddItem title = 'Test AddItem' onClick = {jest.fn}/>)

        expect(screen.getByTestId('AddItem__icon-button')).toBeInTheDocument()
    })

    test('should fire async function', async() => {
        const onClickMock = jest.fn()
        render(<AddItem title = 'Test AddItem' onClick = {onClickMock}/>)

        userEvent.click(screen.getByTestId('AddItem__icon-button'))
        await screen.findByTestId('AddItem__spinner')

        expect(onClickMock).toHaveBeenCalledTimes(1)
        await screen.findByTestId('AddItem__icon-button')
    })
})