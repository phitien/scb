import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import modalReducer from 'common/reducers/ModalReducer'

const AppStoreReducers = combineReducers({
    modal: modalReducer,
})

const AppStore = createStore(
    AppStoreReducers,
    applyMiddleware(thunk)
)

const dispatch = AppStore.dispatch

export {
    AppStore,
    dispatch
}
