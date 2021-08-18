import { Grid, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { AutoSaveTextField } from '../AutoSaveTextField'

const defaultValue = (field) => {
    return `Oh no! It looks like this product does not have a ${field}. Someone should fix that.`
}

const useStyles = makeStyles((theme) => ({
    inputLabel: {
        color: theme.palette.text.primary,
        ...theme.typography.h6
    },
    input: {
        color: theme.palette.text.secondary,
        paddingTop: theme.spacing(1),
        marginBottom: theme.spacing(2)
    }
}))

function ProductDetails({ missionStatement, problemStatement, visionStatement, hasEditAccess, onFieldUpdated }) {
    const classes = useStyles()

    return (
        <Grid container direction = 'column'>
            <Grid item>
                <AutoSaveTextField
                    label = 'OUR VISION'
                    initialValue = {visionStatement ?? defaultValue('Vision Statement')}
                    canEdit = {hasEditAccess}
                    onSave = {(e) => onFieldUpdated('vision', e)}
                    InputLabelProps = {{
                        className: classes.inputLabel
                    }}
                    className = {classes.input}
                    enableSpellCheck
                    fullWidth
                    multiline
                />
            </Grid>
            <Grid item>
                <AutoSaveTextField
                    label = 'OUR MISSION'
                    initialValue = {missionStatement ?? defaultValue('Mission Statement')}
                    canEdit = {hasEditAccess}
                    onSave = {(e) => onFieldUpdated('mission', e)}
                    InputLabelProps = {{
                        className: classes.inputLabel
                    }}
                    className = {classes.input}
                    enableSpellCheck
                    fullWidth
                    multiline
                />
            </Grid>
            <Grid item>
                <AutoSaveTextField
                    label = 'PROBLEM STATEMENT'
                    initialValue = {problemStatement ?? defaultValue('Problem Statement')}
                    canEdit = {hasEditAccess}
                    onSave = {(e) => onFieldUpdated('problemStatement', e)}
                    InputLabelProps = {{
                        className: classes.inputLabel
                    }}
                    className = {classes.input}
                    enableSpellCheck
                    fullWidth
                    multiline
                />
            </Grid>
        </Grid>
    )
}

ProductDetails.propTypes = {
    hasEditAccess: PropTypes.bool.isRequired,
    missionStatement: PropTypes.string,
    onFieldUpdated: PropTypes.func.isRequired,
    problemStatement: PropTypes.string,
    visionStatement: PropTypes.string,
}

ProductDetails.defaultProps = {
    missionStatement: null,
    problemStatement: null,
    visionStatement: null
}

export default ProductDetails