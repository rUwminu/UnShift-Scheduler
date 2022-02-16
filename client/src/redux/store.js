import dayjs from 'dayjs'
import thunk from 'redux-thunk'
import jwtDecode from 'jwt-decode'
import { applyMiddleware, createStore, compose, combineReducers } from 'redux'

import {
  userSignInReducer,
  userContactBookReducer,
} from './reducer/userReducer'
import { calenderInfoReducer } from './reducer/monthReducer'
import { eventsReducer } from './reducer/eventReducer'
import { notifyReducer } from './reducer/notifyReducer'

const decodeLocalUser = () => {
  if (localStorage.getItem('user')) {
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const decodeToken = jwtDecode(userInfo.token)

    if (decodeToken.exp * 1000 < Date.now()) {
      localStorage.removeItem('user')
      return null
    } else {
      return userInfo
    }
  }
}

const getCurrentMonthIndex = () => {
  const monthIndex = dayjs().month()
  return monthIndex
}

const initialState = {
  userSignIn: {
    user: decodeLocalUser(),
  },
  contactBook: {
    allUsers: [],
    allCustomerContact: [],
  },
  calenderInfo: {
    monthIndex: getCurrentMonthIndex(),
    daySelected: dayjs(),
  },
  eventInfo: {
    eventList: [],
    eventOtherList: [],
    eventFilterType: [],
    eventReportList: [],
    eventReportOtherList: [],
    eventReportFilterType: [],
    isAddOpen: false,
    isViewOpen: false,
    listListener: {
      isListOpen: false,
      isSelectedDate: null,
    },
  },
  notifyInfo: {
    isShow: false,
    isSuccess: null,
    info: '',
  },
}

const reducer = combineReducers({
  userSignIn: userSignInReducer,
  contactBook: userContactBookReducer,
  calenderInfo: calenderInfoReducer,
  eventInfo: eventsReducer,
  notifyInfo: notifyReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
)

export default store
