import { GET_LIST, fetchJson } from '@dgtx/coreui';
import { REPORT_ENDPOINT, APP_NAME } from '../../../constants';
export default (type: string, resource: string, params: any) => {
	switch (type) {
		case GET_LIST: {
			const { projectId, batchId, min_doc, max_doc } = params;

			if (min_doc && max_doc) {
				return fetchJson(
					`${REPORT_ENDPOINT}/apps/production-admin/projects/${projectId}/batches/${batchId}/docs?min_result=${min_doc}&max_result=${max_doc}`,
					{
						method: 'GET'
					}
				);
			} else {
				return fetchJson(`${REPORT_ENDPOINT}/apps/production-admin/projects/${projectId}/batches/${batchId}/docs`, {
					method: 'GET'
				});
			}
		}
		default:
			break;
	}
	return Promise.reject(`Provider ${resource} method:${type} not yet supported!`);
};
