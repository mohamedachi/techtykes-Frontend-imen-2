import actions from '../types/paymentSuccess';
import axiosPlan, { isAxiosError} from '../../api';


export const paymentSuccessStart = ()  => ({
        type: actions.PAYMENT_SUCCESS_START,
        payload: null
    })

export const paymentSuccessSuccess = (plans) => ({
        type: actions.PAYMENT_SUCCESS_SUCCESS,
        payload: plans
    })

export const paymentSuccessError = (error) => ({
        type: actions.PAYMENT_SUCCESS_ERROR,
        payload: error
    })

export const paymentSuccess = (id) => async (dispatch) => {
        dispatch(paymentSuccessStart())
        try {
            const response = await axiosPlan.get(`/api/payment/success/${id}`,{})
            const plans = response.data
            dispatch(paymentSuccessSuccess(plans))
        } catch (error) {
            if (isAxiosError(error)) {
                // Axios error (HTTP error)
                const axiosError = error;
                const httpError = axiosError.response?.data || { status: 500, message: 'Network error' };
                dispatch(paymentSuccessError(httpError))
            } else {
            // Non-Axios error (e.g., network error)
                const err  = {
                    message: "Unknown Error",
                    status: 500
                }
                dispatch(paymentSuccessError(err))
            }
        }
    }