# MERN-full-stack
full stack, mongoDB, React , Redux, JWT auth. App to hold different users profiles for their technical abilities. 

skipts so far is 

npm install && npm run server 
npm run dev - to run both back and and front end
plenty of routes to test 

 ----
setting up store 
import { createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk]


const store = createStore(rootReducer,
     initialState,
      compose(applyMiddleware(...middleware), 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

));


export default store 
 ----- 
 combine reducers 
 ------
 import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';



export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer
}); 

     ------
     import provider into app.js and store 
     import { Provider } from 'react-redux';
      import store from './store';
      
      -----
      make action types and recuders folders 
      action example 
      export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading()) 
    axios.get('/api/profile')
    .then(res =>
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        )
    .catch(err =>
        dispatch({
            type: GET_PROFILE,
            payload: {}
        }))

}
make sure to import types 

reducer example 

    const initialState = {
    profile: null,
    profiles: null,
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case PROFILE_LOADING:
            return{
                ...state,
                loading: true
            };
            case GET_PROFILE:
                return {
                    ...state,
                    Profile: action.payload,
                    loading: false
                };
            case CLEAR_CURRENT_PROFILE:
                return {
                    ...state,
                    profile: null
                }
        default:
            return state;
    }
}
 ----
 type example 
 export const GET_PROFILES = 'GET_PROFILES;'
 ----
 
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading()) 
    axios.get('/api/profile')
    .then(res =>
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        )
    .catch(err =>
        dispatch({
            type: GET_PROFILE,
            payload: {}
        }))

}
---