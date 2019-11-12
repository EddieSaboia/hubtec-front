import API from '../../../services'
import { setHeaders } from '../../../util/headers'

import { 
    AUTHENTICATE,
    AUTHENTICATE_FAILED,
    AUTHENTICATE_SUCCESS} 
    from '../../actiontypes'
import { Alert } from 'antd'

export default (email, password) =>{
    return async (dispatch) =>{
        try {

            dispatch({type: AUTHENTICATE})

            const body = {
                email: email,
                password: password
            }
            
            const response = await API.post(`/auth/sign_in`, body)
            setHeaders(response.headers)

            dispatch({
                type: AUTHENTICATE_SUCCESS,
                payload: response.data
            })

        } catch (error) {
            const errorMessage = {error}

            alert(errorMessage.error.response.data.errors[0])
            
            dispatch({
                type: AUTHENTICATE_FAILED,
                payload: errorMessage
            })
        }
    }
}