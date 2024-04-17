import actions from '../types/deleteInstance';
import axiosInstance, { isAxiosError} from '../../api';


export const deleteInstanceStart = ()  => ({
        type: actions.DELETE_INSTANCE_START,
        payload: null
    })

export const deleteInstanceSuccess = (instance) => ({
        type: actions.DELETE_INSTANCE_SUCCESS,
        payload: instance
    })

export const deleteInstanceError = (error) => ({
        type: actions.DELETE_INSTANCE_ERROR,
        payload: error
    })

export const deleteInstance = (id) => async (dispatch) => {
    dispatch(deleteInstanceStart())
    try {
        const response = await axiosInstance.delete(`/api/instance/${id}`)
        await axiosInstance.delete(`/${response.data.token}/restart`)
        const instance = response.data
        dispatch(deleteInstanceSuccess(instance))
    } catch (error) {
        if (isAxiosError(error)) {
            // Axios error (HTTP error)
            const axiosError = error;
            const httpError = axiosError.response?.data || { status: 500, message: 'Network error' };
            dispatch(deleteInstanceError(httpError))
        } else {
        // Non-Axios error (e.g., network error)
            const err  = {
                message: "Unknown Error",
                status: 500
            }
            dispatch(deleteInstanceError(err))
        }
    }
}