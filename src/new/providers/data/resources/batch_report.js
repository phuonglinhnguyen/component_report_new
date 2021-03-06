import { GET_LIST, fetchJson } from '@dgtx/coreui';
import { REPORT_ENDPOINT, APP_NAME } from '../../../constants';
export default (type: string, resource: string, params: any) => {
	switch (type) {
		case GET_LIST: {
			const { projectId, batchId, startDate, perHour, hour } = params;

			if (startDate && perHour && hour) {
				return fetchJson(
					`${REPORT_ENDPOINT}/apps/production-admin/projects/${projectId}/batches/${batchId}?date_start=${startDate}&perhour=${perHour}&hour_start=${hour}`,
					{
						method: 'GET'
					}
				);
			} else {
				return fetchJson(`${REPORT_ENDPOINT}/apps/production-admin/projects/${projectId}/batches/${batchId}`, {
					method: 'GET'
				});
			}
		}
		default:
			break;
	}
	return Promise.reject(`Provider ${resource} method:${type} not yet supported!`);
};
