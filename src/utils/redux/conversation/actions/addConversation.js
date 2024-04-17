import actions from '../types/addConversation';
import axiosInstance, { isAxiosError} from '../../api';


export const addConversationStart = ()  => ({
        type: actions.ADD_CONVERSATION_START,
        payload: null
    })

export const addConversationSuccess = (conversation) => ({
        type: actions.ADD_CONVERSATION_SUCCESS,
        payload: conversation
    })

export const addConversationError = (error) => ({
        type: actions.ADD_CONVERSATION_ERROR,
        payload: error
    })

export const addConversation = (data) => async (dispatch) => {
    dispatch(addConversationStart())
    try {
        const response = await axiosInstance.post(`/api/conversation/`,data)
        const conversation = response.data
        dispatch(addConversationSuccess(conversation))
    } catch (error) {
        if (isAxiosError(error)) {
            // Axios error (HTTP error)
            const axiosError = error;
            const httpError = axiosError.response?.data || { status: 500, message: 'Network error' };
            dispatch(addConversationError(httpError))
        } else {
        // Non-Axios error (e.g., network error)
            const err  = {
                message: "Unknown Error",
                status: 500
            }
            dispatch(addConversationError(err))
        }
    }
}