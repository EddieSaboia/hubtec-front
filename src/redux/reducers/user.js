import {
    AUTHENTICATE,
    AUTHENTICATE_FAILED,
    AUTHENTICATE_SUCCESS,
    REGISTER,
    REGISTER_FAILED,
    REGISTER_SUCCESS,
    LOGOUT,
    LOGOUT_FAILED,
    LOGOUT_SUCCESS
} from '../actiontypes'


const user = {
    userIsAuthenticating: false,
    authenticated: false,
    error: ''
}

export default function (state = user, action) {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                ...state,
                userIsAuthenticating: true,
                authenticade: false,
            }
        case AUTHENTICATE_FAILED:
            return {
                ...state,
                userIsAuthenticating: false,
                authenticade: false,
                error: action.payload
            }
        case AUTHENTICATE_SUCCESS:
            return {
                ...state,
                userIsAuthenticating: false,
                authenticated: true,
                error: ''
            }
        case REGISTER:
            return {
                ...state,
                userIsRegister: true,
                registed: false,
            }
        case REGISTER_FAILED:
            return {
                ...state,
                userIsRegister: false,
                registed: false,
                error: action.payload
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                userIsRegister: false,
                registed: true,
                error: ''
            }
        case LOGOUT:
            return {
                ...state,
                userIsLogout: true,
                authenticated: false,
            }
        case LOGOUT_FAILED:
            return {
                ...state,
                userIsLogout: false,
                authenticated: true,
                error: action.payload
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                userIsLogout: false,
                authenticated: false,
                error: ''
            }
        default:
            return state;
    }
} 