import { Dialog, DialogContent, useTheme } from '@mui/material'
import { ProductOnePager } from 'Components/ProductOnePager'
import PropTypes from 'prop-types'
import React from 'react'
import { styled } from 'Styles/materialThemes'

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    overflowX: 'clip',
    '&::-webkit-scrollbar': {
        width: '12px',
    },
    '&::-webkit-scrollbar-thumb': {
        height: '15%',
        border: '3px solid transparent',
        backgroundClip: 'padding-box',
        backgroundColor: theme.palette.divider,
        WebkitBorderRadius: '12px',
    },
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