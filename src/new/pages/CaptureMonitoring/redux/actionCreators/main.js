import * as types from '../actions';
import { getDataObject } from '@dgtx/coreui';
import { cloneDeep } from 'lodash';
import { getProjects } from '../../../../../providers/data/mockData/projects';
import { callAPIGetBatch, callAPIGetDataImportedHistory } from './call_api';

export const getDataBatch = (projectId, batchId) => async (dispatch) => {
	const data = await dispatch(callAPIGetBatch({ projectId, batchId }));
	dispatch({
		type: types.GET_BATCH,
		payload: {
			data_batch: data
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
export const getDataImportedHistory = (projectId, min_result, max_result, batch_name, from_date, to_date) => async (dispatch) => {
	const data = await dispatch(callAPIGetDataImportedHistory({ projectId,min_result, max_result, batch_name, from_date, to_date}));
	dispatch({
		type: types.GET_DATA_IMPORTED_HISTORY,
		payload: {
			data_history: data
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
