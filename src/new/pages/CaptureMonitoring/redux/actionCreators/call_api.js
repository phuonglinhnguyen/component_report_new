import { crudGetList, getDataObject, crudUpdate } from '@dgtx/coreui';

export const callAPIGetProject = (input) => async (dispatch) => {
	const { projectId } = input;

	let data = await new Promise((resolve, reject) => {
		dispatch(
			crudGetList(
				'project_user',
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
	const { projectId, batchId, startDate, perHour, hour } = input;
	let data = await new Promise((resolve, reject) => {
		dispatch(
			crudGetList(
				'batch_report',
				{ projectId, batchId, startDate, perHour, hour },
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

export const callAPIGetDocs = (input) => async (dispatch) => {
	const { projectId, batchId, min_doc, max_doc } = input;
	let data = await new Promise((resolve, reject) => {
		dispatch(
			crudGetList(
				'docs_report',
				{ projectId, batchId, min_doc, max_doc },
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

export const callAPICountDocs = (input) => async (dispatch) => {
	const { projectId, batchId } = input;
	let data = await new Promise((resolve, reject) => {
		dispatch(
			crudGetList(
				'count_docs',
				{ projectId, batchId },
				{
					onSuccess: ({ result }) => {
						const data = result.data;
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

export const callAPICountImportedHistory = (input) => async (dispatch) => {
	const { projectId } = input;
	let data = await new Promise((resolve, reject) => {
		dispatch(
			crudGetList(
				'count_data_history',
				{ projectId },
				{
					onSuccess: ({ result }) => {
						const data = result.data;
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
					onSuccess: ({ result }) => {
						const data = result.data;
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

export const callAPIGetUsers = () => async (dispatch) => {
	let data = await new Promise((resolve, reject) => {
		dispatch(
			crudGetList(
				'users',
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

export const callAPIUpdateAssignee = (input) => async (dispatch) => {
	const { user_name, projectId, task_ids } = input;
	let data = await new Promise((resolve, reject) => {
		dispatch(
			crudUpdate(
				'assignee',
				{ user_name: user_name, projectId, task_ids },
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

export const callAPIUnclaimAssignee = (input) => async (dispatch) => {
	const { projectId, task_ids } = input;
	let data = await new Promise((resolve, reject) => {
		dispatch(
			crudUpdate(
				'unclaim',
				{ projectId, task_ids },
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

export const callAPIVariablesTask = (input) => async (dispatch) => {
	const { projectId, instancesId, executionsId } = input;
	let data = await new Promise((resolve, reject) => {
		dispatch(
			crudGetList(
				'variables_task',
				{ projectId, instancesId, executionsId },
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
