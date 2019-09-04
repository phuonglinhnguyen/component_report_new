import * as types from '../actions';
import { callAPIGetProjectInfo, callAPIGetAllGroup } from './call_api';
export const getDataGroupProject = () => async (dispatch) => {
	const data = await dispatch(callAPIGetAllGroup());

	dispatch({
		type: types.GET_PROJECTS_INFO,
		payload: {
			group_prj: data
		},
		meta: {
			resource: types.NAME_REDUCER
		}
	});
};

export const getDataProjectInfo = () => async (dispatch) => {
	const data = await dispatch(callAPIGetProjectInfo());

	dispatch({
		type: types.GET_PROJECTS_INFO,
		payload: {
			projects: data
		},
		meta: {
			resource: types.NAME_REDUCER
		}
	});
};
