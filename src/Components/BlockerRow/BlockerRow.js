import { Grid, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { Tag } from '../Tag'

function BlockerRow({ name, date, title, detail, tag }) {
    return (
        <Grid item container spacing = {3} justifyContent = 'space-between' style = {{ padding: '8px' }}>
            <Grid item sm = {2} xs = {2}>
                <Typography variant = 'subtitle2' style = {{ fontWeight: 'bold' }}>
                    {name.toLocaleUpperCase()}
                </Typography>
                <Typography variant = 'caption' color = 'textSecondary' style = {{ fontStyle: 'italic' }}>
                    {date}
                </Typography>
            </Grid>
            <Grid item sm = {5} xs = {5}>
                <Typography variant = 'subtitle2' style = {{ fontWeight: 'bold' }}>
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