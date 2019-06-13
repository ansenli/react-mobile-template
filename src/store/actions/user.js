import {
  createAction
} from 'redux-actions'
import api from '@/api/api';
import wepy from 'wepy';
// aync function
import tip from '@/utils/tip';
import {USER_INFO} from "../types/index";
const fetchUserInfo = async function () {
    const jsonData = await api.userInfo({
      method: 'GET'
    })

    if (jsonData.statusCode == 200) {
      return jsonData.data.data
    } else {
      return false;
    }

}


// actions

export const asyncUserInfo = createAction(USER_INFO, (params) => {
  return fetchUserInfo(params)
})
