import { crudGetList, getDataObject } from '@dgtx/coreui';
export const callAPIGetDataImportedHistory = (input) => async (dispatch) => {
	const { projectId } = input;
	let data = await new Promise((resolve, reject) => {
		dispatch(
			crudGetList(
				'data_imported_history',
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