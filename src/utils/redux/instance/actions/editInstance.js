import actions from '../types/editInstance';
import axiosInstance, { isAxiosError} from '../../api';


export const editInstanceStart = ()  => ({
        type: actions.EDIT_INSTANCE_START,
        payload: null
    })

export const editInstanceSuccess = (instance) => ({
        type: actions.EDIT_INSTANCE_SUCCESS,
        payload: instance
    })

export const editInstanceError = (error) => ({
        type: actions.EDIT_INSTANCE_ERROR,
        payload: error
    })

export const editInstance = (id,data) => async (dispatch) => {
    dispatch(editInstanceStart())
    data.success_url = window.location.origin + "/payment/success"
    data.cancel_url = window.location.origin + "/payment/cancel"
    try {
        const response = await axiosInstance.put(`/api/instance/${id}`, data)
        await axiosInstance.delete(`/${response.data.token}/restart`)
        const instance = response.data
        dispatch(editInstanceSuccess(instance))
    } catch (error) {
        if (isAxiosError(error)) {
            // Axios error (HTTP error)
            const axiosError = error;
            const httpError = axiosError.response?.data || { status: 500, message: 'Network error' };
            dispatch(editInstanceError(httpError))
        } else {
        // Non-Axios error (e.g., network error)
            const err  = {
                message: "Unknown Error",
                status: 500
            }
            dispatch(editInstanceError(err))
        }
    }
}