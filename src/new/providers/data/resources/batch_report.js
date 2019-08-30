import { GET_LIST, fetchJson } from '@dgtx/coreui';
import { REPORT_ENDPOINT} from '../../../constants';
export default (type: string, resource: string, params: any) => {
	switch (type) {
		case GET_LIST: {
			const { projectId, batchId } = params;
			return fetchJson(`${REPORT_ENDPOINT}/apps/production-admin/projects/5d099a031927c3001465f932/batches/5d283f6e38aba8002594afa3`, {
				method: 'GET'
			});
		}
		default:
			break;
	}
	return Promise.reject(`Provider ${resource} method:${type} not yet supported!`);
};
