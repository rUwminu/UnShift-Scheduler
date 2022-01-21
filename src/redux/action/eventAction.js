import {
  TOGGLE_MODEL_OPEN,
  TOGGLE_MODEL_CLOSE,
  CREATE_EVENT,
  UPDATE_EVENT,
  REMOVE_EVENT,
  SET_SELECTED_EVENT,
  CLOSE_SELECTED_EVENT,
  SET_EVENT_BOX_POSITION,
  TOGGLE_EVENT_LIST_OPEN,
  TOGGLE_EVENT_LIST_CLOSE,
  ADD_EVENT_FILTER_TYPE,
} from '../constant/eventConstants'

export const toggleEventCardOpen = () => (dispatch) => {
  dispatch({ type: TOGGLE_MODEL_OPEN })
}

export const toggleEventCardClose = () => (dispatch) => {
  dispatch({ type: TOGGLE_MODEL_CLOSE })
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

export const setSelectEvent = (data) => (dispatch) => {
  dispatch({ type: SET_SELECTED_EVENT, payload: data })
}

export const closeSelectedEvent = () => (dispatch) => {
  dispatch({ type: CLOSE_SELECTED_EVENT })
}

export const toggleEventListOpen = (date) => (dispatch) => {
  dispatch({ type: TOGGLE_EVENT_LIST_OPEN, payload: date })
}

export const toggleEventListClose = () => (dispatch) => {
  dispatch({ type: TOGGLE_EVENT_LIST_CLOSE })
}

export const addEventFilterType = (type) => (dispatch) => {
  dispatch({ type: ADD_EVENT_FILTER_TYPE, payload: type })
}

export const setEventBoxPosition = (position) => (dispatch) => {
  dispatch({ type: SET_EVENT_BOX_POSITION, payload: position })
}
