import { Close } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, Divider, IconButton, Typography } from '@mui/material'
import { Header } from 'Components/Header'
import PropTypes from 'prop-types'
import React from 'react'

const Popup = ({ children, submitText, title, subtitle, hideRequiredText, open, onSubmit, onClose }) => {
    return (
        <Dialog
            data-testid = 'Popup__dialog'
            open = {open}
            scroll = 'paper'
            PaperProps = {{ style: { width: '395px' } }}
        >
            <Header
                title = {title}
                titleVariant = 'h6'
                subtitle = {subtitle}
                icon = {
                    <IconButton
                        data-testid = 'Popup__button-close'
                        color = 'secondary'
                        onClick = {onClose}
                        size = 'medium'
                    >
                        <Close />
                    </IconButton>
                }
                additionalNode = {!hideRequiredText &&
                    <Typography variant = 'caption' color = 'text.secondary'>
                        * are required
                    </Typography>
                }
            />
            <Divider />
            <DialogContent sx = {{
                '&::-webkit-scrollbar': {
                    width: '12px'
                },
                '&::-webkit-scrollbar-thumb': {
                    height: '15%',
                    border: '3px solid transparent',
                    backgroundClip: 'padding-box',
                    backgroundColor: 'divider',
                    WebkitBorderRadius: '12px'
                },
                p: '16px 16px 50px 16px'
            }}>
                {children}
            </DialogContent>
            <DialogActions sx = {{ m: 0, p: 1 }}>
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
