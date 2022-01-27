import { TOGGLE_NOTIFY_OPEN } from '../constant/notifyConstants'

export const notifyReducer = (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_NOTIFY_OPEN:
      return {
        ...state,
        isShow: !state.isShow,
        isSuccess: action.payload.isSuccess,
        info: action.payload.info,
      }
    default:
      return state
  }
}
