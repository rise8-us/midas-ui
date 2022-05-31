import { useTheme } from '@emotion/react'
import { Stack, Typography } from '@mui/material'
import { DeliverablesViewSubtargets } from 'Components/DeliverablesViewSubtargets'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectTargetById } from 'Redux/Targets/selectors'

export default function DeliverablesViewTargets({ targetId, subtargets }) {
    const theme = useTheme()

    const target = useSelector(state => selectTargetById(state, targetId))

    const startDate = new Date(target.startDate)
    const dueDate = new Date(target.dueDate)

    return (
        <Stack
            marginY = {2}
            padding = {2}
            borderRadius = {2}
            style = {{ background: theme.palette.background.paper }}
        >
            <Typography variant = 'h6'>{target.title}</Typography>
            <Typography>{format(startDate, 'dd MMM yy')} - {format(dueDate, 'dd MMM yy')}</Typography>
            {subtargets.map((subtarget, index) => (
                <DeliverablesViewSubtargets subtarget = {subtarget} key = {index} />
            ))}
        </Stack>
    )
}

DeliverablesViewTargets.propTypes = {
    targetId: PropTypes.number.isRequired,
    subtargets: PropTypes.array
}

DeliverablesViewTargets.defaultProps = {
    subtargets: []
}