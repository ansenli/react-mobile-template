import {
  handleActions
} from 'redux-actions'
import {
  ASYNC_USERINFO
} from '../types/user'

const defaultState = {
  userInfo: {}
}
export default handleActions({
  [ASYNC_USERINFO](state, action) {
    return {
      ...state,
      userInfo: action.payload
    }
  },

}, defaultState)
