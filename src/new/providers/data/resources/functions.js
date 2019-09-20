import { GET_LIST, fetchJson } from '@dgtx/coreui';
import { UAC_ENDPOINT, APP_NAME } from '../../../constants';
export default (type, resource, params) => {
	switch (type) {
		case GET_LIST: {
			const { projectId, role } = params;
			if(projectId && role){
				return fetchJson(`${UAC_ENDPOINT}/apps/${APP_NAME}/projects/${projectId}/functions?role=${role}`, {
					method: 'GET'
				});
			}
			else {
				return Promise.resolve({
					status: 400,
					headers: {},
					json: []
				});
			}
		}
		default:
			break;
	}
	return Promise.reject(`Provider ${resource} method:${type} not yet supported!`);
};
