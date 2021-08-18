import { alpha, Box, Grid, makeStyles, SvgIcon, Tooltip, Typography, useTheme } from '@material-ui/core'
import { ReactComponent as CTFCertificate } from 'Assets/ctf.svg'
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    box: props => ({
        height: 128,
        width: 128,
        borderRadius: 8,
        border: '1px solid',
        cursor: 'pointer',
        borderColor: alpha(theme.palette.text.secondary, .4),
        color: theme.palette.text.secondary,
        '&:hover': {
            borderColor: props.color,
            color: theme.palette.text.primary
        },
    }),
    title: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '16px 0',
        color: 'inherit'
    }
}))

function ProductBox({ name, onClick, color, projects }) {
    const classes = useStyles({ color })
    const theme = useTheme()

    return (
        <Box
            className = {classes.box}
            onClick = {onClick}
        >
            <Typography variant = 'h6' className = {classes.title}>{name}</Typography>
            <Grid container justifyContent = 'center' wrap = 'wrap' data-testid = 'ProductBox__Grid-container'>
                {projects.map((project, index) =>
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
                                    color: project.projectJourneyMap === 7 ?
                                        theme.palette.text.primary : alpha(theme.palette.text.secondary, .4)
                                }}
                            >
                                <CTFCertificate />
                            </SvgIcon>
                        </Tooltip>
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}

ProductBox.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    projects: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        projectJourneyMap: PropTypes.number
    }))
}

ProductBox.defaultProps = {
    projects: []
}

export default ProductBox