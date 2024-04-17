import fetchPlansActions from './types/fetchPlans'
import fetchPlanActions from './types/fetchPlan'

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
        case fetchPlansActions.FETCH_PLANS_START: return {
            ...state,
            loading: true
        }
        case fetchPlansActions.FETCH_PLANS_SUCCESS: return {
            ...state,
            loading: false,
            data: action.payload,
            error: ''
        }
        case fetchPlansActions.FETCH_PLANS_ERROR: return {
            ...state,
            loading: false,
            data: [],
            error: action.payload
        }

        case fetchPlanActions.FETCH_PLAN_START: return {
            ...state,
            loading: true
        }
        case fetchPlanActions.FETCH_PLAN_SUCCESS: return {
            ...state,
            loading: false,
            current: action.payload,
            error: ''
        }
        case fetchPlanActions.FETCH_PLAN_ERROR: return {
            ...state,
            loading: false,
            data: [],
            error: action.payload
        }

        default: return state
    }
}

export default quizReducer