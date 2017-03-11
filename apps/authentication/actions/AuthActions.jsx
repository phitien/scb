import AppDispatcher from 'common/dispatchers/AppDispatcher'
import {OPEN_LOGIN_POPUP,LOGIN,LOGIN_FAIL,LOGOUT,LOGOUT_USER,SAVE_MAPPING,ACTIVATE_ACCOUNT,SIGNUP_SUCCESS,RELOAD_USER_DATA,UPDATE_USER_PROFILE_PIC,CHANGE_PASSWORD,SAVE_PROFILE} from '../constants/AuthConstants'

const openLoginPopup = href => AppDispatcher.dispatch({actionType: OPEN_LOGIN_POPUP, redirectUrl: href})

const saveUserProfile = profile => AppDispatcher.dispatch({actionType: SAVE_PROFILE, profile: profile})

const login = (userInfo, source) => AppDispatcher.dispatch({actionType: LOGIN, userInfo})

const reloadUserProfile = userInfo => AppDispatcher.dispatch({actionType: RELOAD_USER_DATA, userInfo})

const updateUserProfilePic = userInfo => AppDispatcher.dispatch({actionType: UPDATE_USER_PROFILE_PIC, userInfo})

const activateAccount = userInfo => AppDispatcher.dispatch({actionType: ACTIVATE_ACCOUNT, userInfo})

const changePassword = () => AppDispatcher.dispatch({actionType: CHANGE_PASSWORD})

const logoutUser = () => AppDispatcher.dispatch({actionType: LOGOUT_USER})

const loginFail = error => AppDispatcher.dispatch({actionType: LOGIN_FAIL, error})

const saveMappings = mappings => AppDispatcher.dispatch({actionType: SAVE_MAPPING, mappings})

const signupSuccess = (userInfo, source) => AppDispatcher.dispatch({actionType: SIGNUP_SUCCESS, userInfo})

export { openLoginPopup, login, logoutUser, reloadUserProfile, updateUserProfilePic, activateAccount, changePassword, loginFail, saveMappings, signupSuccess, saveUserProfile }
