import { useTheme } from '@emotion/react'
import { Stack, Typography } from '@mui/material'
import { DeliverablesViewEpics } from 'Components/DeliverablesViewEpics'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectEpicsByIds } from 'Redux/Epics/selectors'

export default function DeliverablesViewSubtargets({ subtarget }) {
    const theme = useTheme()

    const epics = useSelector(state => selectEpicsByIds(state, subtarget.epicIds))

    return (
        <Stack marginTop = {1} paddingLeft = {1} borderLeft = {'1px solid ' + theme.palette.background.default}>
            <Typography variant = 'h7'>{subtarget.title}</Typography>
            {epics.map((epic, index) => (
                <DeliverablesViewEpics epic = {epic} key = {index}/>
            ))}
        </Stack>
    )
}

DeliverablesViewSubtargets.propTypes = {
    subtarget: PropTypes.object
}

DeliverablesViewSubtargets.defaultProps = {
    subtarget: {}
}
