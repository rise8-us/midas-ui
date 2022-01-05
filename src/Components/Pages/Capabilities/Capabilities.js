import { Grid } from '@mui/material'
import { CapabilitiesView } from 'Components/CapabilitiesView'
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
            <Grid container margin = {3}>
                <Grid item xs = {12} md = {3} lg = {3}>
                    <CapabilitiesSidebar />
                </Grid>
                <Grid>
                    <CapabilitiesView />
                </Grid>
            </Grid>
        </Page>
    )
}

export default Capabilities