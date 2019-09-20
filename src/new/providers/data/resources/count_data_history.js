import { GET_LIST, fetchJson } from '@dgtx/coreui';
import { REPORT_ENDPOINT } from '../../../constants';
export default (type: string, resource: string, params: any) => {
	switch (type) {
		case GET_LIST: {
			const { projectId } = params;
			// https://sit-apollo.digi-texx.vn/api/report/apps/:app_name/projects/:project_id/data-imported-history//count

			return fetchJson(`${REPORT_ENDPOINT}/apps/production-admin/projects/${projectId}/data-imported-history/count`, {
				method: 'GET'
			});
		}
		default:
			break;
	}
	return Promise.reject(`Provider ${resource} method:${type} not yet supported!`);
};
