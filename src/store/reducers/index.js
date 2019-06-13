import { combineReducers } from 'redux'
import user from './user'
import common from './common'
import home from './home'
export default combineReducers({
  user,
  common,
  home,
})
