import React, { useEffect } from 'react'
import { fireEvent, render, screen } from 'Utilities/test-utils'
import { SnackbarProvider, useSnackbar } from './index'

describe('<SnackbarProvider />', () => {

    test('should render alert', () => {
        render(<SnackbarProvider><MockComponent/></SnackbarProvider>)

        expect(screen.getByText('Hello World')).toBeInTheDocument()
        expect(screen.getByText('Lost connection to server!')).toBeInTheDocument()
    })

    test('should close alert', () => {
        render(<SnackbarProvider><MockComponent/></SnackbarProvider>)

        fireEvent.click(screen.getByTestId('CancelOutlinedIcon'))

        expect(screen.queryByText('Lost connection to server!')).not.toBeInTheDocument()
    })
})

const MockComponent = () => {

    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        enqueueSnackbar({ message: 'Lost connection to server!', severity: 'error', persist: true })
    }, [])

    return (<>Hello World</>)
}