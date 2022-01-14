import { SET_SELECTED_DATE } from '../constant/monthConstants'
import {
  TOGGLE_MODEL_OPEN,
  TOGGLE_MODEL_CLOSE,
  CREATE_EVENT,
  UPDATE_EVENT,
  REMOVE_EVENT,
  SET_SELECTED_EVENT,
} from '../constant/eventConstants'

export const eventsReducer = (
  state = { eventList: [], isAddOpen: false },
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
      return { ...state, isAddOpen: true, selectedDate: action.payload }
    case SET_SELECTED_EVENT:
      return { ...state, isAddOpen: true, selectedEvent: action.payload }
    default:
      return state
  }
}
