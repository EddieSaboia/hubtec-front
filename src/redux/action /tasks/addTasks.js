import API from '../../../services'
import { setHeaders, getHeaders } from '../../../util/headers'
import { notification } from 'antd';

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

           notification.success({
            message: 'Tarefa Adicionada',
            description:
              '',
            style: {
              width: 600,
              marginLeft: 335 - 600,
            },
          });
       } catch (err) {
        
           const errorMessage = 'error'

           setHeaders(err.response.headers)
           notification.error({
            message: 'Tarefa Não pode ser Cadastrada',
            description: err.response.data[0],
            style: {
              width: 600,
              marginLeft: 335 - 600,
            },
          });
           dispatch({
               type: TASKS_CREATE_FAILED,
               payload: err.response.data[0]
           })

       }
    }
}