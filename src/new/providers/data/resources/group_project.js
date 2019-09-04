import { GET_LIST, fetchJson } from '@dgtx/coreui';
import { API_ENDPOINT } from '../../../constants';
export default (type: string, resource: string, params: any) => {
	switch (type) {
		case GET_LIST: {
      // https://sit-apollo.digi-texx.vn/api/apps/administrator/groups/all
			return fetchJson(`${API_ENDPOINT}/apps/production-admin/groups/all`, {
				method: 'GET'
			});
		}
		default:
			break;
	}
	return Promise.reject(`Provider ${resource} method:${type} not yet supported!`);
};
