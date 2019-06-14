// imrc 
import React, { Component ,Fragment} from 'react'
/* impr  */
// import React, { PureComponent } from 'react'
import  { connect } from 'react-redux'
import { Button } from 'antd-mobile';
import { asyncPostLogin } from '@/store/actions/common';

// react-redux 中 connect 第一个参数是函数，第二个参数是对象

@connect(
  state=>(
    {
      loginInfo:state.common.loginInfo, // 页面获取方式 this.props.loginInfo
      registerInfo:state.common.registerInfo, // 页面获取方式 this.props.registerInfo
    }
  ),
  {
    asyncPostLogin
  }
)
class Login extends Component{
  nextTapLink = ()=>{
    const {history} = this.props;
    history.push('/home');
  }
  nextTapLogin = ()=>{
    const {asyncPostLogin} = this.props;
    asyncPostLogin();
  }
  render(){
    console.log("this.props.....",this.props.loginInfo);
    console.log("registerInfo",this.props.registerInfo)
    return (
      <Fragment>
        <Button onClick={this.nextTapLink}>跳转到home页面</Button>
        <Button onClick={this.nextTapLogin}>触发登录接口</Button>
      </Fragment>
    )
  }
}

export default Login;