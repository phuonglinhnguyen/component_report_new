import { GET_LIST, fetchJson } from '@dgtx/coreui';
import { API_ENDPOINT, APP_NAME } from '../../../constants';
export default (type: string, resource: string, params: any) => {
	switch (type) {
		case GET_LIST: {
			const { projectId } = params;
			console.log({ projectId });

			return fetchJson(`${API_ENDPOINT}/report/app/production-admin/projects/${projectId}/data-imported-history`, {
				method: 'GET'
			});
		}
		default:
			break;
	}
	return Promise.reject(`Provider ${resource} method:${type} not yet supported!`);
};
