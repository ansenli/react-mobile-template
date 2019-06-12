import basicRequest from '@/utils/request-basic';
import request from '@/utils/request';
import axios from 'axios';
import qs from 'qs';

//  接口模板
export default {
  // 更新token
  refreshToken(token,keyParam) {
    let data = {};
    let header = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    header[keyParam] = token;
    data[keyParam] = token;
    return request({
      url: '/user/login',
      method: 'post',
      data: qs.stringify(data),
      headers:header
    });
  },
  // 登录
  toLogin(data) {
    return request({
      url: '/user/login',
      method: 'post',
      data: {data}
    });
  },
  //查询列表
/*  login(data) {
    return ({
      url: '/login',
      method: 'post',
      params: qs.stringify(data)
    });
  },*/

  login(data){
    return axios.post('/login',qs.stringify(data));
  },

  //根据员工号查询权限
  getAuthoritysByEmployeeCode(query) {
    return basicRequest({
      url: '/users/authorities',
      method: 'get',
      params: query
    });
  },
  //获取验证码图片
  getVerifyPic() {
    return request({
      url: '/users/getVerifyCode',
      method: 'get'
    });
  },
  //验证图片验证码是否正确
  checkPicCode(data) {
    return request({
      url: '/users/valiGraphics',
      method: 'post',
      data: {graphicsCode: data}
    });
  },
  // 通过角色获取权限列表
  findRoleList(){
    return request({
      url: '/permission/getPermisssionListByRoleId',
      method: 'post',
    });
  },
  // 获取工号和姓名
  getStaff(){
    return request({
      url: '/permission/getStaff',
      method: 'post',
    });
  }

};

