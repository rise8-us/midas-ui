import { alpha, Box, Grid, SvgIcon, Tooltip, Typography, useTheme } from '@mui/material'
import { ReactComponent as CTFCertificate } from 'Assets/ctf.svg'
import PropTypes from 'prop-types'
import React from 'react'
import { styled } from 'Styles/materialThemes'

const BoxStyled = styled(Box)(({ theme }) => ({
    height: 128,
    width: 128,
    borderRadius: 8,
    border: '1px solid',
    cursor: 'pointer',
    borderColor: alpha(theme.palette.text.secondary, 0.4),
    color: theme.palette.text.secondary
}))

const TypographyTitleStyled = styled(Typography)(() => ({
    display: 'flex',
    justifyContent: 'space-around',
    padding: '16px 0',
    color: 'inherit'
}))

function ProductBox({ name, onClick, color, projects }) {
    const theme = useTheme()

    return (
        <BoxStyled
            sx = {{
                '&:hover': {
                    borderColor: color,
                    color: 'text.primary'
                }
            }}
            onClick = {onClick}
        >
            <TypographyTitleStyled variant = 'h6'>{name}</TypographyTitleStyled>
            <Grid container justifyContent = 'center' wrap = 'wrap' data-testid = 'ProductBox__Grid-container'>
                {projects.map((project, index) => (
                    <Grid item key = {index} data-testid = 'ProductBox__Grid-item'>
                        <Tooltip title = {project.name}>
                            <SvgIcon
                                style = {{
                                    margin: '4px',
                                    fontSize: '30px',
                                    padding: '6px 4px 4px 4px',
                                    marginBottom: '-2px',
                                    border: '1px solid',
                                    borderRadius: '14px',
                                    overflow: 'visible',
                                    color: project.projectJourneyMap === 7
                                        ? theme.palette.text.primary
                                        : alpha(theme.palette.text.secondary, 0.4)
                                }}
                            >
                                <CTFCertificate />
                            </SvgIcon>
                        </Tooltip>
                    </Grid>
                ))}
            </Grid>
        </BoxStyled>
    )
}

ProductBox.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    projects: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            projectJourneyMap: PropTypes.number
        })
    )
}

ProductBox.defaultProps = {
    projects: []
}

export default ProductBox
