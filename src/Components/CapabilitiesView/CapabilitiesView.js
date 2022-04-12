import { Box, Collapse, Divider, Stack, Typography } from '@mui/material'
import { DeliverableWorkList } from 'Components/DeliverableWorkList'
import { SearchEpics } from 'Components/Search'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestCreateDeliverable } from 'Redux/Deliverables/actions'
import { selectDeliverableById, selectDeliverableByParentId } from 'Redux/Deliverables/selectors'
import { enqueueMessage } from 'Redux/Snackbar/reducer'

export default function CapabilitiesView({ hasEdit, selectedDeliverableId, portfolioId }) {
    const dispatch = useDispatch()

    const deliverable = useSelector(state => selectDeliverableById(state, selectedDeliverableId))
    const children = useSelector(state => selectDeliverableByParentId(state, selectedDeliverableId))

    const epicIds = useMemo(() => children.map(c => c.completion.gitlabEpic?.id), [children])

    const progress = useMemo(() => {
        const accumulatedProgress = children.reduce((currentValues, child) => {
            return {
                value: currentValues.value + child.completion.value,
                target: currentValues.target + child.completion.target,
            }
        }, { value: 0, target: 0 })
        return accumulatedProgress.target > 0
            ? Math.floor((accumulatedProgress.value / accumulatedProgress.target) * 100)
            : 0
    }, [children])

    const onSelectEpic = (_e, values, reason) => {
        reason === 'selectOption' && !epicIds.includes(values[0].id) && dispatch(requestCreateDeliverable({
            title: values[0].title,
            index: deliverable.children.length,
            productId: values[0].productId,
            parentId: selectedDeliverableId,
            referenceId: 0,
            completion: {
                gitlabEpicId: values[0].id
            }
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
        <Stack marginX = '8%' spacing = {1}>
            <Stack direction = 'row' justifyContent = 'space-between'>
                <Typography variant = 'subtitle1' color = 'grey.400'>{deliverable?.title?.toUpperCase()}</Typography>
            </Stack>
            <Divider/>
            <Box>
                <Typography paddingY = {1}>
                    <b>{progress}%</b> of currently scoped work is complete.
                </Typography>
            </Box>
            <Collapse in = {hasEdit} collapsedSize = {0}>
                <div style = {{ height: '32px', width: '100%' }}>
                    {hasEdit &&
                        <SearchEpics
                            onChange = {onSelectEpic}
                            defaultSearchTerms = {`portfolio.id:${portfolioId}`}
                        />
                    }
                </div>
            </Collapse>
            <DeliverableWorkList deliverables = {children} hasEdit = {hasEdit} />
        </Stack>
    )
}

CapabilitiesView.propTypes = {
    hasEdit: PropTypes.bool,
    portfolioId: PropTypes.number.isRequired,
    selectedDeliverableId: PropTypes.number,
}

CapabilitiesView.defaultProps = {
    hasEdit: false,
    selectedDeliverableId: null
}