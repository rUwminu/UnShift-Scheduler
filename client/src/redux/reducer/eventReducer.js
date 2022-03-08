import { SET_SELECTED_DATE } from '../constant/monthConstants'
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
  RESET_EVENT_DETAIL,
} from '../constant/eventConstants'

export const eventsReducer = (state = {}, action) => {
  let isExist

  switch (action.type) {
    case TOGGLE_MODEL_OPEN:
      return {
        ...state,
        isAddOpen: true,
        isViewOpen: false,
        listListener: {
          isListOpen: false,
          isSelectedDate: null,
        },
      }
    case TOGGLE_MODEL_CLOSE:
      return { ...state, isAddOpen: false, selectedEvent: {} }
    case GET_SELF_EVENT_LIST:
      return { ...state, eventList: action.payload }
    case GET_OTHER_EVENT_LIST:
      return { ...state, eventOtherList: action.payload }
    case PUBSUB_EVENT_NEW:
      return {
        ...state,
        eventOtherList: [...state.eventOtherList, action.payload],
      }
    case PUBSUB_SELF_EVENT_NEW:
      return {
        ...state,
        eventList: [...state.eventList, action.payload],
      }
    case PUBSUB_EVENT_UPDATE:
      isExist =
        state.eventReportList.length > 0
          ? state.eventReportList.some((evt) => evt.id === action.payload.id)
          : false

      if (isExist) {
        return {
          ...state,
          eventOtherList: state.eventOtherList.map((evt) =>
            evt.id === action.payload.id ? action.payload : evt
          ),
          eventReportList: state.eventReportList.map((evt) =>
            evt.id === action.payload.id ? action.payload : evt
          ),
          selectedEvent: state.isViewOpen ? action.payload : {},
        }
      }

      return {
        ...state,
        eventOtherList: state.eventOtherList.map((evt) =>
          evt.id === action.payload.id ? action.payload : evt
        ),
        selectedEvent: state.isViewOpen ? action.payload : {},
      }
    case PUBSUB_SELF_EVENT_UPDATE:
      isExist =
        state.eventReportList.length > 0
          ? state.eventReportList.some((evt) => evt.id === action.payload.id)
          : false

      if (isExist) {
        return {
          ...state,
          eventList: state.eventList.map((evt) =>
            evt.id === action.payload.id ? action.payload : evt
          ),
          eventReportList: state.eventReportList.map((evt) =>
            evt.id === action.payload.id ? action.payload : evt
          ),
          selectedEvent: state.isViewOpen ? action.payload : {},
        }
      }

      return {
        ...state,
        eventList: state.eventList.map((evt) =>
          evt.id === action.payload.id ? action.payload : evt
        ),
        selectedEvent: state.isViewOpen ? action.payload : {},
      }
    case PUBSUB_EVENT_DELETE: {
      isExist =
        state.eventReportList.length > 0
          ? state.eventReportList.some((evt) => evt.id === action.payload)
          : false

      if (isExist) {
        return {
          ...state,
          eventOtherList: state.eventOtherList.filter(
            (evt) => evt.id !== action.payload
          ),
          eventReportList: state.eventReportList.filter(
            (evt) => evt.id !== action.payload
          ),
          selectedEvent: {},
          isViewOpen: false,
        }
      }

      return {
        ...state,
        eventOtherList: state.eventOtherList.filter(
          (evt) => evt.id !== action.payload
        ),
        selectedEvent: {},
        isViewOpen: false,
      }
    }
    case PUBSUB_SELF_EVENT_DELETE: {
      isExist =
        state.eventReportList.length > 0
          ? state.eventReportList.some((evt) => evt.id === action.payload)
          : false

      if (isExist) {
        return {
          ...state,
          eventList: state.eventList.filter((evt) => evt.id !== action.payload),
          eventReportList: state.eventReportList.filter(
            (evt) => evt.id !== action.payload
          ),
        }
      }

      return {
        ...state,
        eventList: state.eventList.filter((evt) => evt.id !== action.payload),
      }
    }
    case GET_REPORT_EVENT_LIST: {
      return { ...state, eventReportList: action.payload }
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
      return {
        ...state,
        isViewOpen: false,
        selectedEvent: {},
        position: { top: 0, bottom: 0, left: 0, right: 0 },
      }
    case TOGGLE_EVENT_LIST_OPEN:
      return {
        ...state,
        isAddOpen: false,
        isViewOpen: false,
        listListener: {
          ...state.listListener,
          isListOpen: true,
          isSelectedDate: action.payload,
        },
      }
    case TOGGLE_EVENT_LIST_CLOSE:
      return {
        ...state,
        isViewOpen: false,
        listListener: {
          ...state.listListener,
          isListOpen: false,
        },
      }
    case ADD_EVENT_FILTER_TYPE:
      if (state.eventFilterType.includes(action.payload)) {
        return {
          ...state,
          isViewOpen: false,
          eventFilterType: state.eventFilterType.filter(
            (x) => x !== action.payload
          ),
        }
      } else {
        return {
          ...state,
          isViewOpen: false,
          eventFilterType: [...state.eventFilterType, action.payload],
        }
      }
    case ADD_REPORT_EVENT_FILTER_TYPE:
      if (state.eventReportFilterType.includes(action.payload)) {
        return {
          ...state,
          position: {},
          isViewOpen: false,
          selectedEvent: {},
          eventReportFilterType: state.eventReportFilterType.filter(
            (x) => x !== action.payload
          ),
        }
      } else {
        return {
          ...state,
          isViewOpen: false,
          eventReportFilterType: [
            ...state.eventReportFilterType,
            action.payload,
          ],
        }
      }
    case SET_EVENT_BOX_POSITION:
      return { ...state, position: action.payload }
    case RESET_MODEL_OPEN:
      return {
        ...state,
        isAddOpen: false,
        isViewOpen: false,
        listListener: {
          isListOpen: false,
          isSelectedDate: null,
        },
      }
    case RESET_EVENT_DETAIL:
      return {
        ...state,
        eventList: [],
        eventOtherList: [],
        eventFilterType: [],
        eventReportList: [],
        eventReportFilterType: [],
        isAddOpen: false,
        isViewOpen: false,
        listListener: {
          isListOpen: false,
          isSelectedDate: null,
        },
      }
    default:
      return state
  }
}
