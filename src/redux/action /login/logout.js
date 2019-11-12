import API from '../../../services'

import { 
    LOGOUT,
    LOGOUT_FAILED,
    LOGOUT_SUCCESS} 
    from '../../actiontypes'
import { getHeaders } from '../../../util/headers'

export default () =>{
    return async (dispatch) =>{
        try {

            dispatch({type: LOGOUT})
            
            const headers = getHeaders();
            const response = await API.delete(`/auth/sign_out`, { headers: headers})
            
            localStorage.clear();

            dispatch({
                type: LOGOUT_SUCCESS,
            })

        } catch (error) {
            const errorMessage = {error}

            alert(errorMessage.error.response.data.errors[0])
            
            dispatch({
                type: LOGOUT_FAILED,
                payload: errorMessage
            })
        }
    }
}