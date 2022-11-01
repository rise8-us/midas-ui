import { InfoOutlined } from '@mui/icons-material'
import { ClickAwayListener, Grid, Icon, Tooltip, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useState } from 'react'

function LabelTooltip({ text, iconFontSize, typographyProps, tooltipProps }) {
    const [isTooltipOpen, setIsTooltipOpen] = useState(false)

    const handleTooltipClose = () => {
        setIsTooltipOpen(false)
    }

    const handleTooltipOpen = () => {
        setIsTooltipOpen(true)
    }

    return (
        <Grid container flexWrap = 'nowrap'>
            <Grid item zeroMinWidth>
                <Typography {...typographyProps}>{text}</Typography>
            </Grid>
            <Grid item zeroMinWidth style = {{ display: 'flex', alignItems: 'center' }}>
                {tooltipProps.title ?
                    <ClickAwayListener onClickAway = {handleTooltipClose}>
                        <Tooltip
                            {...tooltipProps}
                            open = {isTooltipOpen}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                        >
                            <Icon
                                sx = {{
                                    borderRadius: '50%',
                                    display: 'flex',
                                    cursor: 'pointer',
                                    color: 'infoIcon',
                                    ml: '4px'
                                }}
                                fontSize = {iconFontSize}
                                data-testid = 'LabelTooltip__icon'
                                onClick = {handleTooltipOpen}
                            >
                                <InfoOutlined fontSize = {iconFontSize}/>
                            </Icon>
                        </Tooltip>
                    </ClickAwayListener>
                    :
                    null
                }
            </Grid>
        </Grid>
    )
}

LabelTooltip.propTypes = {
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    iconFontSize: PropTypes.oneOf(['inherit', 'small', 'medium', 'large']),
    typographyProps: PropTypes.shape({
        variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2',
            'body1', 'body2', 'button', 'caption', 'overline']),
        color: PropTypes.oneOf(['text.primary', 'text.secondary', 'primary', 'secondary'])
    }),
    tooltipProps: PropTypes.shape({
        title: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
    })
}

LabelTooltip.defaultProps = {
    iconFontSize: 'medium',
    typographyProps: undefined,
    tooltipProps: {
        title: undefined
    }
}

export default LabelTooltip
