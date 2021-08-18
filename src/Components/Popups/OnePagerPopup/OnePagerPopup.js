import { Dialog, DialogContent, useTheme } from '@material-ui/core'
import { ProductOnePager } from 'Components/ProductOnePager'
import PropTypes from 'prop-types'
import React from 'react'

function OnePagerPopup({ productId, open, onClose }) {
    const theme = useTheme()

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
            <DialogContent>
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