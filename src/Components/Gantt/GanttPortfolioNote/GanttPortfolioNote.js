import { Notes } from '@mui/icons-material'
import { Fade, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { format, formatRelative } from 'date-fns'
import useDebounce from 'Hooks/useDebounce'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { requestUpdatePortfolio } from 'Redux/Portfolios/actions'
import { selectPortfolioById } from 'Redux/Portfolios/selectors'

const lastModified = (date, user, left, top = '0px') => {
    const tooltip = () =>
        <span>
            <Typography>Last Modified: {user}</Typography>
            <Typography>Last Updated: {format(new Date(date + 'Z'), 'PPPppp')}</Typography>
        </span>

    return date
        ? <Tooltip title = {tooltip()}>
            <Typography
                color = 'secondary'
                variant = 'caption'
                display = 'inline'
                data-testid = 'GanttPortfolioNote__last-edited'
                position = 'relative'
                top = {top}
                left = {left}
            >
                (updated: <i>{formatRelative(new Date(date + 'Z'), new Date())}</i>)
            </Typography>
        </Tooltip>
        : null
}

export default function GanttPortfolioNote({ id }) {
    const dispatch = useDispatch()
    const [value, setValue] = useState('')
    const [saved, setSaved] = useState(false)
    const inputRef = useRef()

    const portfolio = useSelector(state => selectPortfolioById(state, id))
    const { ganttNote, ganttNoteModifiedBy, ganttNoteModifiedAt } = portfolio
    const user = ganttNoteModifiedBy?.displayName ?? ganttNoteModifiedBy?.username

    const pagePermissions = useSelector(state => selectPortfolioPagePermission(state, id))
    const debouncedValue = useDebounce(value, 500)

    const onKeyDown = ({ key }) => key === 'Escape' && setValue(ganttNote)

    const handleOnChange = (event) => {
        setValue(event.target.value)
    }

    const saveData = async() => {
        !saved && dispatch(requestUpdatePortfolio({
            ...portfolio,
            ganttNote: debouncedValue
        })).then(() => {
            setSaved(true)
            setTimeout(() => setSaved(false), 1500)
        })
    }

    useEffect(() => {
        debouncedValue && debouncedValue !== ganttNote && saveData()
    }, [debouncedValue])

    useEffect(() => {
        !pagePermissions.edit && setValue(ganttNote)
    }, [JSON.stringify(ganttNote)])

    if (!portfolio.id || (!pagePermissions.edit && ganttNote?.length < 1)) return null

    return (
        <Stack direction = 'row' marginBottom = {2} data-testid = 'GanttPortfolioNote__wrap'>
            <Tooltip title = 'Portfolio Roadmap notes'>
                <Notes
                    color = 'secondary'
                    onClick = {() => pagePermissions.edit && inputRef.current.focus()}
                />
            </Tooltip>
            {pagePermissions.edit
                ? <div style = {{ width: '100%', paddingRight: '8px' }}>
                    <TextField
                        value = {value}
                        onKeyDown = {onKeyDown}
                        onChange = {handleOnChange}
                        onBlur = {() => debouncedValue !== ganttNote && saveData()}
                        placeholder = 'Add a Roadmap note...'
                        style = {{ marginTop: '-8px', marginLeft: '8px' }}
                        inputProps = {{
                            style: { resize: 'vertical' },
                            'data-testid': 'GanttPortfolioNote__input'
                        }}
                        inputRef = {inputRef}
                        variant = 'outlined'
                        size = 'small'
                        multiline
                        fullWidth
                    />
                    <div style = {{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        {lastModified(ganttNoteModifiedAt, user, '8px')}
                        <Fade in = {saved}>
                            <Typography
                                color = 'secondary'
                                variant = 'caption'
                                marginLeft = 'auto'
                                style = {{ float: 'right' }}
                            >
                                saved!
                            </Typography>
                        </Fade>
                    </div>
                </div>
                : <span>
                    <Typography marginLeft = '22px' marginBottom = '5px'>
                        {ganttNote}
                    </Typography>
                    {ganttNote?.length > 0 && lastModified(ganttNoteModifiedAt, user, '20px', '-6px')}
                </span>
            }
        </Stack>
    )
}

GanttPortfolioNote.propTypes = {
    id: PropTypes.number.isRequired
}