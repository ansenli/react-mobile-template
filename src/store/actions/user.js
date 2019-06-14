import {
  ASYNC_USERINFO
} from '../types/user'
import {
  createAction
} from 'redux-actions'
import {
  getUserInfoActions,
} from '@/api/user';

// async interFace function
const asyncGetUserInfoFunc = async function (params) {
  const jsonData = await getUserInfoActions({
    query: params,
    method: 'GET'
  })
  if (jsonData.statusCode == 200) {
    return jsonData.data
  } else {
    return false;
  }
}


// async reduxActions 
export const asyncGetUserInfo = createAction(ASYNC_USERINFO, (params) => {
  return asyncGetUserInfoFunc(params)
})

