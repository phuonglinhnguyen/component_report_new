import * as types from './actions';
const initialState = {
	project: [],
	users: {},
	group_prj: [],
	tasks: [],
	task: {},
	tasks_count: [],
	data_batch: [],
	data_docs: [],
	data_batch_perhour: [],
	data_history: [],
	capture: {},
	steps: [],
	user_assign: [],
	user_online: {},
	variables_task: [],
	count: {},
	count_docs: {},
	min: 1,
	max: 5
};
export default {
	name: types.NAME_REDUCER,
	reducer: (state = initialState, action) => {
		switch (action.type) {
			case types.CAPTURE_MONITORING_GET_PROJECT:
			case types.CAPTURE_MONITORING_GET_GROUP_PRJ:
			case types.CAPTURE_MONITORING_GET_USERS:
			case types.CAPTURE_MONITORING_GET_BATCH:
			case types.CAPTURE_MONITORING_GET_TASK_INFO:
			case types.CAPTURE_MONITORING_SET_SELECTED_CAPTURE:
			case types.CAPTURE_MONITORING_SET_SELECTED_STEP:
			case types.CAPTURE_MONITORING_GET_DATA_IMPORTED_HISTORY:
			case types.CAPTURE_MONITORING_SET_CAPTURE:
			case types.CAPTURE_MONITORING_GET_TASK_COUNT:
			case types.CAPTURE_MONITORING_GET_INSTANCES_DETAIL:
			case types.CAPTURE_MONITORING_GET_USER_ASSIGN:
			case types.CAPTURE_MONITORING_GET_USER_ONLINE:
			case types.CAPTURE_MONITORING_UPDATE_STEP:
			case types.CAPTURE_MONITORING_VARIABLES_TASK:
			case types.CAPTURE_MONITORING_COUNT:
			case types.CAPTURE_MONITORING_GET_BATCH_PERHOUR:
			case types.CAPTURE_MONITORING_GET_DOCS:
			case types.CAPTURE_MONITORING_COUNT_DOCS:
				return {
					...state,
					...action.payload
				};
			default:
				return state;
		}
	}
};
