import API from '../../../services'
import { setHeaders, getHeaders } from '../../../util/headers'

import { 
    TASKS_DELETE,
    TASKS_DELETE_FAILED,
    TASKS_DELETE_SUCCESS
 } from '../../actiontypes'



 export default (id, status) => {
    return async (dispatch) => {
       try {

           dispatch({type: TASKS_DELETE})
           const headers = getHeaders();

           const response = await API.delete(`/api/v1/tasks/${id}`, {headers: headers})
           setHeaders(response.headers)

           dispatch({
               type: TASKS_DELETE_SUCCESS,
               payload: {
                    status,
                    id
                }
           })

       } catch (err) {
        
           const errorMessage = 'error'

           console.warn(errorMessage)
           
           dispatch({
               type: TASKS_DELETE_FAILED,
               payload: errorMessage
           })

       }
    }
}