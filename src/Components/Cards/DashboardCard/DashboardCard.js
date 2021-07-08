import { Card, CardContent, makeStyles, rgbToHex, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

const commonLabelStyle = {
    borderRadius: '16px',
    padding: '2px 10px',
    margin: '0 5px',
    fontWeight: 'bold',
    cursor: 'pointer',
}

const useStyles = makeStyles(theme => ({
    selectedOption: {
        ...commonLabelStyle,
        color: theme.palette.text.primary,
        backgroundColor: `${rgbToHex(theme.palette.grey[800])}70`,
        '&:hover': {
            backgroundColor: `${rgbToHex(theme.palette.grey[800])}A0`
        }
    },
    unselectedOption: {
        ...commonLabelStyle,
        color: theme.palette.text.secondary,
        backgroundColor: 'transparent',
        '&:hover': {
            backgroundColor: `${rgbToHex(theme.palette.grey[800])}A0`
        }
    },
    title: {
        color: theme.palette.text.secondary,
        paddingRight: theme.spacing(5)
    }
}))

function DashboardCard(props) {
    const { title, options, defaultOptionId, onChange, children, ...cardStyle } = props
    const classes = useStyles()

    const [selectedId, setSelectedId] = useState(defaultOptionId)

    const onIdChange = (id) => {
        setSelectedId(id)
        typeof onChange === 'function' && onChange(id)
    }

    return (
        <Card style = {{ borderRadius: '16px', ...cardStyle }}>
            <CardContent style = {{ display: 'flex', alignItems: 'center' }}>
                <Typography variant = 'h6' className = {classes.title}>{title}</Typography>
                {options.map(option => (
                    <Typography
                        key = {option.id}
                        variant = 'caption'
                        className = {selectedId === option.id ? classes.selectedOption : classes.unselectedOption}
                        onClick = {() => onIdChange(option.id)}
                    >{option.label}</Typography>
                ))}
            </CardContent>
            {children}
        </Card>
    )
}

DashboardCard.propTypes = {
    title: PropTypes.string.isRequired,
    defaultOptionId: PropTypes.number,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired
    })),
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    width: PropTypes.string,
    minWidth: PropTypes.string,
    maxWidth: PropTypes.string,
    height: PropTypes.string,
    maxHeight: PropTypes.string,
}

DashboardCard.defaultProps = {
    defaultOptionId: null,
    options: [],
    onChange: null,
    children: null,
    width: 'initial',
    minWidth: '600px',
    maxWidth: 'unset',
    height: '100%',
    maxHeight: 'unset',
}

export default DashboardCard