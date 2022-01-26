import { Collapse, Divider, Stack, Typography } from '@mui/material'
import { DeliverableWorkList } from 'Components/DeliverableWorkList'
import { SearchEpics } from 'Components/Search'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCapabilityPageSettings } from 'Redux/AppSettings/selectors'
import { requestCreateDeliverable } from 'Redux/Deliverables/actions'
import { selectDeliverableById, selectDeliverableByParentId } from 'Redux/Deliverables/selectors'
import { selectCapabilitiesPagePermission } from 'Redux/PageAccess/selectors'
import { enqueueMessage } from 'Redux/Snackbar/reducer'

export default function CapabilitiesView() {
    const dispatch = useDispatch()

    const hasEdit = useSelector(state => selectCapabilitiesPagePermission(state, 'edit'))
    const capabilityPageSettings = useSelector(selectCapabilityPageSettings)
    const { selectedDeliverableId } = capabilityPageSettings

    const deliverable = useSelector(state => selectDeliverableById(state, selectedDeliverableId))
    const children = useSelector(state => selectDeliverableByParentId(state, selectedDeliverableId))

    const epicIds = useMemo(() => children.map(c => c.epicId), [children])

    const onSelectEpic = (_e, values, reason) => {
        reason === 'selectOption' && !epicIds.includes(values[0].id) && dispatch(requestCreateDeliverable({
            title: values[0].title,
            index: deliverable.children.length,
            productId: values[0].productId,
            epicId: values[0].id,
            parentId: selectedDeliverableId,
            referenceId: 0,
            releaseIds: [],
            children: []
        })).then(() => {
            dispatch(enqueueMessage({
                message: 'Linked ' + values[0].title + ' to deliverable: ' + deliverable.title,
                severity: 'success'
            }))
        })

        epicIds.includes(values[0].id) && dispatch(enqueueMessage({
            message: values[0].title + ' is already tied to deliverable: ' + deliverable.title,
            severity: 'warning'
        }))
    }

    if (!selectedDeliverableId) return null

    return (
        <Stack marginX = '16%' spacing = {1}>
            <Stack direction = 'row' justifyContent = 'space-between'>
                <Typography variant = 'subtitle1'>{deliverable?.title?.toUpperCase()}</Typography>
            </Stack>
            <Divider/>
            <Collapse in = {hasEdit} collapsedSize = {0}>
                <div style = {{ height: '32px', width: '100%' }}>
                    {hasEdit && <SearchEpics onChange = {onSelectEpic}/>}
                </div>
            </Collapse>
            <DeliverableWorkList workList = {children}/>
        </Stack>
    )
}