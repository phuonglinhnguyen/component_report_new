import { crudGetList, getDataObject } from '@dgtx/coreui';

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

export const callAPIGetDataImportedHistory = () => async (dispatch) => {
	// const { min_result, max_result} = input;
	let data = await new Promise((resolve, reject) => {
		dispatch(
			crudGetList(
				'data_imported_history',
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

export const callAPIGetTaskInfo = () => async (dispatch) => {
	let data = await new Promise((resolve, reject) => {
		dispatch(
			crudGetList(
				'user_task_info',
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

export const callAPIGetTaskCount = (input) => async (dispatch) => {
	const {processesId, instanceId } = input;
	let data = await new Promise((resolve, reject) => {
		dispatch(
			crudGetList(
				'task_count',
				{ processesId, instanceId },
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
