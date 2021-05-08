import { createStore, combineReducers, applyMiddleware, bindActionCreators  } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {userinfo} from '../reducers/login';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            userinfo: userinfo
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
};

      //  export default combineReducers({
       //     userinfo: userinfo
        //});

