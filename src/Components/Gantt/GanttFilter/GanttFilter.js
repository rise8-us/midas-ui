import { FilterList } from '@mui/icons-material'
import { Button, ClickAwayListener, Tooltip } from '@mui/material'
import { TooltipOptions } from 'Components/TooltipOptions'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setTargetFilters } from 'Redux/Filters/reducer'

const filterOptions = [{
    title: 'Priority Items',
    value: 'isPriority',
    checked: false
}]

const filterMap = filterOptions.reduce((currentState, currentKey) => {
    currentState[currentKey.value] = currentKey
    return currentState
}, {})

export default function GanttFilter() {
    const dispatch = useDispatch()

    const [options, setOptions] = useState(filterMap)
    const [isOpen, setIsOpen] = useState(false)

    const handleOnChange = (key, checked) => {
        setOptions({
            ...options,
            [key]: {
                ...options[key],
                checked: checked
            }
        })
    }

    useEffect(() => {
        dispatch(setTargetFilters(Object.values(options).reduce((currentState, currentKey) => {
            currentState[currentKey.value] = currentKey.checked
            return currentState
        }, {})))
    }, [JSON.stringify(options)])

    return (
        <Tooltip
            arrow
            placement = 'top'
            open = {isOpen}
            title = {
                <ClickAwayListener onClickAway = {() => setIsOpen(false)}>
                    <TooltipOptions
                        multiple
                        options = {Object.values(options)}
                        onChange = {handleOnChange}
                    />
                </ClickAwayListener>
            }
        >
            <Button
                style = {{ minWidth: '34px', borderRadius: 0, borderRight: '1px solid black' }}
                onClick = {() => setIsOpen(prev => !prev)}>
                <FilterList fontSize = 'small'/>
            </Button>
        </Tooltip>
    )
}