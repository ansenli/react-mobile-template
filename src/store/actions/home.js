import {
  ASYNC_HOMELIST
} from '../types/user'
import {
  createAction
} from 'redux-actions'
import {
  getHomeListActions,
} from '@/api/user';

// async interFace function
const asyncGetHomeListFunc = async function (params) {
  const jsonData = await getHomeListActions({
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
export const asyncGetHomeList = createAction(ASYNC_HOMELIST, (params) => {
  return asyncGetHomeListFunc(params)
})

