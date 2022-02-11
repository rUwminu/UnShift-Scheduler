import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_CONTACT_BOOK,
  USER_CREATE_CONTACT_BOOK,
  USER_UPDATE_CONTACT_BOOK,
  USER_DELETE_CONTACT_BOOK,
  USER_SIGNOUT,
} from '../constant/userConstant'

export const userSignInReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true }
    case USER_SIGNIN_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_SIGNOUT:
      return {}
    default:
      return state
  }
}

export const userContactBookReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CONTACT_BOOK:
      return { ...state, allCustomerContact: action.payload }
    case USER_CREATE_CONTACT_BOOK:
      return {
        ...state,
        allCustomerContact: [action.payload, ...state.allCustomerContact],
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
    case USER_SIGNOUT:
      return { ...state, allCustomerContact: [] }
    default:
      return state
  }
}
