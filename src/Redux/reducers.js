import { combineReducers } from 'redux'
import appSettingsReducer from './AppSettings/reducer'
import authReducer from './Auth/reducer'
import errorReducer from './Errors/reducer'
import infoReducer from './Info/reducer'
import userReducer from './Users/reducer'

export const rootReducer = combineReducers({
    app: appSettingsReducer,
    auth: authReducer,
    errors: errorReducer,
    info: infoReducer,
    users: userReducer
})
