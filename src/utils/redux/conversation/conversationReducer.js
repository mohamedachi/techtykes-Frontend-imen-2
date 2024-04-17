import fetchConversationActions from './types/fetchConversation'
import fetchConversationsActions from './types/fetchConversations'
import addConversationActions from './types/addConversation'


const initialState = {
    loading: false,
    data: [],
    current : null,
    error: {
        message: '',
        status: 0
    }
}

const conversationReducer = (state = initialState, action) => {
    switch (action.type) {
        case fetchConversationActions.FETCH_CONVERSATION_START: return {
            ...state,
            loading: true
        }
        case fetchConversationActions.FETCH_CONVERSATION_SUCCESS: return {
            ...state,
            loading: false,
            current: action.payload,
            error: ''
        }
        case fetchConversationActions.FETCH_CONVERSATION_ERROR: return {
            ...state,
            loading: false,
            current: null,
            error: action.payload
        }

        case fetchConversationsActions.FETCH_CONVERSATIONS_START: return {
            ...state,
            loading: true
        }
        case fetchConversationsActions.FETCH_CONVERSATIONS_SUCCESS: return {
            ...state,
            loading: false,
            data: action.payload,
            error: ''
        }
        case fetchConversationsActions.FETCH_CONVERSATIONS_ERROR: return {
            ...state,
            loading: false,
            current: null,
            error: action.payload
        }

        case addConversationActions.ADD_CONVERSATION_START: return {
            ...state,
            loading: true
        }
        case addConversationActions.ADD_CONVERSATION_SUCCESS: return {
            ...state,
            loading: false,
            current: action.payload,
            error: ''
        }
        case addConversationActions.ADD_CONVERSATION_ERROR: return {
            ...state,
            loading: false,
            current: null,
            error: action.payload
        }

        default: return state
    }
}

export default conversationReducer