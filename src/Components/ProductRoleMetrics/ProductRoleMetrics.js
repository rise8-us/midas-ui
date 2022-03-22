import { Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectTotalRoleCountByUserIds } from 'Redux/Users/selectors'
import { camelToCapitalCase } from 'Utilities/caseConversions'

export default function ProductRoleMetrics({ ids }) {
    const totalRoleCounts = useSelector(state => selectTotalRoleCountByUserIds(state, ids))

    return (
        <Stack maxWidth = '320px'>
            <Typography variant = 'h6'>Users by Role:</Typography>
            {Object.entries(totalRoleCounts).map((role, index) => (
                <Stack key = {index} direction = 'row' justifyContent = 'space-between' alignItems = 'end'>
                    <Typography variant = 'subtitle1' color = 'secondary'>{camelToCapitalCase(role[0])}</Typography>
                    <Typography color = 'primary'>{role[1].length}</Typography>
                </Stack>
            ))}
        </Stack>
    )
}

ProductRoleMetrics.propTypes = {
    ids: PropTypes.arrayOf(PropTypes.number).isRequired
}