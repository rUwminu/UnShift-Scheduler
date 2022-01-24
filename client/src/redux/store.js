import dayjs from 'dayjs'
import thunk from 'redux-thunk'
import jwtDecode from 'jwt-decode'
import { applyMiddleware, createStore, compose, combineReducers } from 'redux'

import {
  userRegisterReducer,
  userSignInReducer,
  userDetailsReducer,
} from './reducer/userReducer'
import { calenderInfoReducer } from './reducer/monthReducer'
import { eventsReducer } from './reducer/eventReducer'

// Dumy Data
import { evtList } from '../dumy-data/data'

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
  calenderInfo: {
    monthIndex: getCurrentMonthIndex(),
    daySelected: dayjs(),
  },
  eventInfo: {
    eventList: [...evtList],
    eventFilterType: [],
    isAddOpen: false,
    isViewOpen: false,
    listListener: {
      isListOpen: false,
      isSelectedDate: null,
    },
  },
}

const reducer = combineReducers({
  userSignIn: userSignInReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  calenderInfo: calenderInfoReducer,
  eventInfo: eventsReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
)

export default store
