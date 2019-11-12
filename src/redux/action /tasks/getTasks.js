import API from '../../../services'
import { setHeaders, getHeaders } from '../../../util/headers'

import { 
    TASKS_GET_ALL,
    TASKS_GET_ALL_FAILED,
    TASKS_GET_ALL_SUCCESS
 } from '../../actiontypes'

 export default () => {
     return async (dispatch) => {
        try {

            dispatch({type: TASKS_GET_ALL})
            console.log("OLHA EU AQUI CARAI")
            const headers = getHeaders();
            console.warn(headers)

            const response = await API.get(`/api/v1/tasks`, { headers: headers})
            console.warn(response)
            setHeaders(response.headers)

            dispatch({
                type: TASKS_GET_ALL_SUCCESS,
                payload: response.data
            })

        } catch (err) {
         
            const errorMessage = 'error'

            console.warn(errorMessage)
            
            dispatch({
                type: TASKS_GET_ALL_FAILED,
                payload: errorMessage
            })

        }
     }
 }