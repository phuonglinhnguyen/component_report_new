import * as types from './actions';
import { cloneDeep } from 'lodash';

const initialState = {
	isOpenGroupTree: true,
	group_prj_parent: [],
	group_prj_search: [],
	projects: [],
	project_selected: null,
	functions_parent: [],
	functions_search: [],
	functions_selected: null,
	searchKeyWordsFunctions: '',
	searchKeyWordsGroups: '',
	isClickProject: false,
	isRenderFuctions: true
};
export default {
	name: types.NAME_REDUCER,
	reducer: (state = cloneDeep(initialState), action) => {
		switch (action.type) {
			case types.OPEN_DRAWER:
			case types.GET_GROUP_PROJECTS:
			case types.GET_FUNCTIONS:
			case types.GET_PROJECTS_INFO:
				return {
					...state,
					...action.payload
				};
			case types.CLICK_PROJECT:
				return {
					...state,
					...action.payload
				};
			case types.CLICK_FUNCTION:
				return {
					...state,
					...action.payload
				};
			case types.ON_SEARCH_FUNCTION:
				return {
					...state,
					...action.payload
				};
			case types.ON_SEARCH_GROUP_TREE:
				return {
					...state,
					...action.payload
				};
			case types.UNMOUNT:
				return cloneDeep(initialState);
			default:
				return state;
		}
	}
};
