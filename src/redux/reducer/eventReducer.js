import { SET_SELECTED_DATE } from '../constant/monthConstants'
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
} from '../constant/eventConstants'

export const eventsReducer = (
  state = {
    eventList: [],
    isAddOpen: false,
    isViewOpen: false,
    isListOpen: false,
  },
  action
) => {
  switch (action.type) {
    case TOGGLE_MODEL_OPEN:
      return { ...state, isAddOpen: true }
    case TOGGLE_MODEL_CLOSE:
      return { ...state, isAddOpen: false, selectedEvent: {} }
    case CREATE_EVENT:
      return {
        ...state,
        eventList: [...state.eventList, action.payload],
        isAddOpen: false,
      }
    case UPDATE_EVENT:
      return {
        ...state,
        eventList: state.eventList.map((evt) =>
          evt.id === action.payload.id ? action.payload : evt
        ),
      }
    case REMOVE_EVENT:
      return {
        ...state,
        eventList: state.eventList.filter((evt) => evt.id !== action.payload),
      }
    case SET_SELECTED_DATE:
      return {
        ...state,
        isAddOpen: true,
        isViewOpen: false,
        selectedDate: action.payload,
      }
    case SET_SELECTED_EVENT:
      return { ...state, isViewOpen: true, selectedEvent: action.payload }
    case CLOSE_SELECTED_EVENT:
      return { ...state, isViewOpen: false, selectedEvent: {} }
    case TOGGLE_EVENT_LIST_OPEN:
      return { ...state, isListOpen: !state.isListOpen }
    case SET_EVENT_BOX_POSITION:
      return { ...state, position: action.payload }
    default:
      return state
  }
}
