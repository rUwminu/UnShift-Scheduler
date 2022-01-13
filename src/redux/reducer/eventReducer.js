import { SET_SELECTED_DATE } from '../constant/monthConstants'
import {
  TOGGLE_MODEL_OPEN,
  CREATE_EVENT,
  UPDATE_EVENT,
  REMOVE_EVENT,
} from '../constant/eventConstants'

export const eventsReducer = (state = { isAddOpen: false }, action) => {
  switch (action.type) {
    case TOGGLE_MODEL_OPEN:
      return { ...state, isAddOpen: !state.isAddOpen }
    case CREATE_EVENT:
      return { ...state, eventList: [...state.eventList, action.payload] }
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
      return { ...state, isAddOpen: true }
    default:
      return state
  }
}
