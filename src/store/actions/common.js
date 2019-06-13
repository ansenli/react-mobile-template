import {
  ASYNC_WXPAYMENT,
  ASYNC_WXOPENID,
  ASYNC_USERADDRESSES,
  ASYNC_USERADDRESSESLIST,
  ASYNC_CANCELPAYMENT,
  ASYNC_QUERYORDERDATA,
  ASYNC_USERDETAILINFO,
  ASYNC_PUTUSERDETAILINFO,
  ASYNC_PUTUSERADDRESSES ,
  ASYNC_DELETEUSERADDRESSES ,
  ASYNC_QUERYUSERADDRESSES,
  ASYNC_POSTLOGOUT,
  ASYNC_ORDERFROM,
} from '../types/common'
import {
  createAction
} from 'redux-actions'
import {
  postWxPayment,
  postWxOpenId,
  postUserAddresses,
  getUserAddressesList,
  postCancelPayment,
  getQueryOrder,
  getUserDetailInfo,
  putUserDetailInfo,
  putUserAddresses,
  deleteUserAddresses,
  queryUserAddresses,
  postLogout,
  getOrderFrom
} from '@/api/common';


const postWxPaymentData = async function (params) {
  const jsonData = await postWxPayment({
    query: params,
    method: 'POST'
  })
  if (jsonData.statusCode == 200) {
    return jsonData.data
  } else {
    return false;
  }
}
const postWxOpenIdData = async function (params) {
  const jsonData = await postWxOpenId({
    query: params,
    method: 'POST'
  })
  if (jsonData.statusCode == 200) {
    return jsonData.data
  } else {
    return false;
  }
}
const postUserAddressesDate = async function (params) {
  const jsonData = await postUserAddresses({
    query: params,
    method: 'POST'
  })
  if (jsonData.statusCode == 200) {
    return jsonData.data
  } else {
    return false;
  }
}
const getUserAddressesListData = async function (params) {
  const jsonData = await getUserAddressesList({
    query: params,
    method: 'GET'
  })
  if (jsonData.statusCode == 200) {
    return jsonData.data
  } else {
    return false;
  }
}
const postCancelPaymentData = async function (params) {
  const jsonData = await postCancelPayment({
    query: params,
    method: 'POST'
  })
  if (jsonData.statusCode == 200) {
    return jsonData.data
  } else {
    return false;
  }
}
const getQueryOrderData = async function (params) {
  const jsonData = await getQueryOrder({
    query: params,
    method: 'GET'
  })
  if (jsonData.statusCode == 200) {
    return jsonData.data
  } else {
    return false;
  }
}

const getUserDetailInfoData = async function (params) {
  const jsonData = await getUserDetailInfo({
    query: params,
    method: 'GET'
  })
  if (jsonData.statusCode == 200) {
    return jsonData.data
  } else {
    return false;
  }
}
const putUserDetailInfoData = async function (params) {
  const jsonData = await putUserDetailInfo({
    query: params,
    method: 'PUT'
  })
  if (jsonData.statusCode == 200) {
    return jsonData.data
  } else {
    return false;
  }
}
const putUserAddressesData = async function (params) {
  const jsonData = await putUserAddresses({
    query: params,
    method: 'PUT'
  })
  if (jsonData.statusCode == 200) {
    return jsonData.data
  } else {
    return false;
  }
}
const deleteUserAddressesData = async function (params) {
  const jsonData = await deleteUserAddresses({
    query: params,
    method: 'PUT'
  })
  if (jsonData.statusCode == 200) {
    return jsonData.data
  } else {
    return false;
  }
}
const queryUserAddressesData = async function (params) {
  const jsonData = await queryUserAddresses({
    query: params,
    method: 'GET'
  })
  if (jsonData.statusCode == 200) {
    return jsonData.data
  } else {
    return false;
  }
}

const postLogoutData = async function (params) {
  const jsonData = await postLogout({
    query: params,
    method: 'POST'
  })
  if (jsonData.statusCode == 200) {
    return jsonData.data
  } else {
    return false;
  }
}

const getOrderFromData = async function (params) {
  const jsonData = await getOrderFrom({
    query: params,
    method: 'GET'
  })
  if (jsonData.statusCode == 200) {
    return jsonData.data
  } else {
    return false;
  }
}
// actions

export const asyncWxPayment = createAction(ASYNC_WXPAYMENT, (params) => {
  return postWxPaymentData(params)
})
export const asyncWxOpenId = createAction(ASYNC_WXOPENID, (params) => {
  return postWxOpenIdData(params)
})

export const asyncUserAddresses = createAction(ASYNC_USERADDRESSES, (params) => {
  return postUserAddressesDate(params)
})
export const asyncUserAddressesList = createAction(ASYNC_USERADDRESSESLIST, (params) => {
  return getUserAddressesListData(params)
})
export const asyncCancelPayment = createAction(ASYNC_CANCELPAYMENT, (params) => {
  return postCancelPaymentData(params)
})
export const asyncQueryOrderData = createAction(ASYNC_QUERYORDERDATA, (params) => {
  return getQueryOrderData(params)
})
export const asyncUserDetailInfo = createAction(ASYNC_USERDETAILINFO, (params) => {
  return getUserDetailInfoData(params)
})
// 更新个人用户信息
export const asyncPutUserDetailInfo = createAction(ASYNC_PUTUSERDETAILINFO, (params) => {
  return putUserDetailInfoData(params)
})

export const asyncPutUserAddresses = createAction(ASYNC_PUTUSERADDRESSES, (params) => {
  return putUserAddressesData(params)
})
// 删除地址
export const asyncDeleteUserAddresses = createAction(ASYNC_DELETEUSERADDRESSES, (params) => {
  return deleteUserAddressesData(params)
})

export const asyncQueryUserAddresses = createAction(ASYNC_QUERYUSERADDRESSES, (params) => {
  return queryUserAddressesData(params)
})

// 退出登录
export const asyncPostLogout = createAction(ASYNC_POSTLOGOUT, (params) => {
  return postLogoutData(params)
})
// 判断实物订单
export const asyncQueryOrderFrom = createAction(ASYNC_ORDERFROM, (params) => {
  return getOrderFromData(params)
})

