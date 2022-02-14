import {
  USER_INFO,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_CONTACT_BOOK,
  USER_CREATE_CONTACT_BOOK,
  USER_UPDATE_CONTACT_BOOK,
  USER_DELETE_CONTACT_BOOK,
  USER_UPDATE_PROFILE,
  USER_SIGNOUT,
} from '../constant/userConstant'
import { RESET_EVENT_DETAIL } from '../constant/eventConstants'

export const signin = (data) => (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
  })

  try {
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('user', JSON.stringify(data))
  } catch (err) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: err,
    })
  }
}

export const signout = () => (dispatch) => {
  localStorage.removeItem('user')

  dispatch({
    type: USER_SIGNOUT,
  })

  dispatch({
    type: RESET_EVENT_DETAIL,
  })
}

export const updateProfile = (data) => (dispatch) => {
  dispatch({ type: USER_UPDATE_PROFILE, payload: data })

  localStorage.setItem('user', JSON.stringify(data))
}

export const getSingleUser = (data) => (dispatch) => {
  dispatch({ type: USER_INFO, payload: data })
}

export const getSelfContactBook = (data) => (dispatch) => {
  dispatch({ type: USER_CONTACT_BOOK, payload: data })
}

export const createSelfContactBook = (data) => (dispatch) => {
  dispatch({ type: USER_CREATE_CONTACT_BOOK, payload: data })
}

export const updateSelfContactBook = (data) => (dispatch) => {
  dispatch({ type: USER_UPDATE_CONTACT_BOOK, payload: data })
}

export const deleteSelfContactBook = (cusId) => (dispatch) => {
  dispatch({ type: USER_DELETE_CONTACT_BOOK, payload: cusId })
}
