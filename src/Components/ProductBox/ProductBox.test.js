import { fireEvent, render, screen } from 'Utilities/test-utils'
import { ProductBox } from './index'

describe('<ProductBox>', () => {
    const onClickMock = jest.fn()

    test('should render', () => {
        render(<ProductBox name = 'test' onClick = {onClickMock} color = '#FFFFFF'/>)

        fireEvent.click(screen.getByText('test'))

        expect(onClickMock).toHaveBeenCalled()
    })

    test('should render', () => {
        const projects = [
            {
                name: 'project 1',
                projectJourneyMap: 3
            }, {
                name: 'project 2',
                projectJourneyMap: 7
            },
        ]
        render(<ProductBox name = 'test' onClick = {onClickMock} color = '#FFFFFF' projects = {projects} />)

        expect(screen.getAllByTestId('ProductBox__Grid-item')).toHaveLength(2)
    })

})