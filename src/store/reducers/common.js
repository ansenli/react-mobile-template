import {
  handleActions
} from 'redux-actions'
import {
  ASYNC_LOGIN,
  ASYNC_REGISTER,
} from '../types/common'

const defaultState = {
  loginInfo: {
    code:19890119
  },
  registerInfo:{
    code:198911111
  },
}
export default handleActions({
  [ASYNC_LOGIN](state, action) {
    console.log("login reducers.......",action)
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
