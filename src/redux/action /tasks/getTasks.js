import API from '../../../services'
import { setHeaders, getHeaders } from '../../../util/headers'
import { notification } from 'antd';

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

            const response = await API.get(`/api/v1/tasks`, { headers: headers})
            console.error(response)
            setHeaders(response.headers)

            dispatch({
                type: TASKS_GET_ALL_SUCCESS,
                payload: response.data
            })
            notification.success({
                message: 'Tarefas Carregadas',
                description:
                  '',
                style: {
                  width: 600,
                  marginLeft: 335 - 600,
                },
              });
        } catch (err) {
         

            setHeaders(err.response.headers)

            notification.error({
                message: 'Tarefas Não Carregadas',
                description: err.response.data.errors[0],
                style: {
                  width: 600,
                  marginLeft: 335 - 600,
                },
              });
            dispatch({
                type: TASKS_GET_ALL_FAILED,
                payload: err.response.data.errors[0]
            })

        }
     }
 }