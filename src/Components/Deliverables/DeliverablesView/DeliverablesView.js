import { Link } from '@mui/icons-material'
import { Box, Collapse, Divider, Stack, Typography } from '@mui/material'
import { DeliverablesViewTargets } from 'Components/DeliverablesViewTargets'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestCreateDeliverable, requestDeleteDeliverable } from 'Redux/Deliverables/actions'
import { selectDeliverableById, selectDeliverableByParentId } from 'Redux/Deliverables/selectors'
import { selectEpicsByIds } from 'Redux/Epics/selectors'
import { openPopup } from 'Redux/Popups/actions'
import { enqueueMessage } from 'Redux/Snackbar/reducer'
import { selectEpicIdsByTargetIds, selectTargetsByIds } from 'Redux/Targets/selectors'
import { getTotalWeights } from 'Utilities/progressHelpers'
import { DeliverableWorkList } from '../DeliverableWorkList'

export default function DeliverablesView({ hasEdit, selectedDeliverableId, portfolioId }) {
    const dispatch = useDispatch()

    const deliverable = useSelector(state => selectDeliverableById(state, selectedDeliverableId))
    const children = useSelector(state => selectDeliverableByParentId(state, selectedDeliverableId))
    const subtargets = useSelector(state => selectTargetsByIds(state, deliverable.targetIds ?? []))
    const targetIds = subtargets?.map(s => s.parentId).filter((val, index, self) => self.indexOf(val) === index)

    const subtargetIds = subtargets?.map(s => s.id)
    const subtargetEpicIds = useSelector(state => selectEpicIdsByTargetIds(state, subtargetIds))
    const subtargetEpics = useSelector(state => selectEpicsByIds(state, subtargetEpicIds))
    const [totalWeight, totalCompletedWeight] = getTotalWeights(subtargetEpics)

    const progress = useMemo(() => {
        const accumulatedProgress = children.reduce((currentValues, child) => {
            return {
                value: currentValues.value + child.completion.value,
                target: currentValues.target + child.completion.target,
            }
        }, { value: 0, target: 0 })

        accumulatedProgress.value = accumulatedProgress.value + totalCompletedWeight
        accumulatedProgress.target = accumulatedProgress.target + totalWeight

        return accumulatedProgress.target > 0
            ? Math.floor((accumulatedProgress.value / accumulatedProgress.target) * 100)
            : 0
    }, [children])

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
            <Box>
                <Typography paddingY = {1}>
                    <b>{progress}%</b> of currently scoped work is complete.
                </Typography>
            </Box>
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