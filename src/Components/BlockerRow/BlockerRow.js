import { Grid, Typography } from '@mui/material'
import { Tag } from 'Components/Tag'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectAssertionById } from 'Redux/Assertions/selectors'
import { requestSearchComments } from 'Redux/Comments/actions'
import { selectCommentById } from 'Redux/Comments/selectors'
import { selectProductById } from 'Redux/Products/selectors'
import { styled } from 'Styles/materialThemes'

const TypographyLink = styled(Typography)(({ theme }) => ({
    cursor: 'pointer',
    fontWeight: 'bold',

    '&:hover': {
        color: theme.palette.primary.main,
    },
}))

const buildDate = (date) => {
    const dateParsed = date ? (new Date(date)).toDateString().split(' ') : ['', 'MMM', 'DD', 'YYYY']
    return `${dateParsed[2]} ${dateParsed[1].toUpperCase()} ${dateParsed[3].substr(2, 2)}`
}

function BlockerRow({ assertionId, productId, commentId }) {
    const history = useHistory()
    const dispatch = useDispatch()

    const goToProduct = () => history.push(`/products/${productId}`)
    const goToOgsm = () =>
        history.push(`/products/${productId}/objectives/${assertionId}`)
    const assertionStatus = useSelector((state) => state.app.assertionStatus)
    const product = useSelector((state) => selectProductById(state, productId))
    const comment = useSelector((state) => selectCommentById(state, commentId))
    const assertion = useSelector((state) =>
        selectAssertionById(state, assertionId)
    )

    const [fetchedComment, setFetchedComment] = useState(false)

    useEffect(() => {
        if (comment.id === undefined && !fetchedComment) {
            dispatch(requestSearchComments(`id:${commentId}`))
            setFetchedComment(true)
        }
    }, [comment])

    return (
        <Grid
            item
            container
            spacing = {3}
            justifyContent = 'space-between'
            style = {{ padding: '8px' }}
            wrap = 'nowrap'
        >
            <Grid container item direction = 'column' xs = {3}>
                <Grid item>
                    <TypographyLink variant = 'subtitle2' onClick = {goToProduct}>
                        {product.name.toLocaleUpperCase()}
                    </TypographyLink>
                </Grid>
                <Grid item>
                    <Typography
                        variant = 'caption'
                        color = 'text.secondary'
                        style = {{ fontStyle: 'italic' }}
                    >
                        {buildDate(comment.lastEdit ?? comment.creationDate)}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item direction = 'column'>
                <Grid item>
                    <TypographyLink variant = 'subtitle2' onClick = {goToOgsm}>
                        {assertion.text}
                    </TypographyLink>
                </Grid>
                <Grid item>
                    <Typography variant = 'body2' color = 'text.secondary'>
                        {comment.text.split('###')[0]}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs style = {{ textAlign: 'right' }}>
                <Tag
                    label = {assertionStatus[assertion.status].label}
                    color = {assertionStatus[assertion.status].color}
                />
            </Grid>
        </Grid>
    )
}

BlockerRow.propTypes = {
    assertionId: PropTypes.number.isRequired,
    productId: PropTypes.number.isRequired,
    commentId: PropTypes.number.isRequired
}

export default BlockerRow