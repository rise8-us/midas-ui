import { Stack, Tooltip, Typography } from '@mui/material'
import { UserTooltip } from 'Components/UserTooltip'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectTotalRoleCountByUserIds } from 'Redux/Users/selectors'
import { camelToCapitalCase } from 'Utilities/caseConversions'

export default function PageRoleMetrics({ ids, unknownViewerTitle }) {
    const totalRoleCounts = useSelector(state => selectTotalRoleCountByUserIds(state, ids))

    return (
        <Stack>
            <Tooltip
                disableHoverListener = {ids.length < 1}
                placement = 'right'
                arrow
                title = {<UserTooltip userIds = {ids} title = 'Total Unique Users'/>}
            >
                <Stack direction = 'row' justifyContent = 'space-between' alignItems = 'end'>
                    <Typography variant = 'h6' color = 'text.primary'>{unknownViewerTitle}</Typography>
                    <Typography variant = 'subtitle1' color = 'primary'>{ids.length}</Typography>
                </Stack>
            </Tooltip>
            {ids.length > 0 && <>
                <Typography variant = 'sibtitle2' color = 'text.primary' marginLeft = {1}>
                    Breakdown By Role:
                </Typography>
                {Object.entries(totalRoleCounts).map(([role, roleUserIds], index) => (
                    <Tooltip
                        key = {index}
                        disableHoverListener = {roleUserIds.length < 1}
                        placement = 'right'
                        arrow
                        title = {<UserTooltip userIds = {roleUserIds}/>}
                    >
                        <Stack direction = 'row' justifyContent = 'space-between' alignItems = 'end' ml = {2}>
                            <Typography variant = 'subtitle1' color = 'secondary'>
                                {camelToCapitalCase(role)}
                            </Typography>
                            <Typography color = 'primary'>{roleUserIds.length}</Typography>
                        </Stack>
                    </Tooltip>
                ))}
            </>
            }
        </Stack>
    )
}

PageRoleMetrics.propTypes = {
    ids: PropTypes.arrayOf(PropTypes.number).isRequired,
    unknownViewerTitle: PropTypes.string
}

PageRoleMetrics.defaultProps = {
    unknownViewerTitle: 'Non-team Viewers:'
}