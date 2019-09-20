import { crudGetList } from '@dgtx/coreui';
import { getValueByObject } from '@dgtx/core-component-ui';
import * as types from '../actions';
import { I18n } from 'react-redux-i18n';

// group_project
export const callAPIGetAllGroup = () => async (dispatch) => {
	const mes404 = `${I18n.t(`${types.KEY_TRANSLATE}.groups_is_empty`)}`
	let data = await new Promise((resolve, reject) => {
		dispatch(
			crudGetList(
				'group_project',
				{},
				{
					onSuccess: (res) => {
						let data = getValueByObject(res, 'result.data', []);
						if(data[0]){
							resolve(data);
						}
						else{
							resolve({ code: 404, message: mes404 });
						}
					},
					onFailure: (data) => {
						const code = getValueByObject(data, 'result.body.Code', 404);
						const message = getValueByObject(data, 'result.body.Error', mes404);
						resolve({ code, message });
					}
				}
			)
		);
	});
	return data;
}

export const callAPIGetProjectInfo = () => async (dispatch) => {
	const mes404 = `${I18n.t(`${types.KEY_TRANSLATE}.projects_is_empty`)}`
	let data = await new Promise((resolve, reject) => {
		dispatch(
			crudGetList(
				'project_info',
				{},
				{
					onSuccess: (res) => {
						let data = getValueByObject(res, 'result.data', []);
						if(data[0]){
							resolve(data);
						}
						else{
							resolve({ code: 404, message: mes404 });
						}
					},
					onFailure: (data) => {
						const code = getValueByObject(data, 'result.body.Code', 404);
						const message = getValueByObject(data, 'result.body.Error', mes404);
						resolve({ code, message });
					}
				}
			)
		);
	});
	return data;
};

export const callAPIGetFunctions = ({ projectId, role }) => async (dispatch) => {
	const mes404 = `${I18n.t(`${types.KEY_TRANSLATE}.functions_is_empty`)}`
	let data = await new Promise((resolve, reject) => {
		dispatch(
			crudGetList(
				'functions',
				{projectId, role},
				{
					onSuccess: (res) => {
						let data = getValueByObject(res, 'result.data', []);
						if(data[0]){
							resolve(data);
						}
						else{
							resolve({ code: 404, message: mes404 });
						}
					},
					onFailure: (data) => {
						const code = getValueByObject(data, 'result.body.Code', 404);
						const message = getValueByObject(data, 'result.body.Error', mes404);
						resolve({ code, message });
					}
				}
			)
		);
	});
	return data;
};
