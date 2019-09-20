import { crudGetList, getDataObject } from '@dgtx/coreui';
import { async } from 'q';
// group_project
export const callAPIGetAllGroup = () => async (dispatch) => {
	let data = await new Promise((resolve, reject) => {
		dispatch(
			crudGetList(
				'group_project',
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

export const callAPIGetProjectInfo = () => async (dispatch) => {
	let data = await new Promise((resolve, reject) => {
		dispatch(
			crudGetList(
				'project_info',
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
//task_instances_detail
