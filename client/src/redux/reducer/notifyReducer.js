import {
  TOGGLE_NOTIFY_RESET,
  TOGGLE_NOTIFY_OPEN,
} from '../constant/notifyConstants'

export const notifyReducer = (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_NOTIFY_RESET:
      return { ...state, isShow: false, isSuccess: null, info: '' }
    case TOGGLE_NOTIFY_OPEN:
      return {
        ...state,
        isShow: true,
        isSuccess: action.payload.isSuccess,
        info: action.payload.info,
      }
    default:
      return state
  }
}
