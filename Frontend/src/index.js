import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import reportWebVitals from './reportWebVitals';
import AuthReducer from './store/reducers/AuthReducer'
import TaskReducer from './store/reducers/TaskReducer'
import { EmailSharp } from '@material-ui/icons';

const RootReducer = combineReducers({
  auth:AuthReducer,
  email:TaskReducer
})


const logger = store => {
  return next =>{
    return action =>{
        console.log('[middleware] dipatching', action)
        const result = next(action)
          console.log('[middleware] next state', store.getState())
        return result
    }
  }
} 

const  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(RootReducer, composeEnhancers(applyMiddleware(logger, thunk)))


ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
