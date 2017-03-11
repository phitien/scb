const LOGIN_MODAL = 'LOGIN_MODAL'
const SIGNUP_MODAL = 'SIGNUP_MODAL'
const FORGET_PASSWORD_MODAL = 'FORGET_PASSWORD_MODAL'
const CHANGE_PASSWORD_MODAL = 'CHANGE_PASSWORD_MODAL'

const modalReducer = (state = {
    modalList: [],
    data: undefined
}, action) => {
    switch (action.type) {
        case 'ADD_MODAL':
            let modalList = state.modalList
            modalList.push(action.modal)
            return {
                modalList,
                data: action.data
            }
        case 'REMOVE_MODAL':
            modalList = state.modalList
            modalList.pop()
            return {
                modalList,
                data: undefined
            }
        default:
            return state
    }
}

export default modalReducer
