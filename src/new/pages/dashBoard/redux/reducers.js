import * as types from './actions';

const initialState = {
	users: {},
	user_assign: [],
	user_online: []
};
export default {
	name: types.NAME_REDUCER,
	reducer: (state = initialState, action) => {
		switch (action.type) {
			case types.TEST_CONNECT_REDUCER:
			case types.GET_DATA_USERS:
			case types.GET_DATA_USERS_ONLINE:
			case types.GET_DATA_USERS_ASSIGN:
			case types.SET_USER_ASSIGN:
				return {
					...state,
					...action.payload
				};
			default:
				return state;
		}
	}
};