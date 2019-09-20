import { cloneDeep, isEmpty, orderBy } from 'lodash';
import { getValueByObject } from '@dgtx/core-component-ui';
import * as types from '../actions';
import { executeActionReducer } from './General';
import { push } from 'connected-react-router'

export const setClickFunction = (data) => async (dispatch, getState) => {
    if (data && data.path) {
        const state = getValueByObject(cloneDeep(getState()), `core.resources.${types.NAME_REDUCER}.data`, {});
        const project_selected = getValueByObject(state, 'project_selected', []);
        dispatch(
            executeActionReducer(
                types.CLICK_FUNCTION,
                {
                    isRenderFuctions: false,
                }
            )
        );
        dispatch(push(`/projects/${project_selected}${data.path}`))
    }
}

export const setSearchFunctions = (searchKeyWords) => async (dispatch, getState) => { 
    const state = getValueByObject(cloneDeep(getState()), `core.resources.${types.NAME_REDUCER}.data`, {});
    const functions_parent = getValueByObject(state, 'functions_parent', []);
    let newSearchKeyWords = searchKeyWords.toUpperCase();
    let newFunctions = functions_parent.filter(f => f.name.toUpperCase().search(newSearchKeyWords) !== -1);
    if(isEmpty(newFunctions)){
        if(isEmpty(newFunctions)) newFunctions = functions_parent;
        newFunctions = [];
    }
    dispatch(
        executeActionReducer(
            types.ON_SEARCH_FUNCTION,
            {
                searchKeyWordsFunctions: searchKeyWords,
                functions_search: orderBy(newFunctions, 'name', 'asc'),
            }
        )
    );
}