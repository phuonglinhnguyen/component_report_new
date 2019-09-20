import * as types from '../actions';

export const executeActionReducer = (type, payload) => {
	return { type, payload, meta: { resource: types.NAME_REDUCER } };
};

export const unmount = () => async (dispatch, getState) => {
	dispatch(executeActionReducer(types.GET_GROUP_PROJECTS, {}));
};