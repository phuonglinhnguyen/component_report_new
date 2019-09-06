import { GET_LIST, fetchJson } from '@dgtx/coreui';
import { API_ENDPOINT_BPMN} from '../../../constants';
export default (type: string, resource: string, params: any) => {
	switch (type) {
		case GET_LIST: {
      const { projectId } = params;
      // https://sit-apollo.digi-texx.vn/api/bpmn/apps/production/projects/:project_id/monitors/user_task_info
			return fetchJson(`${API_ENDPOINT_BPMN}/apps/production/projects/${projectId}/monitors/user_task_info`, {
				method: 'GET'
			});
		}
		default:
			break;
	}
	return Promise.reject(`Provider ${resource} method:${type} not yet supported!`);
};
