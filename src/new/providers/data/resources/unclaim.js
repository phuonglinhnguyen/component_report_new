import { UPDATE, fetchJson } from '@dgtx/coreui';
import { API_ENDPOINT_BPMN } from '../../../constants';
export default (type: string, resource: string, params: any) => {
	switch (type) {
		case UPDATE: {
			const { projectId, task_ids } = params;
			return fetchJson(`${API_ENDPOINT_BPMN}/apps/production-admin/projects/${projectId}/tasks/unclaim`, {
				method: 'PATCH',
				body: JSON.stringify({ task_ids })
			});
		}
		default:
			break;
	}
	return Promise.reject(`Provider ${resource} method:${type} not yet supported!`);
};
