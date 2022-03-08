import {
  TOGGLE_MODEL_OPEN,
  TOGGLE_MODEL_CLOSE,
  PUBSUB_EVENT_NEW,
  PUBSUB_SELF_EVENT_NEW,
  PUBSUB_EVENT_UPDATE,
  PUBSUB_SELF_EVENT_UPDATE,
  PUBSUB_EVENT_DELETE,
  PUBSUB_SELF_EVENT_DELETE,
  GET_SELF_EVENT_LIST,
  GET_OTHER_EVENT_LIST,
  GET_REPORT_EVENT_LIST,
  SET_SELECTED_EVENT,
  CLOSE_SELECTED_EVENT,
  SET_EVENT_BOX_POSITION,
  TOGGLE_EVENT_LIST_OPEN,
  TOGGLE_EVENT_LIST_CLOSE,
  ADD_EVENT_FILTER_TYPE,
  ADD_REPORT_EVENT_FILTER_TYPE,
  RESET_MODEL_OPEN,
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
  dispatch({ type: PUBSUB_EVENT_NEW, payload: evt })
}

export const getPubSubSelfEventNew = (evt) => (dispatch) => {
  dispatch({ type: PUBSUB_SELF_EVENT_NEW, payload: evt })
}

export const getPubSubEventUpdate = (evt) => (dispatch) => {
  dispatch({ type: PUBSUB_EVENT_UPDATE, payload: evt })
}

export const getPubSubSelfEventUpdate = (evt) => (dispatch) => {
  dispatch({ type: PUBSUB_SELF_EVENT_UPDATE, payload: evt })
}

export const getPubSubEventDelete = (evtId) => (dispatch) => {
  dispatch({ type: CLOSE_SELECTED_EVENT })
  dispatch({ type: PUBSUB_EVENT_DELETE, payload: evtId })
}

export const getPubSubSelfEventDelete = (evtId) => (dispatch) => {
  dispatch({ type: CLOSE_SELECTED_EVENT })
  dispatch({ type: PUBSUB_SELF_EVENT_DELETE, payload: evtId })
}

export const getReportEventList = (evt) => (dispatch) => {
  dispatch({ type: GET_REPORT_EVENT_LIST, payload: evt })
}

// Control components view and reset value ---------------------------------------------------
export const setSelectEvent = (data) => (dispatch) => {
  dispatch({ type: RESET_MODEL_OPEN })
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

export const addReportEventFilterType = (type) => (dispatch) => {
  dispatch({ type: ADD_REPORT_EVENT_FILTER_TYPE, payload: type })
}

export const setEventBoxPosition = (position) => (dispatch) => {
  dispatch({ type: SET_EVENT_BOX_POSITION, payload: position })
}
