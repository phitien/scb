import React from 'react'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import UserProfileApplication from 'apps/user_profile/App'
import UserProfileRoutes from 'apps/user_profile/Routes'

const app = new UserProfileApplication
/**
 * Set your redux store here
 */
app.store = createStore(
    applyMiddleware(
        thunk
    )
)
app.routes = UserProfileRoutes
