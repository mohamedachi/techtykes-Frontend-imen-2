import actions from '../types/clear'

export const clearStart = () => ({
  type: actions.CLEAR_START,
  payload: null,
})

export const clearSuccess = () => ({
  type: actions.CLEAR_SUCCESS,
  payload: null,
})

export const clearError = (error) => ({
  type: actions.CLEAR_ERROR,
  payload: error,
})

export const clear = () => async (dispatch) => {
  dispatch(clearStart())
  try {
    dispatch(clearSuccess())
    console.log('cleared')
  } catch (error) {
    if (isAxiosError(error)) {
      // Axios error (HTTP error)
      const axiosError = error
      const httpError = axiosError.response?.data || {
        status: 500,
        message: 'Unknown error',
      }
      dispatch(clearError(httpError))
    } else {
      // Non-Axios error (e.g., network error)
      const err = {
        message: 'Network Error',
        status: 500,
      }
      dispatch(clearError(err))
    }
  }
}
