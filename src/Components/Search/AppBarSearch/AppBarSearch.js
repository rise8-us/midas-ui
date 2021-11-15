import { ClearOutlined, Search } from '@mui/icons-material'
import { SearchBar } from 'Components/Search/SearchBar'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setAppBarFilterString } from 'Redux/Filters/reducer'
import { styled } from 'Styles/materialThemes'

const StyledSearchBar = styled(SearchBar)(({ theme }) => ({
    height: 28,
    borderRadius: 12,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
}))

const StyledSearchIcon = styled(Search)(({ theme }) => ({
    paddingRight: theme.spacing(1),
    color: theme.palette.secondary.main
}))

function AppBarSearch({ placeholder, ...autoCompleteProps }) {
    const dispatch = useDispatch()

    const onTextFieldChange = (input) => dispatch(setAppBarFilterString(input))

    return (
        <StyledSearchBar
            {...autoCompleteProps}
            onTextFieldChange = {onTextFieldChange}
            freeSolo
            disableUnderline
            startAdornment = {<StyledSearchIcon />}
            showLoading = {false}
            textFieldProps = {{
                placeholder,
                margin: 'dense',
            }}
            inputFontSize = '12px'
            growFrom = '150px'
            growTo = '225px'
            clearIcon = {<ClearOutlined color = 'secondary' fontSize = 'small'/>}
        />
    )
}

AppBarSearch.propTypes = {
    placeholder: PropTypes.string,
}

AppBarSearch.defaultProps = {
    placeholder: 'Search',
}

export default AppBarSearch
