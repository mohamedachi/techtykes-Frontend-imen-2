import fetchInstancesActions from './types/fetchInstances'
import fetchInstanceActions from './types/fetchInstance'
import addInstanceActions from './types/addInstance'
import editInstanceActions from './types/editInstance'
import deleteInstanceActions from './types/deleteInstance'


const initialState = {
    loading: false,
    data: [],
    current : null,
    error: {
        message: '',
        status: 0
    }
}


const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        case fetchInstancesActions.FETCH_INSTANCES_START: return {
            ...state,
            loading: true
        }
        case fetchInstancesActions.FETCH_INSTANCES_SUCCESS: return {
            ...state,
            loading: false,
            data: action.payload,
            current: null,
            error: ''
        }
        case fetchInstancesActions.FETCH_INSTANCES_ERROR: return {
            ...state,
            loading: false,
            data: [],
            current: null,
            error: action.payload
        }

        case fetchInstanceActions.FETCH_INSTANCE_START: return {
            ...state,
            loading: true
        }
        case fetchInstanceActions.FETCH_INSTANCE_SUCCESS: return {
            ...state,
            loading: false,
            current: action.payload,
            error: ''
        }
        case fetchInstanceActions.FETCH_INSTANCE_ERROR: return {
            ...state,
            loading: false,
            current: null,
            error: action.payload
        }

        case addInstanceActions.ADD_INSTANCE_START: return {
            ...state,
            loading: true
        }
        case addInstanceActions.ADD_INSTANCE_SUCCESS: return {
            ...state,
            loading: false,
            current: action.payload,
            error: ''
        }
        case addInstanceActions.ADD_INSTANCE_ERROR: return {
            ...state,
            loading: false,
            current: null,
            error: action.payload
        }

        case editInstanceActions.EDIT_INSTANCE_START: return {
            ...state,
            loading: true
        }
        case editInstanceActions.EDIT_INSTANCE_SUCCESS: return {
            ...state,
            loading: false,
            current: null,
            error: ''
        }
        case editInstanceActions.EDIT_INSTANCE_ERROR: return {
            ...state,
            loading: false,
            current: null,
            error: action.payload
        }

        case deleteInstanceActions.DELETE_INSTANCE_START: return {
            ...state,
            loading: true
        }
        case deleteInstanceActions.DELETE_INSTANCE_SUCCESS: return {
            ...state,
            loading: false,
            current: null,
            error: ''
        }
        case deleteInstanceActions.DELETE_INSTANCE_ERROR: return {
            ...state,
            loading: false,
            current: null,
            error: action.payload
        }

        default: return state
    }
}

export default quizReducer