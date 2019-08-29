import * as types from '../actions';
import { callAPIGetData, callAPIGetBatch, callAPIGetDataImportedHistory } from './call_api';

export const getDataImportedHistory = (projectId) => async (dispatch) => {
	const data = await dispatch(callAPIGetDataImportedHistory({ projectId }));
	console.log({ data });

	dispatch({
		type: types.GET_DATA_IMPORTED_HISTORY,
		payload: {
			data: data
		},
		meta: {
			resource: types.NAME_REDUCER
		}
	});
};

export const getDataBatch = (projectId, batchId) => async (dispatch) => {
	const data = await dispatch(callAPIGetBatch({ projectId, batchId }));
	console.log({ data });

	dispatch({
		type: types.GET_BATCH,
		payload: {
			data: data
		},
		meta: {
			resource: types.NAME_REDUCER
		}
	});
};
