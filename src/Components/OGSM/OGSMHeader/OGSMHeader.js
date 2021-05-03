import { makeStyles, TextField, Typography } from '@material-ui/core'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import { ExpandMore } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

const useStyles = makeStyles((theme) => ({
    heading: {
        margin: 'auto 0'
    },
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

const expandIcon = (cat) => {
    return (
        <ExpandMore data-testid = {`OGSMHeader__icon-${cat}`}/>
    )
}

function OGSMHeader({ category, detail, onChange, autoFocus }) {
    const classes = useStyles()

    const creatable = typeof onChange === 'function'

    const [value, setValue] = useState(detail)

    const onValueChange = (event) => {
        const val = event.target.value

        setValue(val)
        onChange(val)
    }

    const onFocus = (event) => {
        event.stopPropagation()
        event.target.setSelectionRange(0, event.target.value.length)
    }

    return (
        <AccordionSummary expandIcon = {expandIcon(category)}>
            <Typography className = {classes.heading} variant = 'h6' color = 'textSecondary'>
                {category}:
            </Typography>
            {creatable ?
                <TextField
                    autoFocus = {autoFocus}
                    fullWidth
                    InputProps = {{
                        disableUnderline: true,
                        readOnly: !creatable,
                        className: classes.creatableDetail,
                    }}
                    value = {value}
                    onChange = {onValueChange}
                    onClick = {event => event.stopPropagation()}
                    onFocus = {onFocus}
                >
                    {detail}
                </TextField>
                :
                <Typography variant = 'h6'>
                    {value}
                </Typography>
            }
        </AccordionSummary>
    )
}

OGSMHeader.propTypes = {
    category: PropTypes.string.isRequired,
    detail: PropTypes.string,
    autoFocus: PropTypes.bool,
    onChange: PropTypes.func
}

OGSMHeader.defaultProps = {
    detail: '',
    autoFocus: false,
    onChange: undefined

}

export default OGSMHeader