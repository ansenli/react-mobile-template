import React, { Fragment} from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import { Provider } from 'react-redux'
import configStore from './store';

import  './App.less';
const store = configStore();

/* imd  */


import Home from 'Container/Home';
import Login from 'Container/Login';
import Register from 'Container/Register';
import User from 'Container/User';
import AuthRoute from 'Components/AuthRoute'
function App() {
  console.log("store......",store)
  return (
    <Fragment>
      <Provider store = {store}>
        <BrowserRouter>
          <AuthRoute></AuthRoute>
          <Switch>
            {/* <Route path="/" exact component = {} ></Route> */}
            <Route path="/home" component = {Home} ></Route>
            <Route path="/login" component = {Login} ></Route>
            <Route path="/register" component = {Register} ></Route>
            <Route path="/user" component = {User} ></Route>
          </Switch>
        </BrowserRouter>
      </Provider>
    </Fragment>
  );
}

export default App;
