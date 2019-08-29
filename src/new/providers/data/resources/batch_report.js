import { GET_LIST, fetchJson } from '@dgtx/coreui';
import { API_ENDPOINT} from '../../../constants';
export default (type: string, resource: string, params: any) => {
	switch (type) {
		case GET_LIST: {
			const { projectId, batchId } = params;
			console.log({params});
			
			console.log({ projectId });

			console.log({ batchId });
			return fetchJson(`${API_ENDPOINT}/report/app/production-admin/projects/5d0b37a6f05d51004b18591d/batches/5d3ea5eb4454090011f5024b`, {
				method: 'GET'
			});
		}
		default:
			break;
	}
	return Promise.reject(`Provider ${resource} method:${type} not yet supported!`);
};
