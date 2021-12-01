import { Autocomplete, TextField } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllTeams } from 'Redux/Teams/selectors'

function SearchTeams({ onChange, value, ...autocompleteProps }) {

    const allTeams = useSelector(selectAllTeams)

    const onTeamChange = (event, values) => {
        onChange(event, values)
    }

    return (
        <Autocomplete
            multiple
            options = {allTeams}
            getOptionLabel = {(option) => option.name}
            isOptionEqualToValue = {(option, selectedOption) => option.id === selectedOption.id}
            onChange = {onTeamChange}
            value = {value ?? []}
            ChipProps = {{ variant: 'outlined', size: 'small' }}
            renderInput = {(params) =>
                <TextField
                    {...params}
                    label = {'Team(s)'}
                    margin = 'dense'
                    placeholder = {'team name'}
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
    onChange: (_e, v) => v,
    value: undefined,
}

export default SearchTeams
