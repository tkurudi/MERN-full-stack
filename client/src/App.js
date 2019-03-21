import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from  './Utils/setAuthToken';
import {clearProfile} from './actions/profileActions';
import {setCurrentUser, logoutUser} from './actions/authActions';
import PrivateRoute from './components/common/privateRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';

import './App.css';

//check for token
if(localStorage.jwtToken) {
  //set the auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isauth
  store.dispatch(setCurrentUser(decoded))

  //check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime){
    //logout user
    store.dispatch(logoutUser());
        // clear current profile
    store.dispatch(clearProfile());
    //redirect to login
    window.location.href = '/login';
  }
}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
         <div className="App">
           <Navbar />
            <Route exact path="/" component={Landing}/>
            <div className="container">
            <Route exact path="/register" component={Register}/>
             <Route exact path="/login" component={Login}/>
            <Switch>
             <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            </Switch>
            <Switch>
             <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
            </Switch>
          </div>
           <Footer/>
             </div>
              </Router>
      </Provider>
    );
  }
}

export default App;
