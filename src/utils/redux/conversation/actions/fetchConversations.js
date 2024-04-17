import actions from '../types/fetchConversations';
import axiosInstance, { isAxiosError} from '../../api';


export const fetchConversationsStart = ()  => ({
        type: actions.FETCH_CONVERSATIONS_START,
        payload: null
    })

export const fetchConversationsSuccess = (conversations) => ({
        type: actions.FETCH_CONVERSATIONS_SUCCESS,
        payload: conversations
    })

export const fetchConversationsError = (error) => ({
        type: actions.FETCH_CONVERSATIONS_ERROR,
        payload: error
    })

export const fetchConversations = () => async (dispatch) => {
        dispatch(fetchConversationsStart())
        try {
            const response = await axiosInstance.get(`/api/conversation/`,{})
            const conversations = response.data
            dispatch(fetchConversationsSuccess(conversations))
        } catch (error) {
            if (isAxiosError(error)) {
                // Axios error (HTTP error)
                const axiosError = error;
                const httpError = axiosError.response?.data || { status: 500, message: 'Network error' };
                dispatch(fetchConversationsError(httpError))
            } else {
            // Non-Axios error (e.g., network error)
                const err  = {
                    message: "Unknown Error",
                    status: 500
                }
                dispatch(fetchConversationsError(err))
            }
        }
    }