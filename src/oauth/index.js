// import VueCookie from 'vue-cookie';
import Cookies from 'js-cookie';
import axios from 'axios';
import rs from 'jsrsasign';

const AUTH = 'auth';
const KEY = 'key';
const USER = 'user';

const FULL_CHARTER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopgrstuvwxyz';

const config = {
  oauth2: {
    ssoServer: process.env.OAUTH2_SSO_SERVER,
    clientId: process.env.OAUTH2_CLIENT_ID,
    clientSecret: process.env.OAUTH2_CLIENT_SECRET
  }
};

class OAuth {
  getAuthInfo() {
    let auth = sessionStorage.getItem(AUTH);
    return JSON.parse(auth);
  }

  setAuthInfo(authInfo) {
    sessionStorage.setItem(AUTH, JSON.stringify(authInfo));
  }

  clearAuthInfo() {
    sessionStorage.removeItem(AUTH);
    sessionStorage.removeItem(USER);
    Cookies.remove('redirect_uri');
  }

  getPublicKey() {
    return sessionStorage.getItem(KEY);
  }

  setPublicKey(key) {
    return sessionStorage.setItem(KEY, key);
  }

  getUserInfo() {
    let user = sessionStorage.getItem(USER);
    return JSON.parse(user);
  }

  setUserInfo(user) {
    sessionStorage.setItem(USER, JSON.stringify(user));
  }

  isAuthenticated() {
    // 从sessionStorage中读取登录信息。
    let auth = this.getAuthInfo();

    if (auth !== null && auth.access_token !== undefined) {
      // 验证token.
      let key = this.getPublicKey();
      let jwtToken = auth.access_token;
      let jwsToken = auth.access_token.slice(0, auth.access_token.lastIndexOf('.'));
      let jws = rs.jws.JWS;
      let header = jws.parse(jwsToken).headerObj;
      let verifyResult = jws.verifyJWT(jwtToken, key, {
        alg: [header.alg]
      });
      // let menu = this.getRouterMenu();
      return verifyResult;
    }
    return false;
  }


  /**
   * 用户授权
   */
  authenticate(to, mode) {
    // 从sessionStorage里面获取token.
    // 获取授权代码
    let code = to.query['code'];
    if (code === undefined) {
      let redirectUri = window.location.origin + (mode === 'history' ? '/' + to.fullPath : '/#' + to.fullPath);
      this.redirectToLogin(redirectUri);
    } else {
      let state = to.query['state'];
      return this.retrieveToken(code, state);
    }
  }

  redirectToLogin(redirectUri) {
    // 清空缓存的token信息。
    this.clearAuthInfo();

    // 刷新state
    let c1 = FULL_CHARTER[Math.floor(Math.random() * 52)];
    let c2 = FULL_CHARTER[Math.floor(Math.random() * 52)];
    let c3 = FULL_CHARTER[Math.floor(Math.random() * 52)];
    let c4 = FULL_CHARTER[Math.floor(Math.random() * 52)];
    let c5 = FULL_CHARTER[Math.floor(Math.random() * 52)];
    let c6 = FULL_CHARTER[Math.floor(Math.random() * 52)];

    // 保存redirect_uri到cookie中.
    // let redirectUri = window.location.origin + '/' + currentPath;
    Cookies.set('redirect_uri', redirectUri);
    // 有授权代码，重定向到授权页面
    let path = config.oauth2.ssoServer;
    path = path + '/oauth/authorize?client_id=';
    path = path + config.oauth2.clientId;
    path = path + '&client_secret=';
    path = path + config.oauth2.clientSecret;
    path = path + '&response_type=code&state=';
    path = path + (c1 + c2 + c3 + c4 + c5 + c6);
    path = path + '&redirect_uri=';
    path = path + encodeURIComponent(redirectUri);
    window.location = path;
  }

  refreshToken() {
    let self = this;
    // form数据
    let form = new URLSearchParams();
    form.append('grant_type', 'refresh_token');
    form.append('refresh_token', this.getAuthInfo().refresh_token);

    var http = axios.create({
      baseURL: '/oauth',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return http.post('/refresh_token', form).then(function (response) {
      if (response.status === 200) {
        // 返回成功
        self.setAuthInfo(response.data);

        return true;
      }
      return false;
    }).catch(function (error) {
      console.error(error);
      return false;
    });
  }

  retrieveToken(code, state) {
    let self = this;

    let redirectUri = Cookies.get('redirect_uri');

    // form数据
    let form = new URLSearchParams();
    form.append('state', state);
    form.append('grant_type', 'authorization_code');
    form.append('code', code);
    form.append('redirect_uri', redirectUri);

    let http = axios.create({
      baseURL: '/oauth',
      auth: {
        username: config.oauth2.clientId,
        password: config.oauth2.clientSecret
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return http({
      method: 'post',
      url: '/token',
      data: form
    }).then(function (response) {
      if (response.status === 200) {
        // 返回成功
        self.setAuthInfo(response.data);

        // 设置登录信息.
        let accessToken = response.data.access_token;
        let jwsToken = accessToken.slice(0, accessToken.lastIndexOf('.'));
        let jws = rs.jws.JWS;
        let payload = jws.parse(jwsToken).payloadObj;
        self.setUserInfo({
          user: payload.user_name,
          roles: payload.authorities
        });
        // 读取可以
        let key = sessionStorage.getItem(KEY);
        if (key === null) {
          // 获取key
          let http = axios.create({
            baseURL: '/oauth'
          });
          let authInfo = self.getAuthInfo();
          http.defaults.headers.Authorization = authInfo.token_type + ' ' + authInfo.access_token;

          return http.get('token_key').then(response => {
            self.setPublicKey(response.data.value);

          });
        }
        return true;
      }
      return new Error('oops');
    }).catch(function (error) {
      console.log(error);
      console.error(error);
      return error;
    });
  }

  /**
   * 根据用户取路由菜单
   */
  routerMenu() {
    let self = this;
    let http = axios.create({
      baseURL: process.env.OAUTH2_ROUTER_SERVER,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return http.post('/getRouterMenu', self.getUserInfo);
  }

  /**
   * 后端退出
   */
  authLogout() {
    let self = this;
    let http = axios.create({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return http.post('/logout').then(() => {
      // 清空token
      self.clearAuthInfo();
      // 跳回首页
      window.location = '/';
    });
  }

  /**
   * 前端退出
   */
  logout() {
    let self = this;
    // 清空token
    self.clearAuthInfo();
    // 跳回首页
    window.location = '/';
  }
}


export default new OAuth();
