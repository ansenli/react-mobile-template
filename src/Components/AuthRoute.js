
import React,{ PureComponent,Fragment } from 'react'
import {withRouter } from 'react-router-dom'
import { Button } from 'antd-mobile';
// 这里使用修饰符，需要在config-override.js 中进行配置
@withRouter
class Home extends PureComponent{
  
  componentDidMount(){  
    console.log("this.props.....",this.props)  
    const {history,location} = this.props;
    if(location.pathname === '/'){
      history.push('/login')
    }else {
      return null;
    }
   
  }
  render(){
    return (
      <Fragment>
        <Button>authRouter.....</Button>
      </Fragment>
    )
  }
}
export default Home;