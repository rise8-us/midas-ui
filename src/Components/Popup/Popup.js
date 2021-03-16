import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, Typography
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import PropTypes from 'prop-types'
import React from 'react'


const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 350,
        minHeight: 250
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    },
    dialogTitle: {
        margin: 0,
        padding: theme.spacing(2)
    },
    dialogContent: {
        '&::-webkit-scrollbar': {
            width: '12px'
        },
        '&::-webkit-scrollbar-thumb': {
            height: '15%',
            border: '3px solid rgba(0, 0, 0, 0)',
            backgroundClip: 'padding-box',
            backgroundColor: theme.palette.divider,
            '-webkit-border-radius': '12px'
        },
        padding: theme.spacing(2)
    },
    dialogActions: {
        margin: 0,
        padding: theme.spacing(1)
    }
}))

const Popup = ({ children, submitText, title, onSubmit, onClose }) => {
    const classes = useStyles()

    return (
        <Dialog
            onClose = {onClose}
            data-testid = 'Popup__dialog'
            open
            scroll = 'paper'
            className = {classes.root}
        >
            <DialogTitle disableTypography className = {classes.dialogTitle}>
                <Typography variant = 'h6'>{title}</Typography>
                <IconButton
                    data-testid = 'Popup__button-close'
                    className = {classes.closeButton}
                    onClick = {onClose}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers className = {classes.dialogContent} style = {{ paddingBottom: '50px' }}>
                {children}
            </DialogContent>
            <DialogActions className = {classes.dialogActions}>
                <Button
                    autoFocus
                    data-testid = 'Popup__button-submit'
                    onClick = {onSubmit}
                    color = 'primary'
                >
                    {submitText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

Popup.propTypes = {
    title: PropTypes.string.isRequired,
    submitText: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ]).isRequired
}

Popup.defaultProps = {
    submitText: 'Submit'
}

export default Popup
