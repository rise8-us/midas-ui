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
function OGSMMeasure({ detail, onChange, readOnly }) {
    const classes = useStyles()

    const [value, setValue] = useState(detail)

    const onValueChange = (event) => {
        const val = event.target.value

        setValue(val)
        typeof onChange === 'function' && onChange(val)
    }


    return (
        <Box title = 'measurement' padding = {1} width = '100%' style = {{ paddingRight: '42px' }}>
            { !readOnly ?
                <TextField
                    fullWidth
                    InputProps = {{
                        className: classes.creatableDetail,
                    }}
                    value = {value}
                    onChange = {onValueChange}
                    onClick = {event => event.stopPropagation()}
                >
                    {detail}
                </TextField>
                :
                <Typography variant = 'h6'>
                    {value}
                </Typography>
            }
        </Box>
    )
}

OGSMMeasure.propTypes = {
    detail: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool
}

OGSMMeasure.defaultProps = {
    onChange: undefined,
    readOnly: false
}
export default OGSMMeasure