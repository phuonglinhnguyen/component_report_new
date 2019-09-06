import { GET_LIST, fetchJson } from '@dgtx/coreui';
import { UAC_ENDPOINT, APP_NAME } from '../../../constants';

export default (type: string, resource: string, params: any) => {
	switch (type) {
		case GET_LIST: {
			const { projectId } = params;
			return fetchJson(`${UAC_ENDPOINT}/apps/production/projects/${projectId}/tasks-assigned`, {
				method: 'GET'
			});
		}
		default:
			break;
	}
	return Promise.reject(`Provider ${resource} method:${type} not yet supported!`);
};
