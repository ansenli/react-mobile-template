import axios from 'axios';
import oauth from '@/oauth';
import Cookies from 'js-cookie';
import {Message,MessageBox} from 'element-ui';

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 10000, // request timeout
  headers: {
    "source": "YTOCRM", "REST-CLIENT": "REST-CLIENT",
    "jwt-token":"eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NjAzMjc0MTMsInN1YiI6IntcInByb3ZpZGVyTmFtZVwiOlwiU3NvSnd0UHJvdmlkZXJcIixcImR1cmF0aW9uXCI6MTg4MCxcInVzZXJTdGF0dXNcIjpcIlZBTElEXCIsXCJlbXBsb3llZU5hbWVcIjpcIuadjuWbveiNo1wiLFwidXNlclJvbGVzXCI6W3tcInJvbGVJZFwiOlwiMVwiLFwicm9sZU5hbWVcIjpcIueuoeeQhuWRmFwiLFwiaXNEZWxldGVkXCI6dHJ1ZSxcInJvbGVDb2RlXCI6XCJBRE1JTklTVFJBVE9SXCIsXCJhdXRob3JpdHlcIjpcIkFETUlOSVNUUkFUT1JcIn1dLFwiZW5hYmxlZFwiOnRydWUsXCJ1c2VybmFtZVwiOlwiMDE0MDU5NjRcIixcImNyZWRlbnRpYWxzTm9uRXhwaXJlZFwiOnRydWUsXCJhY2NvdW50Tm9uRXhwaXJlZFwiOnRydWUsXCJhY2NvdW50Tm9uTG9ja2VkXCI6dHJ1ZSxcInVzZXJOYW1lXCI6XCIwMTQwNTk2NFwifSJ9.5kJYPRgP-wjZlECkVcFs-YDv8IE0qas5qEwZPUqcOv4"
  }
});
// request interceptor
service.interceptors.request.use(config => {
  // console.log('22222',config)
  // Do something before request is sent
  let token = sessionStorage.getItem('jwt-token');
  if(!token || token === '') {
  //   // token = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDQ4NDQxNzgsInN1YiI6IntcInByb3ZpZGVyTmFtZVwiOlwiU3NvSnd0UHJvdmlkZXJcIixcInVzZXJJZFwiOlwiMDEzNDAyNzRcIixcInVzZXJTdGF0dXNcIjpcIlZBTElEXCIsXCJvcmdDb2RlXCI6XCI5OTk5OTlcIixcIm9yZ05hbWVcIjpcIuaAu-WFrOWPuFwiLFwid2hvbGVPcmdDb2RlXCI6XCI5OTk5OTlcIixcImVtcGxveWVlTmFtZVwiOlwi5p2O5piO5YabXCIsXCJlbmFibGVkXCI6dHJ1ZSxcInVzZXJuYW1lXCI6XCIwMTM0MDI3NFwiLFwiYWNjb3VudE5vbkV4cGlyZWRcIjp0cnVlLFwiYWNjb3VudE5vbkxvY2tlZFwiOnRydWUsXCJjcmVkZW50aWFsc05vbkV4cGlyZWRcIjp0cnVlfSJ9.0VuHEtZCro0KEnbKcRQE-LJ24NK8FoWUIZSxgnfdwF4";
  //   // Cookies.set('jwt-token', token);
  //   Cookies.set('redirect-url', window.location.href);
  //   window.location.href='http://61.152.207.98/enduser/sp/sso/ytojwt17?enterpriseId=yto';
  } else {
    config.headers['jwt-token'] = token;
  }
  // if (oauth.isAuthenticated()) {
  // 判断是否存在token，如果存在的话，则每个http header都加上token
  // let authInfo = oauth.getAuthInfo();
  //config.headers.Authorization = authInfo.token_type + ' ' + authInfo.access_token;
  // }
  return config;
}, error => {
  // Do something with request error
  // console.log(1111,error); // for debug
  Promise.reject(error);
});

// respone interceptor
service.interceptors.response.use(
  response => {
    let {headers} = response;
    if (headers['jwt-token']) {
      sessionStorage.setItem('jwt-token', headers['jwt-token']);
  }
    // console.log('长时间未操作的返回结果：',response);
    // console.log('状态码：',response.status)
    // console.log(!+response.data.data)
    // console.log(!+response.data.status)
    // if(!response.data.data && !response.data.status) {
    //   console.log('1111jinxing')
    //   window.location.href = window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    //   console.log('jinxing')
    // }
    // if(!response.data.status) {
    //   // 刷新token失败，跳转登录页面。
    //   oauth.clearAuthInfo();
    //   window.location.href = window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    // }
    // console.log('xianzaideRESPONSE:',response)

    if (response.status === 401) {
      oauth.clearAuthInfo();
      //window.location = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
      window.location = 'http://61.152.207.98/enduser/sp/sso/ytojwt17?enterpriseId=yto';
    }
    // if (response.data.status !== 0 && response.config.responseType !== 'blob') {
    //   Message.error(response.data.message);
    //   return Promise.reject(response.data);
    // }
    if (response.config.responseType === 'blob') {
      return {
        data: response,
        filename: decodeURI(response.headers['content-disposition'])
      };
    }
    return response.data;
  },
  error => {
    // console.log('error长时间未操作的返回结果：',JSON.stringify(error));
    const originalRequest = error.config;
    if ([400].indexOf(error.response.status) > -1 && [-40001].indexOf(error.response.data.status) > -1 ) {
      MessageBox.confirm(`${error.response.data.message}`, '提交失败', {
        confirmButtonText: '关闭',
        showCancelButton:false,
        closeOnClickModal:false,
        dangerouslyUseHTMLString: true,
        type: 'error',
        center: true,
      });
      return ;
    }
    if ([403].indexOf(error.response.status) > -1) {
      Message.error(`403:${error.response.statusText}`);
    }
    if ([401].indexOf(error.response.status) > -1) {
      // 刷新token失败，跳转登录页面。
      oauth.clearAuthInfo();
      // console.log('跳转的页面：',window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : ''));
      //window.location = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
      // oauth.redirectToLogin(window.location.href);
      window.location = 'http://61.152.207.98/enduser/sp/sso/ytojwt17?enterpriseId=yto';
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      oauth.refreshToken().then((data) => {
        if (data) {
          return service.request(originalRequest);
        }
        // 刷新token失败，跳转登录页面。
        oauth.clearAuthInfo();
        oauth.redirectToLogin(window.location.href);
      });
    }
    Message.error(error.response.data.message);
    return Promise.reject(error);
  });

export default service;
