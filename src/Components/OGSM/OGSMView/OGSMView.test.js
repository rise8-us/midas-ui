import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent } from '../../../Utilities/test-utils'
import { OGSMView } from './index'

jest.mock('../OGSMGoal/OGSMGoal',
    () => function testing() { return (<div>OGSMGoal component</div>) })

describe('<OGSMView>', () => {

    const selectObjectiveByIdMock = useModuleMock('Redux/Objectives/selectors', 'selectObjectiveById')

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({ payload: [] })

        selectObjectiveByIdMock.mockReturnValue({})
    })

    // test('should render objective', () => {
    //     selectObjectiveByIdMock.mockReturnValue({ text: 'test objective text' })
    //     render(<OGSMView id = {0} productId = {0}/>)

    //     fireEvent.click(screen.getByText(/test objective text/i))

    //     expect(screen.getByText('OGSMGoal component')).toBeInTheDocument()
    // })

    test('should render create', () => {
        render(<OGSMView create productId = {0}/>)

        userEvent.type(screen.getByDisplayValue(/enter objective here.../i), 'new name')

        expect(screen.getByDisplayValue('new name')).toBeInTheDocument()
    })

    test('should add another goal', () => {
        render(<OGSMView create productId = {0}/>)

        fireEvent.click(screen.getByText(/add another goal/i))

        expect(screen.getAllByText('OGSMGoal component')).toHaveLength(2)
    })
})