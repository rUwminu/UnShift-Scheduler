import {
  ALL_USER_LIST,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_CONTACT_BOOK,
  USER_OTHER_CONTACT_BOOK,
  USER_CREATE_CONTACT_BOOK,
  USER_UPDATE_CONTACT_BOOK,
  USER_DELETE_CONTACT_BOOK,
  USER_UPDATE_PROFILE,
  USER_SIGNOUT,
  PUBSUB_USER_UPDATE_LIST,
} from '../constant/userConstant'

export const userSignInReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true }
    case USER_SIGNIN_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_PROFILE:
      return { loading: false, user: action.payload }
    case USER_SIGNOUT:
      return {}
    default:
      return state
  }
}

export const userContactBookReducer = (state = {}, action) => {
  let isExist

  switch (action.type) {
    case USER_CONTACT_BOOK:
      return { ...state, allCustomerContact: action.payload }
    case USER_OTHER_CONTACT_BOOK:
      return { ...state, otherCustomerContact: action.payload }
    case USER_CREATE_CONTACT_BOOK:
      return {
        ...state,
        allCustomerContact: [...state.allCustomerContact, action.payload],
      }
    case USER_UPDATE_CONTACT_BOOK:
      return {
        ...state,
        allCustomerContact: state.allCustomerContact.map((ct) =>
          ct.id === action.payload.id ? action.payload : ct
        ),
      }
    case USER_DELETE_CONTACT_BOOK:
      return {
        ...state,
        allCustomerContact: state.allCustomerContact.filter(
          (ct) => ct.id !== action.payload
        ),
      }
    case ALL_USER_LIST:
      return { ...state, allUsers: action.payload }
    case USER_SIGNOUT:
      return { ...state, allCustomerContact: [], allUsers: [] }
    case PUBSUB_USER_UPDATE_LIST:
      isExist =
        state.allUsers.length > 0
          ? state.allUsers.some((usr) => usr.id === action.payload.id)
          : false

      if (isExist) {
        return {
          ...state,
          allUsers: state.allUsers.map((usr) =>
            usr.id === action.payload.id ? action.payload : usr
          ),
        }
      }

      return { ...state, allUsers: [action.payload, ...state.allUsers] }
    default:
      return state
  }
}
