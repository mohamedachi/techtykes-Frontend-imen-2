import actions from '../types/signin';
import axiosInstance, { isAxiosError} from '../../api';


export const signinStart = () => ({
        type: actions.SIGNIN_START,
        payload: null
    })

export const signinSuccess = (user) => ({
        type: actions.SIGNIN_SUCCESS,
        payload: user
    })

export const signinError = (error) => ({
        type: actions.SIGNIN_ERROR,
        payload: error
    })

export const signin = (credentials) => async (dispatch) => {
        dispatch(signinStart())
    try {
            console.log("credentials", credentials)
            const response = await axiosInstance.post(`/api/user/signin`,credentials)
            const user = response.data
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', user.token)
            dispatch(signinSuccess(user))
        } catch (error) {
            if (isAxiosError(error)) {
                // Axios error (HTTP error)
                const axiosError = error;
                const httpError = axiosError.response?.data || { status: 500, message: 'Unknown error' };
                dispatch(signinError(httpError))
            } else {
            // Non-Axios error (e.g., network error)
                const err  = {
                    message: "Network Error",
                    status: 500
                }
                dispatch(signinError(err))
            }
        }
    }