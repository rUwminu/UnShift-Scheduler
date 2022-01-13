import dayjs from 'dayjs'
import {
  GET_MONTH_LIST,
  RESET_MONTH_INDEX,
  TOGGLE_MONTH_INDEX,
  JUMP_MONTH_INDEX,
} from '../constant/monthConstants'

export const getCurrentMonthList = () => (dispatch) => {
  dispatch({ type: GET_MONTH_LIST, payload: 1 })
}

export const resetCurrentMonth = () => (dispatch) => {
  const monthIndex = dayjs().month()
  dispatch({ type: RESET_MONTH_INDEX, payload: monthIndex })
}

export const toggleNextPrevMonth = (index) => (dispatch) => {
  dispatch({ type: TOGGLE_MONTH_INDEX, payload: index })
}

export const jumpToSelectedDayMonth = (data) => (dispatch) => {
  dispatch({ type: JUMP_MONTH_INDEX, payload: data })
}
