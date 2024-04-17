import actions from '../types/addInstance';
import axiosInstance, { isAxiosError} from '../../api';


export const addInstanceStart = ()  => ({
        type: actions.ADD_INSTANCE_START,
        payload: null
    })

export const addInstanceSuccess = (instance) => ({
        type: actions.ADD_INSTANCE_SUCCESS,
        payload: instance
    })

export const addInstanceError = (error) => ({
        type: actions.ADD_INSTANCE_ERROR,
        payload: error
    })

export const addInstance = (data) => async (dispatch) => {
    dispatch(addInstanceStart())
    data.success_url = window.location.origin + "/payment/success"
    data.cancel_url = window.location.origin + "/payment/cancel"
    try {
        const response = await axiosInstance.post(`/api/payment/`,data)
        const instance = response.data
        dispatch(addInstanceSuccess(instance))
    } catch (error) {
        if (isAxiosError(error)) {
            // Axios error (HTTP error)
            const axiosError = error;
            const httpError = axiosError.response?.data || { status: 500, message: 'Network error' };
            dispatch(addInstanceError(httpError))
        } else {
        // Non-Axios error (e.g., network error)
            const err  = {
                message: "Unknown Error",
                status: 500
            }
            dispatch(addInstanceError(err))
        }
    }
}