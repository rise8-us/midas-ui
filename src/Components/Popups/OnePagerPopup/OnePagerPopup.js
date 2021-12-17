import { Dialog, DialogContent, useTheme } from '@mui/material'
import { ProductOnePager } from 'Components/ProductOnePager'
import PropTypes from 'prop-types'
import React from 'react'
import { scrollbar, styled } from 'Styles/materialThemes'

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    ...scrollbar(theme),
    overflowX: 'clip',
    padding: theme.spacing(2),
}))

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
                    backgroundColor: theme.palette.background.default,
                },
            }}
            style = {{
                width: '95%',
                height: 'calc(100% - 40px)',
                margin: 'auto',
            }}
        >
            <StyledDialogContent>
                <ProductOnePager id = {productId} readOnly />
            </StyledDialogContent>
        </Dialog>
    )
}

OnePagerPopup.propTypes = {
    productId: PropTypes.number.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default OnePagerPopup