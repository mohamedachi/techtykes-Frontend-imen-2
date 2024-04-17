import actions from '../types/fetchInstances';
import axiosInstance, { isAxiosError} from '../../api';


export const fetchInstancesStart = ()  => ({
        type: actions.FETCH_INSTANCES_START,
        payload: null
    })

export const fetchInstancesSuccess = (instances) => ({
        type: actions.FETCH_INSTANCES_SUCCESS,
        payload: instances
    })

export const fetchInstancesError = (error) => ({
        type: actions.FETCH_INSTANCES_ERROR,
        payload: error
    })

export const fetchInstances = () => async (dispatch) => {
        dispatch(fetchInstancesStart())
        try {
            const response = await axiosInstance.get(`/api/instance`,{})
            const instances = response.data
            dispatch(fetchInstancesSuccess(instances))
        } catch (error) {
            if (isAxiosError(error)) {
                // Axios error (HTTP error)
                const axiosError = error;
                const httpError = axiosError.response?.data || { status: 500, message: 'Network error' };
                dispatch(fetchInstancesError(httpError))
            } else {
            // Non-Axios error (e.g., network error)
                const err  = {
                    message: "Unknown Error",
                    status: 500
                }
                dispatch(fetchInstancesError(err))
            }
        }
    }