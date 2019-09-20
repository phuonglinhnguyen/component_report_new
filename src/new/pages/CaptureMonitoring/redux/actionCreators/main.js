import * as types from '../actions';
import {
	callAPIGetBatch,
	callAPIGetDataImportedHistory,
	callAPIGetTaskInfo,
	callAPIGetTaskCount,
	callAPIInstancesDetail,
	callAPIGetUserAssign,
	callAPIGetUserOnline,
	callAPIGetProject,
	callAPIGetUsers,
	callAPIUpdateAssignee,
	callAPIVariablesTask,
	callAPIUnclaimAssignee,
	callAPICountImportedHistory,
	callAPIGetDocs,
	callAPICountDocs
} from './call_api';
import { callAPIGetAllGroup } from '../../../dashBoard/redux/actionCreators/CallAPI';

export const getProject = (projectId) => async (dispatch) => {
	const data = await dispatch(callAPIGetProject({ projectId }));

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

export const getCountData = (projectId) => async (dispatch) => {
	const data = await dispatch(callAPICountImportedHistory({ projectId }));
	dispatch({
		type: types.CAPTURE_MONITORING_COUNT,
		payload: {
			count: data
		},
		meta: {
			resource: types.NAME_REDUCER
		}
	});
	return data;
};
export const getCountDocs = (projectId, batchId) => async (dispatch) => {
	const data = await dispatch(callAPICountDocs({ projectId, batchId }));
	if (data.code) {
		dispatch({
			type: types.CAPTURE_MONITORING_COUNT_DOCS,
			payload: {
				count_docs: {}
			},
			meta: {
				resource: types.NAME_REDUCER
			}
		});
	} else {
		dispatch({
			type: types.CAPTURE_MONITORING_COUNT_DOCS,
			payload: {
				count_docs: data
			},
			meta: {
				resource: types.NAME_REDUCER
			}
		});
	}

	return data;
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

export const getUsers = () => async (dispatch) => {
	const users = await dispatch(callAPIGetUsers());
	dispatch({
		type: types.CAPTURE_MONITORING_GET_USERS,
		payload: {
			users: users
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

export const getDataBatchPerhour = (projectId, batchId, startDate, perHour, hour) => async (dispatch) => {
	if (startDate && perHour && hour) {
		const data = await dispatch(callAPIGetBatch({ projectId, batchId, startDate, perHour, hour }));
		dispatch({
			type: types.CAPTURE_MONITORING_GET_BATCH_PERHOUR,
			payload: {
				data_batch_perhour: data
			},
			meta: {
				resource: types.NAME_REDUCER
			}
		});
	}
};

export const getDataDocsMinMax = (projectId, batchId, min_doc, max_doc) => async (dispatch) => {
	if (min_doc && max_doc) {
		const data = await dispatch(callAPIGetDocs({ projectId, batchId, min_doc, max_doc }));
		if(data.code){
			dispatch({
				type: types.CAPTURE_MONITORING_GET_DOCS,
				payload: {
					data_docs: []
				},
				meta: {
					resource: types.NAME_REDUCER
				}
			});
		}else{
			dispatch({
				type: types.CAPTURE_MONITORING_GET_DOCS,
				payload: {
					data_docs: data
				},
				meta: {
					resource: types.NAME_REDUCER
				}
			});
		}

	}
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
	if (data.code) {
		dispatch({
			type: types.CAPTURE_MONITORING_GET_DATA_IMPORTED_HISTORY,
			payload: {
				data_history: []
			},
			meta: {
				resource: types.NAME_REDUCER
			}
		});
	} else {
		dispatch({
			type: types.CAPTURE_MONITORING_GET_DATA_IMPORTED_HISTORY,
			payload: {
				data_history: data
			},
			meta: {
				resource: types.NAME_REDUCER
			}
		});
	}
};

export const getDataTaskInfo = (projectId) => async (dispatch) => {
	const data = await dispatch(callAPIGetTaskInfo({ projectId }));
	if (data.code) {
		dispatch({
			type: types.CAPTURE_MONITORING_GET_TASK_INFO,
			payload: {
				tasks: []
			},
			meta: {
				resource: types.NAME_REDUCER
			}
		});
	} else {
		dispatch({
			type: types.CAPTURE_MONITORING_GET_TASK_INFO,
			payload: {
				tasks: data
			},
			meta: {
				resource: types.NAME_REDUCER
			}
		});
	}
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

export const setSteps = (steps: any) => async (dispatch: any) => {
	dispatch({
		type: types.CAPTURE_MONITORING_SET_STEP,
		payload: {
			steps
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
			steps: data
		},
		meta: {
			resource: types.NAME_REDUCER
		}
	});

	return data;
};

export const updateStepArr = (user_name, projectId, task_ids) => async (dispatch: any) => {
	await dispatch(callAPIUpdateAssignee({ user_name: user_name, projectId: projectId, task_ids: task_ids }));
};

export const unclaimStep = (projectId, task_ids) => async (dispatch: any) => {
	await dispatch(callAPIUnclaimAssignee({ projectId, task_ids }));
};

export const getVariablesTask = (projectId, instancesId, executionsId) => async (dispatch) => {
	const data = await dispatch(callAPIVariablesTask({ projectId, instancesId, executionsId }));
	return data;
};
