import axios from 'axios';
import oauth from '@/oauth';
import {Message} from 'element-ui';


// create an axios instance
const service = axios.create({
  baseURL: process.env.BASIC_BASE_API, // api的base_url
  timeout: 5000, // request timeout
  headers: {"source": "YTOCRM","REST-CLIENT":"REST-CLIENT"}
});

// request interceptor
service.interceptors.request.use(config => {
  // console.log('22222',config)
  // Do something before request is sent
  if (oauth.isAuthenticated()) {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    let authInfo = oauth.getAuthInfo();
    config.headers.Authorization = authInfo.token_type + ' ' + authInfo.access_token;
  }
  return config;
}, error => {
  // Do something with request error
  // console.log(1111,error); // for debug
  Promise.reject(error);
});

// respone interceptor
service.interceptors.response.use(
  response => {
    // console.log('长时间未操作的返回结果：',response);
    // console.log('状态码：',response.status)
    // console.log('xianzaideRESPONSE:',response)
    if([401].indexOf(response.status) > -1) {
      oauth.clearAuthInfo();
      window.location = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    }
    // if(!response.data.status) {
    //   // 刷新token失败，跳转登录页面。
    //   oauth.clearAuthInfo();
    //   window.location.href = window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    // }
    if (response.data.status !== 0) {
      Message.error(response.data.message);
      return Promise.reject(response.data);
    }
    return response.data.data;
  },
  error => {

    // console.log('error长时间未操作的返回结果：',JSON.stringify(error));
    // console.log(error.response.status);
    const originalRequest = error.config;

    if([401].indexOf(error.response.status) > -1) {
      // 刷新token失败，跳转登录页面。
      oauth.clearAuthInfo();
      // console.log('跳转的页面：',window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : ''));
      window.location = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
      // oauth.redirectToLogin(window.location.href);
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      oauth.refreshToken().then((data) => {
        if (data) {
          return service.request(originalRequest);
        }
        // 刷新token失败，跳转登录页面。
        oauth.clearAuthInfo();
        // oauth.redirectToLogin(window.location.href);
      });
    }
    return Promise.reject(error);
  });

export default service;
