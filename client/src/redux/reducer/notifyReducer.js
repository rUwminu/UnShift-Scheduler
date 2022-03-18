import { ADD_NOTIFY, REMOVE_NOTIFY } from '../constant/notifyConstants'

export const notifyReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_NOTIFY:
      return { ...state, notifyList: [...state.notifyList, action.payload] }
    case REMOVE_NOTIFY:
      return {
        ...state,
        notifyList: state.notifyList.filter((x) => x.id !== action.payload),
      }
    default:
      return state
  }
}
