import { combineReducers } from 'redux'
import appSettingsReducer from './AppSettings/reducer'
import assertionReducer from './Assertions/reducer'
import authReducer from './Auth/reducer'
import commentReducer from './Comments/reducer'
import errorReducer from './Errors/reducer'
import filterReducer from './Filters/reducer'
import gitlabConfigReducer from './GitlabConfigs/reducer'
import modifiedAssertionsReducer from './ModifiedAssertions/reducer'
import popupReducer from './Popups/reducer'
import productReducer from './Products/reducer'
import projectReducer from './Projects/reducer'
import tagReducer from './Tags/reducer'
import teamReducer from './Teams/reducer'
import userReducer from './Users/reducer'

export const rootReducer = combineReducers({
    app: appSettingsReducer,
    assertions: assertionReducer,
    auth: authReducer,
    comments: commentReducer,
    errors: errorReducer,
    filters: filterReducer,
    gitlabConfigs: gitlabConfigReducer,
    modifiedAssertions: modifiedAssertionsReducer,
    popups: popupReducer,
    products: productReducer,
    projects: projectReducer,
    tags: tagReducer,
    teams: teamReducer,
    users: userReducer
})
