import dayjs from 'dayjs'
import { RESET_MODEL_OPEN } from '../constant/eventConstants'
import {
  GET_MONTH_LIST,
  SET_SELECTED_DATE,
  RESET_MONTH_INDEX,
  TOGGLE_MONTH_INDEX,
  JUMP_MONTH_INDEX,
} from '../constant/monthConstants'

export const getCurrentMonthList = () => (dispatch) => {
  dispatch({ type: GET_MONTH_LIST, payload: 1 })
}

export const setSelectedDate = (day) => (dispatch) => {
  dispatch({ type: SET_SELECTED_DATE, payload: day })
}

export const resetCurrentMonth = () => (dispatch) => {
  const monthIndex = dayjs().month()
  dispatch({ type: RESET_MONTH_INDEX, payload: monthIndex })
}

export const toggleNextPrevMonth = (index) => (dispatch) => {
  dispatch({ type: RESET_MODEL_OPEN })
  dispatch({ type: TOGGLE_MONTH_INDEX, payload: index })
}

export const jumpToSelectedDayMonth = (data) => (dispatch) => {
  dispatch({ type: RESET_MODEL_OPEN })
  dispatch({ type: JUMP_MONTH_INDEX, payload: data })
}
