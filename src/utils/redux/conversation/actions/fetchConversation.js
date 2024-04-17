import actions from '../types/fetchConversation';
import axiosInstance, { isAxiosError} from '../../api';


export const fetchConversationStart = ()  => ({
        type: actions.FETCH_CONVERSATION_START,
        payload: null
    })

export const fetchConversationSuccess = (conversation) => ({
        type: actions.FETCH_CONVERSATION_SUCCESS,
        payload: conversation
    })

export const fetchConversationError = (error) => ({
        type: actions.FETCH_CONVERSATION_ERROR,
        payload: error
    })

export const fetchConversation = (id) => async (dispatch) => {
        dispatch(fetchConversationStart())
        try {
            const response = await axiosInstance.get(`/api/conversation/${id}`,{})
            const conversation = response.data
            dispatch(fetchConversationSuccess(conversation))
        } catch (error) {
            if (isAxiosError(error)) {
                // Axios error (HTTP error)
                const axiosError = error;
                const httpError = axiosError.response?.data || { status: 500, message: 'Network error' };
                dispatch(fetchConversationError(httpError))
            } else {
            // Non-Axios error (e.g., network error)
                const err  = {
                    message: "Unknown Error",
                    status: 500
                }
                dispatch(fetchConversationError(err))
            }
        }
    }