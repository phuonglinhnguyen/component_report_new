import { GET_LIST, fetchJson } from '@dgtx/coreui';
import { UAC_ENDPOINT } from '../../../constants';
export default (type: string, resource: string, params: any) => {
	switch (type) {
		case GET_LIST: {
			return fetchJson(`${UAC_ENDPOINT}/apps/production-admin/projects?user_access=true`, {
				method: 'GET'
			});
		}
		default:
			break;
	}
	return Promise.reject(`Provider ${resource} method:${type} not yet supported!`);
};
