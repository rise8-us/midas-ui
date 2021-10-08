import { Grid } from '@material-ui/core'
import { CapabilitiesSidebar } from 'Components/Cards'
import { Page } from 'Components/Page'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { requestSearchCapabilities } from 'Redux/Capabilities/actions'

function Capabilities() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestSearchCapabilities())
    }, [])

    return (
        <Page>
            <div style = {{ margin: '24px' }}>
                <Grid container spacing = {3} >
                    <Grid item xs = {12} sm = {12} md = {5} lg = {3} xl = {3}>
                        <CapabilitiesSidebar />
                    </Grid>
                    <Grid item>
                    </Grid>
                </Grid>
            </div>
        </Page>
    )
}

export default Capabilities