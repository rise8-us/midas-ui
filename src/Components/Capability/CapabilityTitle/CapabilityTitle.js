import { Article, DeleteOutline } from '@mui/icons-material'
import { Grow, IconButton, Stack } from '@mui/material'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import { MoreOptionsPopperMenu } from 'Components/MoreOptionsPopperMenu'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { requestDeleteCapability, requestUpdateCapability } from 'Redux/Capabilities/actions'
import { requestDeleteDeliverable } from 'Redux/Deliverables/actions'
import { styled } from 'Styles/materialThemes'

const StyledAutoSaveTextFieldTitle = styled(AutoSaveTextField)(({ theme, color }) => ({
    ...theme.typography.subtitle1,
    color: theme.palette[color].main,
    '&> *': { textTransform: 'uppercase' }
}))

const StyledArticle = styled(Article)(({ theme }) => ({
    marginRight: theme.spacing(1)
}))

export default function CapabilityTitle({
    onDelete,
    options,
    capability,
    showDelete,
    showMoreOptions,
    canEdit,
    ...autoSaveTextFieldProps
}) {

    const dispatch = useDispatch()
    const [hover, setHover] = useState(false)

    const updateCapability = (newTitle) => {
        dispatch(requestUpdateCapability({
            ...capability,
            title: newTitle,
        }))
    }

    const deleteCapability = () => {
        const deleteDeliverables = async() => {
            const request = capability.deliverableIds.map(deliverableId => {
                return dispatch(requestDeleteDeliverable(deliverableId))
            })
            Promise.all(request).then(() => {
                dispatch(requestDeleteCapability(capability.id))
                onDelete(0)
            })
        }
        deleteDeliverables()
    }

    return (
        <Stack>
            <Stack direction = 'row' alignItems = 'center'>
                <StyledArticle fontSize = 'small' color = 'primary'/>
                <StyledAutoSaveTextFieldTitle
                    color = 'primary'
                    canEdit = {canEdit}
                    initialValue = {capability.title}
                    onSave = {updateCapability}
                    onHoverChange = {setHover}
                    fullWidth
                    dataTestId = 'CapabilityTitle'
                    InputProps = {{
                        endAdornment: (
                            <>
                                {showDelete &&
                                    <Grow in = {hover}>
                                        <IconButton onClick = {deleteCapability}>
                                            <DeleteOutline fontSize = 'small' color = 'secondary'/>
                                        </IconButton>
                                    </Grow>
                                }
                            </>
                        )
                    }}
                    {...autoSaveTextFieldProps}
                />
                {canEdit && showMoreOptions && <MoreOptionsPopperMenu options = {options} />}
            </Stack>
        </Stack>
    )
}

CapabilityTitle.propTypes = {
    canEdit: PropTypes.bool,
    capability: PropTypes.shape({
        deliverableIds: PropTypes.arrayOf(PropTypes.number),
        description: PropTypes.string,
        id: PropTypes.number,
        title: PropTypes.string,
    }),
    onDelete: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        icon: PropTypes.node,
        onClick: PropTypes.func
    })),
    showMoreOptions: PropTypes.bool,
    showDelete: PropTypes.bool,
}

CapabilityTitle.defaultProps = {
    canEdit: false,
    capability: {
        deliverableIds: [],
        description: '',
        id: 0,
        title: '',
    },
    onDelete: e => e,
    options: [],
    showMoreOptions: false,
    showDelete: false,
}
