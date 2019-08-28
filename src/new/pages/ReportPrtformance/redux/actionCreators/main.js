import * as types from '../actions';
import { getDataObject } from '@dgtx/coreui';
import { cloneDeep } from 'lodash';
import { getDataReport } from '../../../../../providers/data/mockData/report_mockdata';

export const onTest = () => async (dispatch, getState) => {
	const state = getDataObject(`core.resources.${types.NAME_REDUCER}.data`, cloneDeep(getState()));
	const test = getDataObject('test', state);
	dispatch({
		type: types.TEST_CONNECT_REDUCER,
		payload: {
			test: !test
		},
		meta: {
			resource: types.NAME_REDUCER
		}
	});
};

export const getData = () => async (dispatch) => {
	const data = getDataReport();

	dispatch({
		type: types.GET_LIST_DATA_REPORT,
		payload: {
			data: data
		},
		meta: {
			resource: types.NAME_REDUCER
		}
	});
};
