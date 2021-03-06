import { GET_LIST, fetchJson } from '@dgtx/coreui';
import { REPORT_ENDPOINT } from '../../../constants';
export default (type: string, resource: string, params: any) => {
	switch (type) {
		case GET_LIST: {
			const { projectId, min_result, max_result, from_date, to_date, batch_name } = params;
			// GET: 'https://sit-apollo.digi-texx.vn/api/report/apps/:app_name/projects/:project_id/data-imported-history?min_result=10&max_result=20'
			// return fetchJson(
			// 	`${REPORT_ENDPOINT}/apps/production-admin/projects/5d099a031927c3001465f932/data-imported-history?from_date=${from_date}&to_date=${to_date}&batch_name=${batch_name}&min_result=${min_result}&max_result=${max_result}`,
			// 	{
			// 		method: 'GET'
			// 	}
			// );

			if (!min_result || !max_result) {
				return fetchJson(`${REPORT_ENDPOINT}/apps/production-admin/projects/${projectId}/data-imported-history`, {
					method: 'GET'
				});
			}

/**
 if (from_date && to_date && !batch_name) {
				return fetchJson(
					`${REPORT_ENDPOINT}/apps/production-admin/projects/${projectId}/data-imported-history?min_result=${min_result}&max_result=${max_result}&from_date=${from_date}&to_date=${to_date}`,
					{
						method: 'GET'
					}
				);
			}
 */

			return fetchJson(
				`${REPORT_ENDPOINT}/apps/production-admin/projects/${projectId}/data-imported-history?min_result=${min_result}&max_result=${max_result}`,
				{
					method: 'GET'
				}
			);
		}
		default:
			break;
	}
	return Promise.reject(`Provider ${resource} method:${type} not yet supported!`);
};
