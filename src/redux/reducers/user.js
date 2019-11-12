import {
    AUTHENTICATE,
    AUTHENTICATE_FAILED,
    AUTHENTICATE_SUCCESS,
    REGISTER,
    REGISTER_FAILED,
    REGISTER_SUCCESS,
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
                userIsAuthenticating: true,
                authenticade: false,
            }
        case REGISTER_FAILED:
            return {
                ...state,
                userIsAuthenticating: false,
                authenticade: false,
                error: action.payload
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                userIsAuthenticating: false,
                authenticated: true,
                error: ''
            }
        default:
            return state;
    }
} 