import request from '@/utils/request';
// 请求的基本路径
const baseUrl = '/api'

const postLoginAction = (data)=> {
  return request({
    url: `${baseUrl}/login`,
    method: 'POST',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data; charset=utf-8'
    }
  });
};
const postRegisterAction = (data)=>{
  return request({
    url: `${baseUrl}/register`,
    method: 'POST',
    params: data,
    headers: {
      'Content-Type': 'multipart/form-data; charset=utf-8'
    }
  });
};
export  {
  postLoginAction,
  postRegisterAction
}
