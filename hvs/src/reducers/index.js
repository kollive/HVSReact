import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading, message, ping } from './items';
//import { reducer as routerReducer } from 'redux-tower';

export default combineReducers({
   // routerReducer,
    items,
    itemsHasErrored,
    itemsIsLoading,
    message,
    ping
});
