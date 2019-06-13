import {
  handleActions
} from 'redux-actions'
import {
  ASYNC_LOGIN,
  ASYNC_REGISTER,
} from '../types/common'

const defaultState = {
  loginInfo: {},
  registerInfo:{},
}
export default handleActions({
  [ASYNC_LOGIN](state, action) {
    return {
      ...state,
      loginInfo:action.payload
    }
  },
  [ASYNC_REGISTER](state, action) {
    return {
      ...state,
      registerInfo:action.payload
    }
  },
}, defaultState)
