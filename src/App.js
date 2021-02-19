import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Banner } from './Components/Banner'
import { Account, Home, PageNotFound, Admin } from './Components/Pages'
import { getUserLoggedIn } from './Redux/Auth/selectors'
import { requestFetchInitInfo, requestFetchInitUser } from './Redux/Info/actions'

function App() {
    const dispatch = useDispatch()

    const user = useSelector((state) => getUserLoggedIn(state))

    useEffect(() => {
        async function initializeApp() {
            dispatch(requestFetchInitUser())
            dispatch(requestFetchInitInfo())
        }
        initializeApp()
    }, [])

    return (
        <Banner>
            <Switch>
                {/* unsecured Routes */}
                <Route exact path = '/'>
                    <Redirect to = '/home'/>
                </Route>
                <Route exact path = '/home' component = {Home} />
                <Route exact path = '/account' component = {Account} />
                {user.isAdmin && <Route exact path = '/admin' component = {Admin} />}
                <Route component = {PageNotFound} />
            </Switch>
        </Banner>
    )
}

export default App
