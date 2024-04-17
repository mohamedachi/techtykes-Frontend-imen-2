import actions from '../types/signup'
import axiosInstance, { isAxiosError } from '../../api'

export const signupStart = () => ({
  type: actions.SIGNUP_START,
  payload: null,
})

export const signupSuccess = (user) => ({
  type: actions.SIGNUP_SUCCESS,
  payload: user,
})

export const signupError = (error) => ({
  type: actions.SIGNUP_ERROR,
  payload: error,
})

export const signup = (credentials) => async (dispatch) => {
  dispatch(signupStart())
  try {
    console.log('credentials', credentials)
    const response = await axiosInstance.post(
      `/api/user/signup`,
      credentials
    )
    const user = response.data
    axiosInstance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${user.token}`
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', user.token)
    dispatch(signupSuccess(user))
  } catch (error) {
    if (isAxiosError(error)) {
      // Axios error (HTTP error)
      const axiosError = error
      const httpError = axiosError.response?.data || {
        status: 500,
        message: 'Unknown error',
      }
      dispatch(signupError(httpError))
    } else {
      // Non-Axios error (e.g., network error)
      const err = {
        message: 'Network Error',
        status: 500,
      }
      dispatch(signupError(err))
    }
  }
}
