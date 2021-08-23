import { Dialog, DialogContent, makeStyles, useTheme } from '@material-ui/core'
import { ProductOnePager } from 'Components/ProductOnePager/ProductOnePager'
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = makeStyles(theme => ({
    dialogContent: {
        overflowX: 'clip',
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
    }
}))

function OnePagerPopup({ productId, open, onClose }) {
    const theme = useTheme()
    const classes = useStyles()

    return (
        <Dialog
            open = {open}
            scroll = 'paper'
            onClose = {onClose}
            PaperProps = {{
                style: {
                    width: '100%',
                    height: '100%',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    padding: 0,
                    margin: 0,
                    backgroundColor: theme.palette.background.default
                }
            }}
            style = {{
                width: '95%',
                height: 'calc(100% - 40px)',
                margin: 'auto'
            }}
        >
            <DialogContent className = {classes.dialogContent}>
                <ProductOnePager id = {productId} readOnly />
            </DialogContent>
        </Dialog>
    )
}

OnePagerPopup.propTypes = {
    productId: PropTypes.number.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default OnePagerPopup