import API from '../../../services'
import { setHeaders, getHeaders } from '../../../util/headers'

import { 
    TASKS_CREATE,
    TASKS_CREATE_FAILED,
    TASKS_CREATE_SUCCESS
 } from '../../actiontypes'

 export default (body) => {
    return async (dispatch) => {
       try {

           dispatch({type: TASKS_CREATE})
           console.log(body)
           const headers = getHeaders();
           
            const response = await API.post(`/api/v1/tasks`, body, {headers: headers})
            setHeaders(response.headers)

           dispatch({
               type: TASKS_CREATE_SUCCESS,
               payload: response.data
           })

       } catch (err) {
        
           const errorMessage = 'error'

           console.warn(errorMessage)
           
           dispatch({
               type: TASKS_CREATE_FAILED,
               payload: errorMessage
           })

       }
    }
}