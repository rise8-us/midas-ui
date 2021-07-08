import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, makeStyles, Typography
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = makeStyles(theme => ({
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

const Popup = ({ children, submitText, title, subtitle, hideRequiredText, open, onSubmit, onClose }) => {
    const classes = useStyles()

    return (
        <Dialog
            data-testid = 'Popup__dialog'
            open = {open}
            scroll = 'paper'
            PaperProps = {{ style: { width: '395px' } }}
        >
            <DialogTitle disableTypography className = {classes.dialogTitle} >
                <Typography variant = 'h6'>{title}</Typography>
                {subtitle &&
                    <Typography variant = 'caption' color = 'textSecondary'>{subtitle}</Typography>
                }
                {!hideRequiredText &&
                    <Typography variant = 'caption' color = 'textSecondary'>* are required</Typography>
                }
                <IconButton
                    data-testid = 'Popup__button-close'
                    className = {classes.closeButton}
                    onClick = {onClose}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Divider />
            <DialogContent className = {classes.dialogContent} style = {{ paddingBottom: '50px' }}>
                {children}
            </DialogContent>
            <DialogActions className = {classes.dialogActions}>
                <Button
                    data-testid = 'Popup__button-cancel'
                    onClick = {onClose}
                    color = 'secondary'
                    variant = 'text'
                >
                    cancel
                </Button>
                { onSubmit &&
                    <Button
                        data-testid = 'Popup__button-submit'
                        onClick = {onSubmit}
                        color = 'primary'
                        variant = 'outlined'
                    >
                        {submitText}
                    </Button>
                }
            </DialogActions>
        </Dialog>
    )
}

Popup.propTypes = {
    title: PropTypes.string.isRequired,
    open: PropTypes.bool,
    subtitle: PropTypes.string,
    submitText: PropTypes.string,
    onSubmit: PropTypes.func,
    hideRequiredText: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ]).isRequired
}

Popup.defaultProps = {
    open: true,
    submitText: 'Submit',
    subtitle: null,
    hideRequiredText: false,
    onSubmit: undefined
}

export default Popup
