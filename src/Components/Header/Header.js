import { Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import { styled } from 'Styles/materialThemes'

const GridStyled = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(2)
}))

function Header({ title, subtitle, titleVariant, subtitleVariant, icon, additionalNode }) {
    return (
        <GridStyled container direction = 'column'>
            <Grid container item justifyContent = 'space-between' alignItems = 'center'>
                <Grid item>
                    <Typography variant = {titleVariant}>
                        {title}
                    </Typography>
                </Grid>
                <Grid item>
                    {icon}
                </Grid>
            </Grid>
            {subtitle &&
                <Grid item>
                    <Typography variant = {subtitleVariant} color = 'text.secondary'>{subtitle}</Typography>
                </Grid>
            }
            {additionalNode && <>{additionalNode}</>}
        </GridStyled>
    )
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    titleVariant: PropTypes.string,
    subtitle: PropTypes.string,
    subtitleVariant: PropTypes.string,
    icon: PropTypes.node,
    additionalNode: PropTypes.node
}

Header.defaultProps = {
    titleVariant: 'h4',
    subtitleVariant: 'h6',
    subtitle: '',
    icon: null,
    additionalNode: null
}

export default Header
