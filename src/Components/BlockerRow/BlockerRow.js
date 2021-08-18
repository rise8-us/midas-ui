import { Grid, makeStyles, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Tag } from '../Tag'

const useStyles = makeStyles(theme => ({
    link: {
        cursor: 'pointer',
        fontWeight: 'bold',
        '&:hover': {
            color: theme.palette.primary.main
        },
    }
}))

function BlockerRow({ assertionId, productId, name, date, title, detail, tag }) {
    const classes = useStyles()
    const history = useHistory()

    const goToProduct = () => history.push(`/products/${productId}`)
    const goToOgsm = () => history.push(`/products/${productId}/ogsms/${assertionId}`)

    return (
        <Grid item container spacing = {3} justifyContent = 'space-between' style = {{ padding: '8px' }}>
            <Grid item sm = {2} xs = {2}>
                <Typography variant = 'subtitle2' className = {classes.link} onClick = {goToProduct}>
                    {name.toLocaleUpperCase()}
                </Typography>
                <Typography variant = 'caption' color = 'textSecondary' style = {{ fontStyle: 'italic' }}>
                    {date}
                </Typography>
            </Grid>
            <Grid item sm = {5} xs = {5}>
                <Typography variant = 'subtitle2' className = {classes.link} onClick = {goToOgsm}>
                    {title}
                </Typography>
                <Typography variant = 'body2' color = 'textSecondary'>
                    {detail}
                </Typography>
            </Grid>
            <Grid item sm = {4} xs = {4} style = {{ textAlign: 'right' }}>
                <Tag {...tag}/>
            </Grid>
        </Grid>
    )
}

BlockerRow.propTypes = {
    assertionId: PropTypes.number.isRequired,
    productId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired,
    tag: PropTypes.shape({
        label: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired
    }).isRequired
}

export default BlockerRow