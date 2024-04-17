import actions from '../types/fetchPlan';
import axiosPlan, { isAxiosError} from '../../api';


export const fetchPlanStart = ()  => ({
        type: actions.FETCH_PLAN_START,
        payload: null
    })

export const fetchPlanSuccess = (plan) => ({
        type: actions.FETCH_PLAN_SUCCESS,
        payload: plan
    })

export const fetchPlanError = (error) => ({
        type: actions.FETCH_PLAN_ERROR,
        payload: error
    })

export const fetchPlan = (name) => async (dispatch) => {
        dispatch(fetchPlanStart())
        try {
            const response = await axiosPlan.get(`/api/plan/${name}`,{})
            const plan = response.data
            console.log(plan)
            dispatch(fetchPlanSuccess(plan))
        } catch (error) {
            if (isAxiosError(error)) {
                // Axios error (HTTP error)
                const axiosError = error;
                const httpError = axiosError.response?.data || { status: 500, message: 'Network error' };
                dispatch(fetchPlanError(httpError))
            } else {
            // Non-Axios error (e.g., network error)
                const err  = {
                    message: "Unknown Error",
                    status: 500
                }
                dispatch(fetchPlanError(err))
            }
        }
    }