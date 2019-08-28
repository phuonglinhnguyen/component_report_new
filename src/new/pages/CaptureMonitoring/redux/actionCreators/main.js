import * as types from '../actions';
import { getDataObject } from '@dgtx/coreui';
import { cloneDeep } from 'lodash';
import { getProjects } from '../../../../../providers/data/mockData/projects';

export const onTest = () => async (dispatch, getState) => {
	const state = getDataObject(`core.resources.${types.NAME_REDUCER}.data`, cloneDeep(getState()));
	const test = getDataObject('test', state);
	dispatch({
		type: types.TEST_CONNECT_REDUCER,
		payload: {
			test: !test
		},
		meta: {
			resource: types.NAME_REDUCER
		}
	});
};

export const getData = () => async (dispatch) => {
	const data = getProjects();

	dispatch({
		type: types.GET_LIST_DATA_CAPTURE_MONITORING,
		payload: {
			data: data
		},
		meta: {
			resource: types.NAME_REDUCER
		}
	});
};
export const setCapture = (capture: any) => async (dispatch: any) => {
	dispatch({
		type: types.SET_CAPTURE,
		payload: {
			capture
		},
		meta: {
			resource: types.NAME_REDUCER
		}
	});
};
export const setSelectedCapture = (capture: any) => async (dispatch: any) => {
	dispatch({
		type: types.SET_SELECTED_CAPTURE,
		payload: {
			capture
		},
		meta: {
			resource: types.NAME_REDUCER
		}
	});
};
