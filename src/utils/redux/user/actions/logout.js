import actions from '../types/logout';
import axiosInstance, { isAxiosError} from '../../api';


export const logoutStart = () => ({
        type: actions.LOGOUT_START,
        payload: null
    })

export const logoutSuccess = (user) => ({
        type: actions.LOGOUT_SUCCESS,
        payload: user
    })

export const logoutError = (error) => ({
        type: actions.LOGOUT_ERROR,
        payload: error
    })

export const logout = () => async (dispatch) => {
        dispatch(logoutStart())
    try {
            const user = null
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer `;
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            dispatch(logoutSuccess(user))
        } catch (error) {
            if (isAxiosError(error)) {
                // Axios error (HTTP error)
                const axiosError = error;
                const httpError = axiosError.response?.data || { status: 500, message: 'Unknown error' };
                dispatch(logoutError(httpError))
            } else {
            // Non-Axios error (e.g., network error)
                const err  = {
                    message: "Network Error",
                    status: 500
                }
                dispatch(logoutError(err))
            }
        }
    }