import { crudGetList, getDataObject } from '@dgtx/coreui';

export const callAPIGetProject = (input) => async (dispatch) => {
	const { projectId } = input;
	let data = await new Promise((resolve, reject) => {
		dispatch(
			crudGetList(
				'project',
				{ projectId },
				{
					onSuccess: ({ result: { data } }) => {
						resolve(data);
					},
					onFailure: (data) => {
						const code = getDataObject('result.body.Code', data) || 404;
						const message = getDataObject('result.body.Error', data) || 'get_data_error';
						resolve({ code, message });
					}
				}
			)
		);
	});
	return data;
};

export const callAPIGetBatch = (input) => async (dispatch) => {
	const { projectId, batchId } = input;
	let data = await new Promise((resolve, reject) => {
		dispatch(
			crudGetList(
				'batch_report',
				{ projectId, batchId },
				{
					onSuccess: ({ result: { data } }) => {
						resolve(data);
					},
					onFailure: (data) => {
						const code = getDataObject('result.body.Code', data) || 404;
						const message = getDataObject('result.body.Error', data) || 'get_data_error';
						resolve({ code, message });
					}
				}
			)
		);
	});
	return data;
};

export const callAPIGetDataImportedHistory = (input) => async (dispatch) => {
	const { projectId, min_result, max_result } = input;
	let data = await new Promise((resolve, reject) => {
		dispatch(
			crudGetList(
				'data_imported_history',
				{ projectId, min_result, max_result },
				{
					onSuccess: ({ result: { data } }) => {
						resolve(data);
					},
					onFailure: (data) => {
						const code = getDataObject('result.body.Code', data) || 404;
						const message = getDataObject('result.body.Error', data) || 'get_data_error';
						resolve({ code, message });
					}
				}
			)
		);
	});
	return data;
};

export const callAPIGetTaskInfo = (input) => async (dispatch) => {
	const { projectId } = input;
	let data = await new Promise((resolve, reject) => {
		dispatch(
			crudGetList(
				'user_task_info',
				{ projectId },
				{
					onSuccess: ({ result: { data } }) => {
						resolve(data);
					},
					onFailure: (data) => {
						const code = getDataObject('result.body.Code', data) || 404;
						const message = getDataObject('result.body.Error', data) || 'get_data_error';
						resolve({ code, message });
					}
				}
			)
		);
	});
	return data;
};

export const callAPIGetTaskCount = (input) => async (dispatch) => {
	const { projectId, processesId, instanceId } = input;
	let data = await new Promise((resolve, reject) => {
		dispatch(
			crudGetList(
				'task_count',
				{ projectId, processesId, instanceId },
				{
					onSuccess: ({ result: { data } }) => {
						resolve(data);
					},
					onFailure: (data) => {
						const code = getDataObject('result.body.Code', data) || 404;
						const message = getDataObject('result.body.Error', data) || 'get_data_error';
						resolve({ code, message });
					}
				}
			)
		);
	});
	return data;
};

export const callAPIInstancesDetail = (input) => async (dispatch) => {
	const { projectId, processesId, instanceId, taskId } = input;
	let data = await new Promise((resolve, reject) => {
		dispatch(
			crudGetList(
				'task_instances_detail',
				{ projectId, processesId, instanceId, taskId },
				{
					onSuccess: ({ result: { data } }) => {
						resolve(data);
					},
					onFailure: (data) => {
						const code = getDataObject('result.body.Code', data) || 404;
						const message = getDataObject('result.body.Error', data) || 'get_data_error';
						resolve({ code, message });
					}
				}
			)
		);
	});
	return data;
};

export const callAPIGetUserOnline = () => async (dispatch) => {
	let data = await new Promise((resolve, reject) => {
		dispatch(
			crudGetList(
				'user_onlines',
				{},
				{
					onSuccess: ({ result: { data } }) => {
						resolve(data);
					},
					onFailure: (data) => {
						const code = getDataObject('result.body.Code', data) || 404;
						const message = getDataObject('result.body.Error', data) || 'get_data_error';
						resolve({ code, message });
					}
				}
			)
		);
	});
	return data;
};

export const callAPIGetUserAssign = (input) => async (dispatch) => {
	const { projectId } = input;
	let data = await new Promise((resolve, reject) => {
		dispatch(
			crudGetList(
				'user_assign',
				{ projectId },
				{
					onSuccess: ({ result: { data } }) => {
						resolve(data);
					},
					onFailure: (data) => {
						const code = getDataObject('result.body.Code', data) || 404;
						const message = getDataObject('result.body.Error', data) || 'get_data_error';
						resolve({ code, message });
					}
				}
			)
		);
	});
	return data;
};
