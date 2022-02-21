import { TOGGLE_MODEL_CLOSE } from '../constant/eventConstants'
import {
  TOGGLE_NOTIFY_RESET,
  TOGGLE_NOTIFY_OPEN,
} from '../constant/notifyConstants'

var initialTimer

export const toggleNotifyTagOpen = (data) => (dispatch) => {
  clearTimeout(initialTimer)

  dispatch({
    type: TOGGLE_NOTIFY_OPEN,
    payload: {
      isSuccess: data.isSuccess,
      info: data.info,
    },
  })

  initialTimer = window.setTimeout(
    () => dispatch({ type: TOGGLE_NOTIFY_RESET }),
    5000
  )
}
