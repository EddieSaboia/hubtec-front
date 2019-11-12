import {
    TASKS_GET_ALL,
    TASKS_GET_ALL_FAILED,
    TASKS_GET_ALL_SUCCESS,
    TASKS_CREATE,
    TASKS_CREATE_FAILED,
    TASKS_CREATE_SUCCESS,
    TASKS_EDIT,
    TASKS_EDIT_FAILED,
    TASKS_EDIT_SUCCESS,
    TASKS_DELETE,
    TASKS_DELETE_FAILED,
    TASKS_DELETE_SUCCESS,
    TASKS_MOVE
} from '../actiontypes'

const task = {
    to_do: [],
    doing: [],
    done: [],
    error: ''
}

export default function (state = task, action) {
    switch (action.type) {
        case TASKS_GET_ALL:
            return {
                ...state,
                error: ''
            }
        case TASKS_GET_ALL_FAILED:
            return {
                ...state,
                error: action.payload
            }
        case TASKS_GET_ALL_SUCCESS:
            return {
                ...state,
                to_do: action.payload.to_do,
                doing: action.payload.doing,
                done: action.payload.done,
                error: ''
            }
        case TASKS_CREATE:
            return {
                ...state,
                error: ''
            }
        case TASKS_CREATE_FAILED:
            return {
                ...state,
                error: action.payload
            }
        case TASKS_CREATE_SUCCESS:
            return {
                ...state,
                [action.payload.status]: [
                    ...state[action.payload.status],
                    action.payload
                ],
                error: ''
            }
        case TASKS_EDIT:
            return {
                ...state,
                error: ''
            }
        case TASKS_EDIT_FAILED:
            return {
                ...state,
                error: action.payload
            }
        case TASKS_EDIT_SUCCESS:
            const tasks = state[action.payload.status].filter(t => t.id != action.payload.data.id)
            return {
                ...state,
                [action.payload.status]: [
                    ...tasks,
                    action.payload.data
                ],
                error: ''
            }
        case TASKS_MOVE:
            const tasksMove = state[action.payload.status].filter(t => t.id != action.payload.data.id)
            const taskStatusOld = state[action.payload.oldStatus].filter(t => t.id != action.payload.data.id)
            return {
                ...state,
                [action.payload.status]: [
                    ...tasksMove,
                    action.payload.data
                ],
                [action.payload.oldStatus]: taskStatusOld,
                error: ''
                
            }
        case TASKS_DELETE:
            return {
                ...state
            }
        case TASKS_DELETE_FAILED:
            return {
                ...state,
                error: action.payload
            }
        case TASKS_DELETE_SUCCESS:
            const tasksDeleted = state[action.payload.status].filter(t => t.id != action.payload.id)
            return {
                ...state,
                [action.payload.status]: [
                    ...tasksDeleted,
                ]
            }
        default:
            return state;
    }
}