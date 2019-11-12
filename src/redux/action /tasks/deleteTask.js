import API from '../../../services'
import { setHeaders, getHeaders } from '../../../util/headers'
import { notification } from 'antd';

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

           notification.success({
            message: 'Tarefa Deletada',
            description:
              '',
            style: {
              width: 600,
              marginLeft: 335 - 600,
            },
          });
           
       } catch (err) {
        
           const errorMessage = 'error'

           console.warn(errorMessage)
           setHeaders(err.response.headers)
           dispatch({
               type: TASKS_DELETE_FAILED,
               payload: errorMessage
           })

       }
    }
}