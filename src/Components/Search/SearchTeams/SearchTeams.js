import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllTeams } from '../../../Redux/Teams/selectors'

function SearchTeams(props) {
    const { onChange, value, ...autocompleteProps } = props

    const allTeams = useSelector(selectAllTeams)

    const onTeamChange = (event, values) => {
        typeof onChange === 'function' && onChange(event, values)
    }

    return (
        <Autocomplete
            multiple
            options = {allTeams}
            getOptionLabel = {(option) => option.name}
            getOptionSelected = {(option, selectedOption) => option.id === selectedOption.id}
            onChange = {onTeamChange}
            value = {value ?? []}
            ChipProps = {{ variant: 'outlined' }}
            renderInput = {(params) =>
                <TextField
                    {...params}
                    label = {'Team(s)'}
                    margin = 'dense'
                    placeholder = {'teamname'}
                />
            }
            {...autocompleteProps}
        />
    )
}

SearchTeams.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.array
}

SearchTeams.defaultProps = {
    onChange: undefined,
    value: undefined,
}

export default SearchTeams
