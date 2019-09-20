import { GET_LIST, fetchJson } from '@dgtx/coreui';
import { API_ENDPOINT_BPMN, APP_NAME } from '../../../constants';

export default (type: string, resource: string, params: any) => {
	switch (type) {
		case GET_LIST: {
			const { projectId, instancesId, executionsId } = params;
			// 'https://sit-apollo.digi-texx.vn/api/bpmn/apps/production/projects/:project_id/monitors/instances/:instances_id/executions/:executions_id/variables'
			return fetchJson(
				`${API_ENDPOINT_BPMN}/apps/production/projects/${projectId}/monitors/instances/${instancesId}/executions/${executionsId}/variables`,
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
