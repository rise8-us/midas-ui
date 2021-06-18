import PropTypes from 'prop-types'
import React from 'react'
import { AppBar } from '../AppBar'

function Page({ children }) {
    return (
        <>
            <AppBar appName = 'MIDAS' />
            <div style = {{ padding: '68px 0 20px 0', height: 'inherit' }}>
                {children}
            </div>
        </>
    )
}

Page.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ]).isRequired
}

export default Page