import { GET_LIST, fetchJson } from '@dgtx/coreui';
import { UAC_ENDPOINT, APP_NAME } from '../../../constants';
export default (type: string, resource: string, params: any) => {
	switch (type) {
		case GET_LIST: {
			console.log({ params });

			// const { projectId } = params;
			// console.log(projectId);
			// return fetchJson(`${UAC_ENDPOINT}/app/${APP_NAME}/projects/${projectId}/tasks-assigned`, {
			// 	method: 'GET'
			// });
		}
		default:
			break;
	}
	return Promise.reject(`Provider ${resource} method:${type} not yet supported!`);
};
