import status from './status'; // reducer Status
import sort from './sort'; // reducer sort
import { combineReducers } from 'redux';

const myReducer = combineReducers({
	status, // status : status
	sort // sort : sort
});


export default myReducer;