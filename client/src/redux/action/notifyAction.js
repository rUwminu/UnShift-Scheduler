import { ADD_NOTIFY, REMOVE_NOTIFY } from '../constant/notifyConstants'

export const addNotifications = (data) => (dispatch) => {
  dispatch({ type: ADD_NOTIFY, payload: data })
}

export const removeNotifications = (id) => (dispatch) => {
  dispatch({ type: REMOVE_NOTIFY, payload: id })
}
