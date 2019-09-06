import { GET_LIST, fetchJson } from '@dgtx/coreui';
import { API_ENDPOINT_BPMN } from '../../../constants';
export default (type: string, resource: string, params: any) => {
	switch (type) {
		case GET_LIST: {
			const { projectId, processesId, instanceId ,taskId} = params;
			return fetchJson(
				`${API_ENDPOINT_BPMN}/apps/production-admin/projects/${projectId}/monitors/processes/${processesId}/instances/${instanceId}/tasks/${taskId}`,
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
