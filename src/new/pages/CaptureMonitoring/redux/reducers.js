import * as types from './actions';
import Capture from '../components/Models/Captute';
const initialState = {
	data: [],
	capture: new Capture()
};
export default {
	name: types.NAME_REDUCER,
	reducer: (state = initialState, action) => {
		switch (action.type) {
			case types.GET_LIST_DATA_CAPTURE_MONITORING:
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
