import * as types from '../actions';
import {
	callAPIGetBatch,
	callAPIGetDataImportedHistory,
	callAPIGetTaskInfo,
	callAPIGetTaskCount,
	callAPIInstancesDetail,
	callAPIGetUserAssign,
	callAPIGetUserOnline,
	callAPIGetProject
} from './call_api';
import { callAPIGetAllGroup } from '../../../dashBoard/redux/actionCreators/call_api';

export const getProject = (projectId) => async (dispatch) => {
	const data = callAPIGetProject({ projectId });
	dispatch({
		type: types.CAPTURE_MONITORING_GET_PROJECT,
		payload: {
			project: data
		},
		meta: {
			resource: types.NAME_REDUCER
		}
	});
};

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
			[`${batchId}`]: data
		},
		meta: {
			resource: types.NAME_REDUCER
		}
	});
};

export const getDataTaskCount = (projectId, processesId, instanceId) => async (dispatch, getState) => {
	const data = await dispatch(callAPIGetTaskCount({ projectId, processesId, instanceId }));
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

export const getDataImportedHistory = (projectId, min_result, max_result) => async (dispatch) => {
	const data = await dispatch(callAPIGetDataImportedHistory({ projectId, min_result, max_result }));

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

export const getDataTaskInfo = (projectId) => async (dispatch) => {
	const data = await dispatch(callAPIGetTaskInfo({ projectId }));

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

export const getInstancesDetail = (projectId, processesId, instanceId, taskId) => async (dispatch) => {
	const data = await dispatch(callAPIInstancesDetail({ projectId, processesId, instanceId, taskId }));

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
export const getUserAssign = (projectId) => async (dispatch) => {
	const data = await dispatch(callAPIGetUserAssign({ projectId }));

	dispatch({
		type: types.CAPTURE_MONITORING_GET_USER_ASSIGN,
		payload: {
			user_assign: data
		},
		meta: {
			resource: types.NAME_REDUCER
		}
	});
};
export const getUserOnline = () => async (dispatch) => {
	const data = await dispatch(callAPIGetUserOnline());

	dispatch({
		type: types.CAPTURE_MONITORING_GET_USER_ONLINE,
		payload: {
			user_online: data
		},
		meta: {
			resource: types.NAME_REDUCER
		}
	});
};
