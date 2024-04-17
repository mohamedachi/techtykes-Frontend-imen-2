import actions from '../types/fetchProfile';
import axiosPlan, { isAxiosError} from '../../api';


export const fetchProfileStart = ()  => ({
        type: actions.FETCH_PROFILE_START,
        payload: null
    })

export const fetchProfileSuccess = (profile) => ({
        type: actions.FETCH_PROFILE_SUCCESS,
        payload: profile
    })

export const fetchProfileError = (error) => ({
        type: actions.FETCH_PROFILE_ERROR,
        payload: error
    })

export const fetchProfile = () => async (dispatch) => {
        dispatch(fetchProfileStart())
        try {
            const response = await axiosPlan.get(`/api/profile`,{})
            const profile = response.data
            dispatch(fetchProfileSuccess(profile))
        } catch (error) {
            if (isAxiosError(error)) {
                // Axios error (HTTP error)
                const axiosError = error;
                const httpError = axiosError.response?.data || { status: 500, message: 'Network error' };
                if (httpError.status === 401) {
                    // Unauthorized
                    localStorage.removeItem('user')
                    localStorage.removeItem('token')
                }
                dispatch(fetchProfileError(httpError))
            } else {
            // Non-Axios error (e.g., network error)
                const err  = {
                    message: "Unknown Error",
                    status: 500
                }
                dispatch(fetchProfileError(err))
            }
        }
    }