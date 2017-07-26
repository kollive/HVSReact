import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading, message } from './items';

export default combineReducers({
    items,
    itemsHasErrored,
    itemsIsLoading,
    message  
});
