import { GET_LIST, fetchJson } from '@dgtx/coreui';
import { UAC_ENDPOINT, APP_NAME} from '../../../constants';
export default (type, resource, params) => {
	switch (type) {
		case GET_LIST: {
			return fetchJson(`${UAC_ENDPOINT}/apps/${APP_NAME}/projects?user_access=true`, {
				method: 'GET'
			});
		}
		default:
			break;
	}
	return Promise.reject(`Provider ${resource} method:${type} not yet supported!`);
};
