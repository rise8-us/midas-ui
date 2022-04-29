import { Notes } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { GanttActionButtons } from '../GanttActionButtons'

const headerRowStyle = {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
}

export default function GanttTooltip({
    children,
    dateRange,
    description,
    onDeleteClick,
    onEditClick,
    permissions,
    title,
}) {

    return (
        <div style = {{ minWidth: '240px' }}>
            <Stack spacing = {2}>
                <div style = {{ marginBottom: '8px' }}>
                    <div style = {headerRowStyle}>
                        <Typography variant = 'h6'>{title}</Typography>
                        {permissions.edit &&
                            <div style = {{ display: 'flex', maxHeight: '40px' }}>
                                <GanttActionButtons
                                    color = 'secondary'
                                    onDeleteClick = {onDeleteClick}
                                    onEditClick = {onEditClick}
                                />
                            </div>
                        }
                    </div>
                    <Typography color = 'text.secondary' variant = 'subtitle2'>
                        {dateRange}
                    </Typography>
                </div>
                {description?.length > 0 &&
                    <Stack direction = 'row'>
                        <Notes color = 'secondary' style = {{ marginRight: '12px' }}/>
                        <Typography color = 'text.secondary' variant = 'subtitle2'>
                            {description}
                        </Typography>
                    </Stack>
                }
                {children}
            </Stack>
        </div>
    )
}

GanttTooltip.propTypes = {
    children: PropTypes.node,
    dateRange: PropTypes.string.isRequired,
    description: PropTypes.string,
    onDeleteClick: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
    permissions: PropTypes.shape({
        edit: PropTypes.bool
    }),
    title: PropTypes.string.isRequired,
}

GanttTooltip.defaultProps = {
    children: null,
    description: '',
    permissions: {
        edit: false
    },
}