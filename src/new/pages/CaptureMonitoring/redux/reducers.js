import * as types from './actions';
import Capture from '../components/Models/Captute';
const initialState = {
	group_prj: [],
	tasks: [],
	task: {},
	tasks_count: [],
	data_batch: [],
	data_history: [],
	capture: {},
	min: null,
	max: null,
	fromDate: '',
	toDate: '',
	batchName: '',
	step: []
};
export default {
	name: types.NAME_REDUCER,
	reducer: (state = initialState, action) => {
		switch (action.type) {
			case types.CAPTURE_MONITORING_GET_GROUP_PRJ:
			case types.CAPTURE_MONITORING_GET_BATCH:
			case types.CAPTURE_MONITORING_GET_TASK_INFO:
			case types.CAPTURE_MONITORING_SET_SELECTED_CAPTURE:
			case types.CAPTURE_MONITORING_SET_SELECTED_STEP:
			case types.CAPTURE_MONITORING_GET_DATA_IMPORTED_HISTORY:
			case types.CAPTURE_MONITORING_SET_CAPTURE:
			case types.CAPTURE_MONITORING_GET_TASK_COUNT:
			case types.CAPTURE_MONITORING_GET_INSTANCES_DETAIL:
				return {
					...state,
					...action.payload
				};
			default:
				return state;
		}
	}
};
