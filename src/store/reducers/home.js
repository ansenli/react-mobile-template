import {
  handleActions
} from 'redux-actions'
import {
  ASYNC_HOMELIST
} from '../types/home'

const defaultState = {
  homeList: {}
}
export default handleActions({
  [ASYNC_HOMELIST](state, action) {
    return {
      ...state,
      homeList: action.payload
    }
  },
}, defaultState)
