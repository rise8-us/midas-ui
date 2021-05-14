import { combineReducers } from 'redux'
import appSettingsReducer from './AppSettings/reducer'
import assertionReducer from './Assertions/reducer'
import authReducer from './Auth/reducer'
import commentReducer from './Comments/reducer'
import errorReducer from './Errors/reducer'
import modifiedAssertionsReducer from './ModifiedAssertions/reducer'
import popupReducer from './Popups/reducer'
import productReducer from './Products/reducer'
import projectReducer from './Projects/reducer'
import tagReducer from './Tags/reducer'
import teamReducer from './Teams/reducer'
import userReducer from './Users/reducer'

export const rootReducer = combineReducers({
    app: appSettingsReducer,
    auth: authReducer,
    comments: commentReducer,
    errors: errorReducer,
    popups: popupReducer,
    products: productReducer,
    projects: projectReducer,
    tags: tagReducer,
    teams: teamReducer,
    users: userReducer,
    assertions: assertionReducer,
    modifiedAssertions: modifiedAssertionsReducer
})
