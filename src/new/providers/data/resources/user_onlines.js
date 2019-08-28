import { GET_LIST, fetchJson } from '@dgtx/coreui';
import { API_ENDPOINT_SOCKET } from '../../../constants';
export default (type: string, resource: string, params: any) => {
	switch (type) {
		case GET_LIST: {
			console.log(params);
			
			// return fetchJson(`${API_ENDPOINT_SOCKET}/user-onlines`, {
			// 	method: 'GET'
			// });
		}
		default:
			break;
	}
	return Promise.reject(`Provider ${resource} method:${type} not yet supported!`);
};
