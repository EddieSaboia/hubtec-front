import API from '../../../services'
import { setHeaders } from '../../../util/headers'

import { 
    REGISTER,
    REGISTER_FAILED,
    REGISTER_SUCCESS} 
    from '../../actiontypes'

export default (email, password, password_confirmation) =>{
    return async (dispatch) =>{
        try {

            dispatch({type: REGISTER})

            const body = {
                email: email,
                password: password,
                password_confirmation: password_confirmation
            }
            
            const response = await API.post(`/auth`, body)
            setHeaders(response.headers)

            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data
            })

        } catch (error) {
            const errorMessage = {error}

            console.warn(errorMessage)
            
            dispatch({
                type: REGISTER_FAILED,
                payload: errorMessage
            })
        }
    }
}