import { Grid, Stack } from '@mui/material'
import { HrefText } from 'Components/HrefText'
import PropTypes from 'prop-types'

export default function DeliverablesViewEpics({ epic }) {

    const { title, webUrl } = epic

    return (
        <Stack marginTop = {1} paddingLeft = {1}>
            <Grid container alignItems = 'center'>
                <Grid item xs = {8}>
                    <div>
                        <HrefText
                            text = {title}
                            href = {webUrl}
                            color = 'secondary'
                        />
                    </div>
                </Grid>
            </Grid>
        </Stack>
    )
}

DeliverablesViewEpics.propTypes = {
    epic: PropTypes.object
}

DeliverablesViewEpics.defaultProps = {
    epic: {}
}
