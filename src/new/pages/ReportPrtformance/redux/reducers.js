import * as types from './actions';
const initialState = {
	data:[],
};
export default {
	name: types.NAME_REDUCER,
	reducer: (state = initialState, action) => {
		switch (action.type) {
			case types.GET_LIST_DATA_REPORT:
				return {
					...state,
					...action.payload
				};
			default:
				return state;
		}
	}
};
