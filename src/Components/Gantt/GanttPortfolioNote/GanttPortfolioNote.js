import { Notes } from '@mui/icons-material'
import { ClickAwayListener, Fade, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { format } from 'date-fns'
import useDebounce from 'Hooks/useDebounce'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { requestUpdatePortfolio } from 'Redux/Portfolios/actions'
import { selectPortfolioById } from 'Redux/Portfolios/selectors'

export default function GanttPortfolioNote({ id }) {
    const dispatch = useDispatch()
    const [value, setValue] = useState('')
    const [saved, setSaved] = useState(false)
    const inputRef = useRef()

    const portfolio = useSelector(state => selectPortfolioById(state, id))
    const { ganttNote, ganttNoteModifiedBy, ganttNoteModifiedAt } = portfolio

    const pagePermissions = useSelector(state => selectPortfolioPagePermission(state, id))
    const debouncedValue = useDebounce(value, 1000)

    const onKeyDown = ({ key }) => key === 'Escape' && setValue(ganttNote)

    const handleOnChange = (event) => {
        setValue(event.target.value)
        setSaved(false)
    }

    const saveData = () => {
        !saved && dispatch(requestUpdatePortfolio({
            ...portfolio,
            ganttNote: debouncedValue
        }))
        setSaved(true)
        setTimeout(() => setSaved(false), 1500)
    }

    useEffect(() => {
        debouncedValue && debouncedValue !== ganttNote && saveData()
    }, [debouncedValue])

    useEffect(() => {
        !pagePermissions.edit && setValue(ganttNote)
    }, [JSON.stringify(ganttNote)])

    if (!portfolio.id) return null

    return (
        <ClickAwayListener onClickAway = {saveData}>
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
                    : <span style = {{ marginLeft: '22px', marginBottom: '6px' }}>
                        <Typography display = 'inline' marginRight = '4px'>
                            {ganttNote}
                        </Typography>
                        <Tooltip
                            title = {
                                'Modified By: ' + (ganttNoteModifiedBy?.displayName ?? ganttNoteModifiedBy?.username)
                            }
                        >
                            {ganttNoteModifiedAt &&
                                <Typography
                                    color = 'secondary'
                                    variant = 'caption'
                                    display = 'inline'
                                    data-testid = 'GanttPortfolioNote__last-edited'
                                >
                                    (edited: <i>{format(new Date(ganttNoteModifiedAt), 'PPPppp')}</i>)
                                </Typography>
                            }
                        </Tooltip>
                    </span>
                }
            </Stack>
        </ClickAwayListener>
    )
}

GanttPortfolioNote.propTypes = {
    id: PropTypes.number.isRequired
}