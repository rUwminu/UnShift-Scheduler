import { TOGGLE_MODEL_CLOSE } from '../constant/eventConstants'
import { TOGGLE_NOTIFY_OPEN } from '../constant/notifyConstants'

export const toggleNotifyTagOpen = (data) => (dispatch) => {
  dispatch({
    type: TOGGLE_NOTIFY_OPEN,
    payload: {
      isSuccess: data.isSuccess,
      info: data.info,
    },
  })
}
