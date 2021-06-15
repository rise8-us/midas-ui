import React from 'react'
import {
    fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent, within
} from '../../../Utilities/test-utils'
import { CreateOrUpdateTagPopup } from './index'

describe('<CreateOrUpdateTagPopup />', () => {

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitCreateTagMock = useModuleMock('Redux/Tags/actions', 'requestCreateTag')
    const submitUpdateTagMock = useModuleMock('Redux/Tags/actions', 'requestUpdateTag')
    const selectTagTypesMock = useModuleMock('Redux/AppSettings/selectors', 'selectTagTypes')
    const getTagMock = useModuleMock('Redux/Tags/selectors', 'selectTagById')

    const returnedFoundTag = {
        id: 4,
        label: 'My Tag',
        color: '#696696',
        description: 'Description',
        tagType: 'ALL'
    }

    const returnedNewTag = {
        label: '',
        color: '#',
        description: '',
        tagType: 'ALL'
    }

    const updatedData = {
        label: 'foobar',
        description: 'sassafras',
        color: '#e91e63',
        tagType: 'ALL'
    }

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectTagTypesMock.mockReturnValue(['ALL', 'FOO'])
        getTagMock.mockReturnValue(returnedNewTag)
    })

    test('should render properly', () => {

        render(<CreateOrUpdateTagPopup />)

        expect(screen.getByText('Create Tag')).toBeInTheDocument()
        expect(screen.getByTestId('CreateOrUpdateTagPopup__input-label')).toBeInTheDocument()
        expect(screen.getByTestId('CreateOrUpdateTagPopup__input-description')).toBeInTheDocument()
        expect(screen.getByTestId('ColorPicker__input-color')).toBeInTheDocument()
    })

    test('should display error messages', () => {
        const state = {
            errors: {
                'tag/create': [
                    'label',
                    'hex error'
                ]
            }
        }
        render(<CreateOrUpdateTagPopup />, { initialState: state })

        expect(screen.getByText('label')).toBeInTheDocument()
        expect(screen.getByText('hex error')).toBeInTheDocument()
    })

    test('should call onSubmit for createTag', () => {
        render(<CreateOrUpdateTagPopup />)

        const labelInput = within(screen.getByTestId('CreateOrUpdateTagPopup__input-label'))
            .getByRole('textbox')
        const descriptionInput = within(screen.getByTestId('CreateOrUpdateTagPopup__input-description'))
            .getByRole('textbox')

        const colorPicker = screen.getByTitle(updatedData.color)

        userEvent.type(labelInput, updatedData.label)
        fireEvent.click(colorPicker)
        userEvent.type(descriptionInput, updatedData.description)
        fireEvent.click(screen.getByText('Submit'))

        expect(submitCreateTagMock).toHaveBeenCalledWith({ ...updatedData })
    })

    test('should call onSubmit for updateTag', () => {
        getTagMock.mockReturnValue(returnedFoundTag)
        render(<CreateOrUpdateTagPopup id = {4} />)

        const labelInput = within(screen.getByTestId('CreateOrUpdateTagPopup__input-label'))
            .getByRole('textbox')
        const descriptionInput = within(screen.getByTestId('CreateOrUpdateTagPopup__input-description'))
            .getByRole('textbox')
        const colorInput = within(screen.getByTestId('ColorPicker__input-color'))
            .getByRole('textbox')
        const colorPicker = screen.getByTitle(updatedData.color)

        userEvent.clear(descriptionInput)
        userEvent.clear(colorInput)
        userEvent.clear(labelInput)

        userEvent.type(descriptionInput, updatedData.description)
        fireEvent.click(colorPicker)
        userEvent.type(labelInput, updatedData.label)

        fireEvent.click(screen.getByText('Submit'))

        expect(submitUpdateTagMock).toHaveBeenCalledWith({ ...returnedFoundTag, ...updatedData })
    })

    test('should handle default types and changes', () => {
        render(<CreateOrUpdateTagPopup type = 'ALL' />)

        fireEvent.click(screen.getByTitle('Open'))
        fireEvent.click(screen.getByText('FOO'))
        fireEvent.click(screen.getByText('Submit'))

        expect(submitCreateTagMock).toHaveBeenCalledWith(
            { color: undefined, description: '', label: '', tagType: 'FOO' }
        )
    })

    test('should close popup', () => {
        render(<CreateOrUpdateTagPopup />)

        fireEvent.click(screen.getByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })

})