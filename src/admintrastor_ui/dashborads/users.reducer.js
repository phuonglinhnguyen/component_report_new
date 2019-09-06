import {
    CREATE,
    UPDATE,
    GET_ONE,
    GET_MANY,
    GET_LIST,
    GET_MANY_REFERENCE,
    FETCH_END
} from '../../dgs-core';

export default (previousState={},{type,payload,meta})=>{
    if (!meta || !meta.fetchResponse || meta.fetchStatus !== FETCH_END) {
        return previousState;
    }
    switch (meta.fetchResponse) {
        case GET_LIST:
        case GET_ONE:
            return payload.json;
        default:
            return previousState;
    }
}
