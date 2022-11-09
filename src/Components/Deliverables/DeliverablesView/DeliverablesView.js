import { Link } from '@mui/icons-material'
import { Collapse, Divider, Stack, Typography } from '@mui/material'
import { DeliverablesViewTargets } from 'Components/DeliverablesViewTargets'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
    requestCreateDeliverable,
    requestDeleteDeliverable
} from 'Redux/Deliverables/actions'
import {
    selectDeliverableById,
    selectDeliverableByParentId
} from 'Redux/Deliverables/selectors'
import { openPopup } from 'Redux/Popups/actions'
import { enqueueMessage } from 'Redux/Snackbar/reducer'
import { selectTargetsByIds } from 'Redux/Targets/selectors'
import { DeliverableWorkList } from '../DeliverableWorkList'

export default function DeliverablesView({ hasEdit, selectedDeliverableId, portfolioId }) {
    const dispatch = useDispatch()

    const deliverable = useSelector(state => selectDeliverableById(state, selectedDeliverableId))
    const children = useSelector(state => selectDeliverableByParentId(state, selectedDeliverableId))
    const subtargets = useSelector(state => selectTargetsByIds(state, deliverable.targetIds ?? []))
    const targetIds = subtargets?.map(s => s.parentId).filter((val, index, self) => self.indexOf(val) === index)

    const onClickAssociateEpics = () => {

        const onSelectEpic = (value, setEpicLoading) => {
            setEpicLoading(true)
            dispatch(requestCreateDeliverable({
                title: value.title,
                index: deliverable.children.length,
                productId: value.productId,
                parentId: selectedDeliverableId,
                referenceId: 0,
                completion: {
                    gitlabEpicId: value.id
                }
            })).then(() => {
                setEpicLoading(false)
                dispatch(enqueueMessage({
                    message: 'Linked ' + value.title + ' to deliverable: ' + deliverable.title,
                    severity: 'success'
                }))
            })
        }

        const onDeselectEpic = (deliverableToDeleteId, setEpicLoading) => {
            setEpicLoading(true)
            dispatch(requestDeleteDeliverable(deliverableToDeleteId)).then(() => setEpicLoading(false))
        }

        dispatch(openPopup('AssociateDeliverableEpics', 'AssociateDeliverableEpicsPopup', {
            subtitle: '',
            title: 'Associate Epics to Deliverable',
            deliverableId: deliverable.id,
            onSelectEpic: onSelectEpic,
            onDeselectEpic: onDeselectEpic,
            portfolioId: portfolioId,
        }))
    }

    if (!selectedDeliverableId) return null

    return (
        <Stack marginX = '8%' spacing = {1}>
            <Stack direction = 'row' justifyContent = 'space-between'>
                <Typography variant = 'subtitle1' color = 'grey.400'>{deliverable?.title?.toUpperCase()}</Typography>
            </Stack>
            <Divider/>
            <Stack>
                {targetIds.map((targetId, index) => (
                    <DeliverablesViewTargets
                        key = {index}
                        targetId = {targetId}
                        subtargets = {subtargets.filter(subtarget => subtarget.parentId === targetId)}/>
                ))}
            </Stack>
            <Collapse in = {hasEdit} collapsedSize = {0}>
                <div style = {{ height: '32px', width: '100%' }}>
                    {hasEdit &&
                        <Stack
                            direction = 'row'
                            borderBottom = '1px solid #dddddd'
                            onClick = {onClickAssociateEpics}
                            sx = {{ '&:hover': { cursor: 'text' } }}
                        >
                            <Link size = 'small' />
                            <Typography color = 'text.secondary' marginLeft = '3px'>Associate Epics</Typography>
                        </Stack>
                    }
                </div>
            </Collapse>
            <DeliverableWorkList deliverables = {children} hasEdit = {hasEdit} />
        </Stack>
    )
}

DeliverablesView.propTypes = {
    hasEdit: PropTypes.bool,
    portfolioId: PropTypes.number.isRequired,
    selectedDeliverableId: PropTypes.number,
}

DeliverablesView.defaultProps = {
    hasEdit: false,
    selectedDeliverableId: null
}
