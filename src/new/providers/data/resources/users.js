import { GET_LIST, fetchJson } from '@dgtx/coreui';
import { UAC_ENDPOINT, APP_NAME } from '../../../constants';

export default (type: string, resource: string, params: any) => {
	switch (type) {
		case GET_LIST: {
      // https://sit-apollo.digi-texx.vn/api/oauth/access-controls/users
			return fetchJson(`${UAC_ENDPOINT}/users`, {
				method: 'GET'
			});
		}
		default:
			break;
	}
	return Promise.reject(`Provider ${resource} method:${type} not yet supported!`);
};
