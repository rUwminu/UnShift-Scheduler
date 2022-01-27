import {
  TOGGLE_MODEL_OPEN,
  TOGGLE_MODEL_CLOSE,
  PUBSUB_EVENT,
  PUBSUB_SELF_EVENT,
  GET_SELF_EVENT_LIST,
  GET_OTHER_EVENT_LIST,
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

export const getSelfEventList = (evtList) => (dispatch) => {
  dispatch({ type: GET_SELF_EVENT_LIST, payload: evtList })
}

export const getOtherEventList = (evtList) => (dispatch) => {
  dispatch({ type: GET_OTHER_EVENT_LIST, payload: evtList })
}

export const getPubSubEventNew = (evt) => (dispatch) => {
  dispatch({ type: PUBSUB_EVENT, payload: evt })
}

export const getPubSubSelfEventNew = (evt) => (dispatch) => {
  dispatch({ type: PUBSUB_SELF_EVENT, payload: evt })
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
