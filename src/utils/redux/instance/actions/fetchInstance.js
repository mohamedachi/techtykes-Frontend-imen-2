import actions from '../types/fetchInstance';
import axiosInstance, { isAxiosError} from '../../api';


export const fetchInstanceStart = ()  => ({
        type: actions.FETCH_INSTANCE_START,
        payload: null
    })

export const fetchInstanceSuccess = (instance) => ({
        type: actions.FETCH_INSTANCE_SUCCESS,
        payload: instance
    })

export const fetchInstanceError = (error) => ({
        type: actions.FETCH_INSTANCE_ERROR,
        payload: error
    })

export const fetchInstance = (id) => async (dispatch) => {
        dispatch(fetchInstanceStart())
        try {
            const response = await axiosInstance.get(`/api/instance/${id}`,{})
            const instance = response.data
            dispatch(fetchInstanceSuccess(instance))
        } catch (error) {
            if (isAxiosError(error)) {
                // Axios error (HTTP error)
                const axiosError = error;
                const httpError = axiosError.response?.data || { status: 500, message: 'Network error' };
                dispatch(fetchInstanceError(httpError))
            } else {
            // Non-Axios error (e.g., network error)
                const err  = {
                    message: "Unknown Error",
                    status: 500
                }
                dispatch(fetchInstanceError(err))
            }
        }
    }