// imrc 
import React, { Component ,Fragment} from 'react'
/* impr  */
// import React, { PureComponent } from 'react'
import { Button } from 'antd-mobile';

class Login extends Component{
  nextTap = ()=>{
    const {history} = this.props;
    history.push('/home')
  }
  render(){
    return (
      <Fragment>
        <Button onClick={this.nextTap}>login.....</Button>
      </Fragment>
    )
  }
}

export default Login;