import * as types from '../actions';
import {
	callAPIGetBatch,
	callAPIGetDataImportedHistory,
	callAPIGetTaskInfo,
	callAPIGetTaskCount,
	callAPIInstancesDetail
} from './call_api';
import { callAPIGetAllGroup } from '../../../dashBoard/redux/actionCreators/call_api';

export const getGroup = () => async (dispatch) => {
	const data = callAPIGetAllGroup();

	dispatch({
		type: types.CAPTURE_MONITORING_GET_GROUP_PRJ,
		payload: {
			group_prj: data
		},
		meta: {
			resource: types.NAME_REDUCER
		}
	});
};

export const getDataBatch = (projectId, batchId) => async (dispatch) => {
	const data = await dispatch(callAPIGetBatch({ projectId, batchId }));
	dispatch({
		type: types.CAPTURE_MONITORING_GET_BATCH,
		payload: {
			data_batch: data
		},
		meta: {
			resource: types.NAME_REDUCER
		}
	});
};

export const getDataTaskCount = (processesId, instanceId ) => async (dispatch, getState) => {
	const data = await dispatch(callAPIGetTaskCount({ processesId, instanceId }));
	console.log(data);
	dispatch({
		type: types.CAPTURE_MONITORING_GET_TASK_COUNT,
		payload: {
			[`${processesId}_${instanceId}`]: data
		},
		meta: {
			resource: types.NAME_REDUCER
		}
	});
};

export const getDataImportedHistory = () => async (dispatch) => {
	// const data = await dispatch(callAPIGetDataImportedHistory({ projectId,min_result, max_result, batch_name, from_date, to_date}));
	const data = await dispatch(callAPIGetDataImportedHistory());

	dispatch({
		type: types.CAPTURE_MONITORING_GET_DATA_IMPORTED_HISTORY,
		payload: {
			data_history: data
		},
		meta: {
			resource: types.NAME_REDUCER
		}
	});
};

export const getDataTaskInfo = () => async (dispatch) => {
	// const data = await dispatch(callAPIGetDataImportedHistory({ projectId,min_result, max_result, batch_name, from_date, to_date}));
	const data = await dispatch(callAPIGetTaskInfo());

	dispatch({
		type: types.CAPTURE_MONITORING_GET_TASK_INFO,
		payload: {
			tasks: data
		},
		meta: {
			resource: types.NAME_REDUCER
		}
	});
};

export const setCapture = (capture: any) => async (dispatch: any) => {
	dispatch({
		type: types.CAPTURE_MONITORING_SET_CAPTURE,
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
		type: types.CAPTURE_MONITORING_SET_SELECTED_CAPTURE,
		payload: {
			capture
		},
		meta: {
			resource: types.NAME_REDUCER
		}
	});
};
export const setSelectedStep = (task: any) => async (dispatch: any) => {
	dispatch({
		type: types.CAPTURE_MONITORING_SET_SELECTED_STEP,
		payload: {
			task
		},
		meta: {
			resource: types.NAME_REDUCER
		}
	});
};

export const getInstancesDetail = (processesId, instanceId,taskId) => async (dispatch) => {
	const data = await dispatch(callAPIInstancesDetail({processesId, instanceId,taskId}));

	dispatch({
		type: types.CAPTURE_MONITORING_GET_INSTANCES_DETAIL,
		payload: {
			step: data
		},
		meta: {
			resource: types.NAME_REDUCER
		}
	});
};
