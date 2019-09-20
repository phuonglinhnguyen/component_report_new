import { UPDATE, fetchJson } from '@dgtx/coreui';
import { API_ENDPOINT_BPMN } from '../../../constants';
export default (type: string, resource: string, params: any) => {
	switch (type) {
		case UPDATE: {
			const { user_name, projectId, task_ids } = params;

			return fetchJson(`${API_ENDPOINT_BPMN}/apps/production-admin/projects/${projectId}/tasks/assignee`, {
				method: 'PATCH',
				body: JSON.stringify({ user_name, task_ids })
			});
		}
		default:
			break;
	}
	return Promise.reject(`Provider ${resource} method:${type} not yet supported!`);
};
