import { createAction } from '@reduxjs/toolkit'
import Constants from './constants'

export const openPopup = createAction(
    Constants.OPEN_POPUP,
    (name, componentName, props) => {
        return {
            payload: {
                open: true,
                name,
                componentName,
                props
            }
        }
    }
)

export const closePopup = createAction(
    Constants.CLOSE_POPUP,
    (name) => {
        return {
            payload: {
                name,
                open: false,
                componentName: '',
                props: { }
            }
        }
    }
)
