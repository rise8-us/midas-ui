import { DeleteOutlined } from '@mui/icons-material'
import { IconButton, Stack, Typography } from '@mui/material'
import { HrefText } from 'Components/HrefText'
import PropTypes from 'prop-types'
import { styled } from 'Styles/materialThemes'
import { ClosedLabel } from '../../Epics'

const StyledDiv = styled('div')(({ theme }) => ({
    borderRadius: theme.spacing(1),
    color: theme.palette.gantt.association.dark.text,
    background: theme.palette.gantt.association.dark.background,
    padding: theme.spacing(1),
}))

const StyledHrefText = styled(HrefText)(({ theme }) => ({
    color: theme.palette.gantt.association.dark.text,
}))

export default function GanttAssociatedEpic(props) {

    const { name, title, webUrl, onDelete, isClosed } = props

    return (
        <StyledDiv>
            <Stack direction = 'row' spacing = {1} alignItems = 'center'>
                {name &&
                    <>
                        <Typography>{name}</Typography>
                        <Typography color = 'secondary'>-</Typography>
                    </>
                }
                <StyledHrefText text = {title} href = {webUrl}/>
                {isClosed && <ClosedLabel/>}
                {typeof onDelete === 'function' &&
                    <IconButton onClick = {onDelete} style = {{ marginLeft: 'auto' }}>
                        <DeleteOutlined fontSize = 'small'/>
                    </IconButton>
                }
            </Stack>
        </StyledDiv>
    )
}

GanttAssociatedEpic.propTypes = {
    name: PropTypes.string,
    onDelete: PropTypes.func,
    title: PropTypes.string.isRequired,
    webUrl: PropTypes.string,
    isClosed: PropTypes.bool,
}

GanttAssociatedEpic.defaultProps = {
    name: undefined,
    onDelete: undefined,
    webUrl: undefined,
    isClosed: false,
}
