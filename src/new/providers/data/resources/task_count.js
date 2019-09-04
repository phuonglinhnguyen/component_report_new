import { GET_LIST, fetchJson } from '@dgtx/coreui';
import { API_ENDPOINT_BPMN } from '../../../constants';
export default (type: string, resource: string, params: any) => {
	switch (type) {
		case GET_LIST: {
			const { projectId, batchId, processesId, instanceId } = params;
			// https://sit-apollo.digi-texx.vn/api/bpmn/apps/:app_name/projects/:project_id/monitors/processes/:processes_id/instances/:instances_id/tasks/count
			return fetchJson(
				`${API_ENDPOINT_BPMN}/apps/production-admin/projects/5d099a031927c3001465f932/monitors/processes/04475bb3-9f0c-11e9-b091-9a45e4d4602b/instances/28a1d948-c8b2-11e9-b7cf-5675acad1b82/tasks/count`,
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
