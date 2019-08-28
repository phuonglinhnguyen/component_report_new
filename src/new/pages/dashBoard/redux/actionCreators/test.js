import * as types from '../actions';
import { callAPIGetData, callAPIGetDataUsers, callAPIGetDataUsersAssign } from './call_api';
export const getDataUserOnline = () => async (dispatch) => {
	const user_online = await dispatch(callAPIGetData());
	console.log(user_online);

	dispatch({
		type: types.GET_DATA_USERS_ONLINE,
		payload: {
			user_online: user_online
		},
		meta: {
			resource: types.NAME_REDUCER
		}
	});
};

export const getDataUsersAPI = () => async (dispatch) => {
	const users = await dispatch(callAPIGetDataUsers());
	dispatch({
		type: types.GET_DATA_USERS,
		payload: {
			users: users
		},
		meta: {
			resource: types.NAME_REDUCER
		}
	});
};

export const getDataUsersAssignAPI = () => async (dispatch) => {
	const user_assign = await dispatch(callAPIGetDataUsersAssign());
	console.log({ user_assign });

	dispatch({
		type: types.GET_DATA_USERS_ASSIGN,
		payload: {
			user_assign: user_assign
		},
		meta: {
			resource: types.NAME_REDUCER
		}
	});
};

export const setUsersAssign = (user_assign: any) => async (dispatch: any) => {
	dispatch({
		type: types.SET_USER_ASSIGN,
		payload: {
			user_assign
		},
		meta: {
			resource: types.NAME_REDUCER
		}
	});
};
