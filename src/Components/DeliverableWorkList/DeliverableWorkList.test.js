import staticConstants from 'Constants/Statics'
import React from 'react'
import { render, screen, useModuleMock } from 'Utilities/test-utils'
import { DeliverableWorkList } from './index'

jest.mock('Components/DeliverableWorkEntry/DeliverableWorkEntry',
    () => (function testing(props) { return (<div>{props.title}</div>) }))

describe('<DeliverableWorkList />', () => {

    const selectDeliverableByParentIdMock = useModuleMock('Redux/Deliverables/selectors', 'selectDeliverableByParentId')


    test('should render with entry', () => {
        selectDeliverableByParentIdMock.mockReturnValue([{ id: 1, productId: 2, epicId: 3, title: 'yolo' }])

        render(<DeliverableWorkList parentId = {0}/>)

        expect(screen.getByText('yolo')).toBeInTheDocument()
        expect(screen.queryByText(staticConstants.NO_DELIVERABLES_ASSIGNED)).not.toBeInTheDocument()
    })

    test('should render with  no entries', () => {
        selectDeliverableByParentIdMock.mockReturnValue([])

        render(<DeliverableWorkList parentId = {0}/>)

        expect(screen.getByText(staticConstants.NO_DELIVERABLES_ASSIGNED)).toBeInTheDocument()
    })

})