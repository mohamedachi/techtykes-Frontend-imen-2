import paymentSuccessActions from './types/paymentSuccess'


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
        case paymentSuccessActions.PAYMENT_SUCCESS_START: return {
            ...state,
            loading: true
        }
        case paymentSuccessActions.PAYMENT_SUCCESS_SUCCESS: return {
            ...state,
            loading: false,
            current: action.payload,
            error: ''
        }
        case paymentSuccessActions.PAYMENT_SUCCESS_ERROR: return {
            ...state,
            loading: false,
            data: [],
            error: action.payload
        }
        default: return state
    }
}

export default quizReducer