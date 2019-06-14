import axios from 'axios';
//import oauth from '@/oauth';
// import Cookies from 'js-cookie';
//import {Message,MessageBox} from 'element-ui';

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
  let token = sessionStorage.getItem('jwt-token');
  if(!token || token === '') {
  } else {
    config.headers['jwt-token'] = token;
  }
  return config;
}, error => {
  Promise.reject(error);
});

// respone interceptor
service.interceptors.response.use(
  response => {
    let {headers} = response;
    if (headers['jwt-token']) {
      sessionStorage.setItem('jwt-token', headers['jwt-token']);
  }
    if (response.status === 401) {
      //oauth.clearAuthInfo();
      //window.location = 'http://61.152.207.98/enduser/sp/sso/ytojwt17?enterpriseId=yto';
    }
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
    // if ([400].indexOf(error.response.status) > -1 && [-40001].indexOf(error.response.data.status) > -1 ) {
    //   MessageBox.confirm(`${error.response.data.message}`, '提交失败', {
    //     confirmButtonText: '关闭',
    //     showCancelButton:false,
    //     closeOnClickModal:false,
    //     dangerouslyUseHTMLString: true,
    //     type: 'error',
    //     center: true,
    //   });
    //   return ;
    // }
    // if ([403].indexOf(error.response.status) > -1) {
    //   Message.error(`403:${error.response.statusText}`);
    // }
    // if ([401].indexOf(error.response.status) > -1) {
    //   // 刷新token失败，跳转登录页面。
    //   oauth.clearAuthInfo();
    //   window.location = 'http://61.152.207.98/enduser/sp/sso/ytojwt17?enterpriseId=yto';
    // }
    // if (error.response.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;

    //   oauth.refreshToken().then((data) => {
    //     if (data) {
    //       return service.request(originalRequest);
    //     }
    //     // 刷新token失败，跳转登录页面。
    //     oauth.clearAuthInfo();
    //     oauth.redirectToLogin(window.location.href);
    //   });
    // }
    // Message.error(error.response.data.message);
    return Promise.reject(error);
  });

export default service;
