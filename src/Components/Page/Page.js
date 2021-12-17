import { AppBar } from 'Components/AppBar'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setPageScrollY } from 'Redux/AppSettings/reducer'
import { scrollbar, styled } from 'Styles/materialThemes'

const DivStyled = styled('div')(({ theme }) => ({
    ...scrollbar(theme),
    position: 'fixed',
    top: '68px',
    paddingBottom: '24px',
    overflowY: 'scroll',
    overflowX: 'hidden',
    height: 'calc(100vh - 88px)',
    width: '100vw',
    scrollBehavior: 'smooth'
}))

function Page({ children }) {

    const dispatch = useDispatch()

    const onScroll = (e) => dispatch(setPageScrollY(e.target.scrollTop))

    return (
        <>
            <AppBar />
            <DivStyled onScroll = {onScroll} data-testid = 'Page__div'>
                {children}
            </DivStyled>
        </>
    )
}

Page.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired
}

export default Page
