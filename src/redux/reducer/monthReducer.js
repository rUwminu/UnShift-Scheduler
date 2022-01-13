import {
  GET_MONTH_LIST,
  SET_SELECTED_DATE,
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
    case SET_SELECTED_DATE:
      return { ...state, daySelected: action.payload }
    default:
      return state
  }
}
