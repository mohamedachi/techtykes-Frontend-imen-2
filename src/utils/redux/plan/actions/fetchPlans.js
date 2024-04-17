import actions from '../types/fetchPlans';
import axiosPlan, { isAxiosError} from '../../api';


export const fetchPlansStart = ()  => ({
        type: actions.FETCH_PLANS_START,
        payload: null
    })

export const fetchPlansSuccess = (plans) => ({
        type: actions.FETCH_PLANS_SUCCESS,
        payload: plans
    })

export const fetchPlansError = (error) => ({
        type: actions.FETCH_PLANS_ERROR,
        payload: error
    })

export const fetchPlans = () => async (dispatch) => {
        dispatch(fetchPlansStart())
        try {
            const response = await axiosPlan.get(`/api/plan`,{})
            const plans = response.data
            dispatch(fetchPlansSuccess(plans))
        } catch (error) {
            if (isAxiosError(error)) {
                // Axios error (HTTP error)
                const axiosError = error;
                const httpError = axiosError.response?.data || { status: 500, message: 'Network error' };
                dispatch(fetchPlansError(httpError))
            } else {
            // Non-Axios error (e.g., network error)
                const err  = {
                    message: "Unknown Error",
                    status: 500
                }
                dispatch(fetchPlansError(err))
            }
        }
    }