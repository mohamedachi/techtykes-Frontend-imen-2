import signinActions from './types/signin'
import signupActions from './types/signup'
import profileActions from './types/fetchProfile'
import logoutActions from './types/logout'
import clearActions from './types/clear'

const initialState = {
  loading: false,
  data: [],
  current: null,
  success: false,
  error: {
    message: '',
    status: 0,
  },
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case signinActions.SIGNIN_START:
      return {
        ...state,
        loading: true,
      }
    case signinActions.SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        current: action.payload,
        error: '',
      }
    case signinActions.SIGNIN_ERROR:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      }

    case signupActions.SIGNUP_START:
      return {
        ...state,
        loading: true,
      }
    case signupActions.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        current: null,
        success: true,
        error: '',
      }
    case signupActions.SIGNUP_ERROR:
      return {
        ...state,
        loading: false,
        data: [],
        success: false,
        error: action.payload,
      }

    case logoutActions.LOGOUT_START:
      return {
        ...state,
        loading: true,
      }
    case logoutActions.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        current: action.payload,
        error: '',
      }
    case logoutActions.LOGOUT_ERROR:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      }

    case clearActions.CLEAR_START:
      return {
        ...state,
        loading: true,
      }
    case clearActions.CLEAR_SUCCESS:
      return {
        ...state,
        loading: false,
        current: null,
        data: [],
        success: false,
        error: '',
      }
    case clearActions.CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      }

    case profileActions.FETCH_PROFILE_START:
      return {
        ...state,
        loading: true,
      }
    case profileActions.FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        current: action.payload,
        error: '',
      }
    case profileActions.FETCH_PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      }

    default:
      return state
  }
}

export default userReducer
