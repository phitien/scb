import './sass/styles.scss'

import React from 'react'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import ScannerApplication from './App'
import ScannerRoutes from './Routes'

const app = new ScannerApplication
/**
 * Set your redux store here
 */
app.store = createStore(
    applyMiddleware(
        thunk
    )
)
app.routes = ScannerRoutes
