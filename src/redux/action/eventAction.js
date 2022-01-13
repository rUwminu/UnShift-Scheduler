import {
  TOGGLE_MODEL_OPEN,
  CREATE_EVENT,
  UPDATE_EVENT,
  REMOVE_EVENT,
} from '../constant/eventConstants'

export const toggleEventCardOpen = () => (dispatch) => {
  dispatch({ type: TOGGLE_MODEL_OPEN })
}

export const createEvent = (data) => (dispatch) => {
  dispatch({ type: CREATE_EVENT, payload: data })
}

export const updateEvent = (data) => (dispatch) => {
  dispatch({ type: UPDATE_EVENT, payload: data })
}

export const removeEvent = (evtId) => (dispatch) => {
  dispatch({ type: REMOVE_EVENT, payload: evtId })
}
