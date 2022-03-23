import { Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectTotalRoleCountByUserIds } from 'Redux/Users/selectors'
import { camelToCapitalCase } from 'Utilities/caseConversions'

export default function ProductRoleMetrics({ ids }) {
    const totalRoleCounts = useSelector(state => selectTotalRoleCountByUserIds(state, ids))

    return (
        <Stack>
            <Stack direction = 'row' justifyContent = 'space-between' alignItems = 'end'>
                <Typography variant = 'h6' color = 'text.primary'>Non-team Viewers:</Typography>
                <Typography variant = 'subtitle1' color = 'primary'>{ids.length}</Typography>
            </Stack>
            {ids.length > 0 &&
            <>
                <Typography variant = 'sibtitle2' color = 'text.primary' marginLeft = {1}>
                    Breakdown By Role:
                </Typography>
                {Object.entries(totalRoleCounts).map((role, index) => (
                    <Stack key = {index} direction = 'row' justifyContent = 'space-between' alignItems = 'end' ml = {2}>
                        <Typography variant = 'subtitle1' color = 'secondary'>{camelToCapitalCase(role[0])}</Typography>
                        <Typography color = 'primary'>{role[1].length}</Typography>
                    </Stack>
                ))}
            </>
            }
        </Stack>
    )
}

ProductRoleMetrics.propTypes = {
    ids: PropTypes.arrayOf(PropTypes.number).isRequired
}