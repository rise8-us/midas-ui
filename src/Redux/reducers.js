import { combineReducers } from 'redux'
import appSettingsReducer from './AppSettings/reducer'
import authReducer from './Auth/reducer'
import errorReducer from './Errors/reducer'
import infoReducer from './Info/reducer'
import popupReducer from './Popups/reducer'
import productReducer from './Products/reducer'
import teamReducer from './Teams/reducer'
import userReducer from './Users/reducer'

export const rootReducer = combineReducers({
    app: appSettingsReducer,
    auth: authReducer,
    errors: errorReducer,
    info: infoReducer,
    popups: popupReducer,
    teams: teamReducer,
    users: userReducer,
    products: productReducer
})
