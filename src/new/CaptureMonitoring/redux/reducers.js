import * as types from './actions';
import Capture from '../components/Models/Captute';
const initialState = {
	project: [],
	group_prj: [],
	tasks: [],
	task: {},
	tasks_count: [],
	data_batch: [],
	data_history: [],
	capture: {},
	step: [],
	user_assign: [],
	user_online: {},
	is_fetching: true,
};
export default {
	name: types.NAME_REDUCER,
	reducer: (state = initialState, action) => {
		switch (action.type) {
			case types.MONITOR_USERS_SET_LIST:
				return {
					...state,
					is_fetching: false,
					total_working_user: action.total_working_user,
					project_users: action.project_users,
					working_users: action.working_users
				};
			case types.CAPTURE_MONITORING_GET_PROJECT:
			case types.CAPTURE_MONITORING_GET_GROUP_PRJ:
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
				return {
					...state,
					...action.payload
				};
			default:
				return state;
		}
	}
};
