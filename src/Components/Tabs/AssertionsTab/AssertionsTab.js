import { Grid, Slide } from '@mui/material'
import { AssertionComments } from 'Components/Assertions'
import { GoalContainer } from 'Components/Cards/OGSM/GoalContainer'
import { ObjectiveCard } from 'Components/Cards/OGSM/ObjectiveCard'
import { StrategyContainer } from 'Components/Cards/OGSM/StrategyContainer'
import { ViewSettings } from 'Components/OGSM/ViewSettings'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAssertionComment } from 'Redux/AppSettings/reducer'
import { selectAssertionCommentInfo } from 'Redux/AppSettings/selectors'
import { requestSearchAssertions } from 'Redux/Assertions/actions'
import { selectAssertionsByProductId } from 'Redux/Assertions/selectors'

export const commentSidebarOpen = (id, type) => id && type ? true : false

const defStyle = {
    maxWidth: '100%',
    flexGrow: 1
}
function AssertionsTab({ productId, hasEdit }) {
    const dispatch = useDispatch()
    const ref = useRef()

    const commentSidebarInfo = useSelector(selectAssertionCommentInfo)
    const allAssertions = useSelector(state => selectAssertionsByProductId(state, productId))

    const ogsms = useMemo(() => {
        const objectives = allAssertions.filter(assertion => assertion.parentId === null)
        const strategies = allAssertions.filter(assertion => assertion.parentId !== null)
        return { objectives, strategies }
    }, [allAssertions])

    const showCommentSidebar = useMemo(() => {
        const { id, type } = commentSidebarInfo
        return commentSidebarOpen(id, type)
    }, [commentSidebarInfo])

    const [selectedObjectiveId, setSelectedObjectiveId] = useState(null)

    useEffect(() => {
        dispatch(requestSearchAssertions(`product.id:${productId}`))
        dispatch(setAssertionComment({ assertionId: null, deletedAssertionId: null, type: null }))
    }, [])

    return (
        <Grid container>
            <Grid item>
                <ViewSettings
                    objectives = {ogsms.objectives}
                    initialIndex = {1}
                    onChange = {setSelectedObjectiveId}
                    productId = {productId}
                    hasEdit = {hasEdit}
                />
            </Grid>
            <Grid container item wrap = 'nowrap' spacing = {1} marginY = {1}>
                {selectedObjectiveId &&
                    <Grid container item spacing = {1}>
                        <Grid item xs = {12}>
                            <ObjectiveCard id = {selectedObjectiveId} hasEdit = {hasEdit}/>
                        </Grid>
                        <Grid item xs = {12} lg = {4} minWidth = '350px' style = {defStyle}>
                            <GoalContainer assertionId = {selectedObjectiveId} hasEdit = {hasEdit}/>
                        </Grid>
                        <Grid item xs = {12} lg = {8} style = {defStyle}>
                            <StrategyContainer
                                parentId = {selectedObjectiveId}
                                productId = {productId}
                                hasEdit = {hasEdit}
                            />
                        </Grid>
                    </Grid>
                }
                <Slide direction = 'left' in = {showCommentSidebar}>
                    <Grid
                        item
                        minWidth = {showCommentSidebar ? '350px' : 'unset'}
                        maxWidth = '350px'
                        height = '20px'
                        position = 'sticky'
                        top = '0px'
                        ref = {ref}
                    >
                        {showCommentSidebar && <AssertionComments offsetTop = {ref?.current?.offsetTop} />}
                    </Grid>
                </Slide>
            </Grid>
        </Grid>
    )
}

AssertionsTab.propTypes = {
    productId: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool.isRequired,
}

export default AssertionsTab
