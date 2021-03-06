import API from '../../../services'
import { setHeaders, getHeaders } from '../../../util/headers'
import { notification } from 'antd';

import {
    TASKS_EDIT,
    TASKS_EDIT_FAILED,
    TASKS_EDIT_SUCCESS,
    TASKS_MOVE
} from '../../actiontypes'



export default (id, status, body, oldStatus = null) => {
    return async (dispatch) => {
        try {
            
            dispatch({ type: TASKS_EDIT })
            const headers = getHeaders();

            const response = await API.put(`/api/v1/tasks/${id}`, body, { headers: headers})
            setHeaders(response.headers)

            if (oldStatus != null) {
                dispatch({
                    type: TASKS_MOVE,
                    payload: {
                        status,
                        oldStatus,
                        data: response.data
                    }
                })
                notification.success({
                    message: 'Tarefa Editada',
                    description:
                      '',
                    style: {
                      width: 600,
                      marginLeft: 335 - 600,
                    },
                  });
            }else{
                dispatch({
                    type: TASKS_EDIT_SUCCESS,
                    payload: {
                        status,
                        data: response.data
                    }
                })
            }
        

        } catch (err) {

            const errorMessage = 'error'

            console.warn(errorMessage)
            setHeaders(err.response.headers)
            dispatch({
                type: TASKS_EDIT_FAILED,
                payload: errorMessage
            })

        }
    }
}