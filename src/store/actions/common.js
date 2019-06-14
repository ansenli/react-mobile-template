import {
  ASYNC_LOGIN,
  ASYNC_REGISTER,
} from '../types/common'
import {
  createAction
} from 'redux-actions'
import {
  postLoginAction,
  postRegisterAction,
} from '@/api/common';

// async interFace function
const asyncPostLoginFunc = async function (params) {
  const jsonData = await postLoginAction({
    query: params,
    method: 'POST'
  })
  console.log("actions....",jsonData)
  if (jsonData.resCode.status === 1) {
    return jsonData.data
  } else {
    return false;
  }
}
const asyncPostRegisterFunc = async function (params) {
  const jsonData = await postRegisterAction({
    query: params,
    method: 'POST'
  })
  if (jsonData.statusCode == 200) {
    return jsonData.data
  } else {
    return false;
  }
}

// async reduxActions 

export const asyncPostLogin = createAction(ASYNC_LOGIN, (params) => {
  return asyncPostLoginFunc(params)
})
export const asyncPostRegister = createAction(ASYNC_REGISTER, (params) => {
  return asyncPostRegisterFunc(params)
})

