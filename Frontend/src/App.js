import logo from './logo.svg';
import React, {useState, useEffect} from 'react'
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link, useHistory, Redirect } from "react-router-dom";
import Login from './authentication/Login/Login'
import Singup from './authentication/Singup/singup'
import Home from './component/home/Home'
import OutlinedCard from './component/home/flexbox'
import {AuthenticRoute, LogedInRoute} from './PrivateRoute'
import {useDispatch, useSelector} from 'react-redux'
import {loggedInUserInfo} from './store/actions/Auth'
import EmailDetail from './component/home/EmailDetail'

function App() {

  const dispatch = useDispatch()

  const config = { headers: { 
    'Content-Type':'application/json',
    'Authorization': "Bearer "+localStorage.getItem('access_token')
  }}

useEffect(() => {
    dispatch(loggedInUserInfo(config))
    
}, [])

  return (
    <div className="App">
      <Router>
  
        <Switch>  
          <LogedInRoute exect path='/Login' component={Login}/>
          <LogedInRoute exect path='/singup' component={Singup}/>
          <AuthenticRoute exect path='/email/:id' component={EmailDetail}/>
          <AuthenticRoute exect path='/' component={Home}/>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
