import { Box, makeStyles, TextField, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

const useStyles = makeStyles((theme) => ({
    detail: {
        ...theme.typography.h6,
        margin: 'auto 0',
        paddingLeft: 4,
        '&:hover': {
            cursor: 'pointer'
        }
    },
    creatableDetail: {
        ...theme.typography.h6,
        margin: 'auto 0',
        paddingLeft: 4
    }
}))
function OGSMMeasure({ detail, onChange }) {
    const classes = useStyles()

    const creatable = typeof onChange === 'function'

    const [value, setValue] = useState(detail)

    const onValueChange = (event) => {
        const val = event.target.value

        setValue(val)
        onChange(val)
    }

    return (
        <Box title = 'measurement' padding = {1}>
            { creatable ?
                <TextField
                    style = {{
                        width: '100%',
                        paddingRight: '48px'
                    }}
                    fullWidth
                    InputProps = {{
                        disableUnderline: true,
                        readOnly: !creatable,
                        className: classes.creatableDetail,
                    }}
                    value = {value}
                    onChange = {onValueChange}
                    onClick = {event => event.stopPropagation()}
                >
                    {detail}
                </TextField>
                :
                <Typography >
                    {value}
                </Typography>
            }
        </Box>
    )
}

OGSMMeasure.propTypes = {
    detail: PropTypes.string.isRequired,
    onChange: PropTypes.func
}

OGSMMeasure.defaultProps = {
    onChange: undefined
}
export default OGSMMeasure