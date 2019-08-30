import * as types from './actions';
import Capture from '../components/Models/Captute';
const initialState = {
	data: [],
	data_batch: [],
	data_history: [],
	capture: new Capture(),
	min: null,
	max: null,
	fromDate:'',
	toDate:'',
	batchName:''
};
export default {
	name: types.NAME_REDUCER,
	reducer: (state = initialState, action) => {
		switch (action.type) {
			case types.GET_BATCH:
			case types.GET_LIST_DATA_CAPTURE_MONITORING:
			case types.GET_DATA_IMPORTED_HISTORY:
			case types.SET_CAPTURE:
				return {
					...state,
					...action.payload
				};
			default:
				return state;
		}
	}
};
