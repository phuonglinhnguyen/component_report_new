import {
    UPDATE,
    fetchJson,
} from '@dgtx/coreui';
import {
    API_ENDPOINT,
} from '../../../constants'
export default (type: string, resource: string, params: any) => {
    switch (type) {
        case UPDATE: {
            const { data } = params;
            if(data){
                return fetchJson(`${API_ENDPOINT}/change-password`,
                { method: 'PATCH', body: JSON.stringify(data) })
            }
            else{
                return Promise.resolve(
                    {
                        status: 400,
                        headers: {},
                    }
                )
            }
        }
        default:
            break;
    }
    return Promise.reject(`Provider ${resource} method:${type} not yet supported!`)
};
