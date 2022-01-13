import {
  GET_MONTH_LIST,
  RESET_MONTH_INDEX,
  TOGGLE_MONTH_INDEX,
  JUMP_MONTH_INDEX,
} from '../constant/monthConstants'

export const calenderInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MONTH_LIST:
      return { ...state }
    case RESET_MONTH_INDEX:
      return { ...state, monthIndex: action.payload }
    case TOGGLE_MONTH_INDEX:
      return { ...state, monthIndex: action.payload }
    case JUMP_MONTH_INDEX:
      return {
        ...state,
        monthIndex: action.payload.currentMonthIndex,
        daySelected: action.payload.day,
      }
    default:
      return state
  }
}
