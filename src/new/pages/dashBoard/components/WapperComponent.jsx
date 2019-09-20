import React, { useEffect } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { compose } from 'recompose';
import {
    CssBaseline,
    Tooltip
} from '@material-ui/core';
import {
    Sort,
} from '@material-ui/icons'
import { stylesWapper } from '../assets';
import GroupProject from './GroupProject';
import * as constants from '../redux/actions';
import reducer from '../redux/reducers';
import {
    getDataGroupProject,
    unmount
} from '../redux/actionCreators';
import {
    PageDecorator,
} from '@dgtx/coreui'
import { getValueByObject } from '@dgtx/core-component-ui';
import FunctionsComponent from './FunctionsComponent';
import SplitPane from 'react-split-pane';
const WapperComponent = (props) => {
    const {
        classes, children,
        getDataGroupProject = () => null,
        unmount = () => null,
        isRenderFuctions
    } = props;
    useEffect(() => {
        getDataGroupProject();
        return () => { unmount() }
    }, [isRenderFuctions]);
    return (
        <div className={classes.root}>
            <CssBaseline />
            <div className={classes.hide} >
                <Tooltip title="Group Tree" aria-label="Group-Tree" >
                    <Sort fontSize={'large'} />
                </Tooltip>
            </div>
            <SplitPane
                split="vertical"
                minSize={120}
                maxSize={'50%'}
                defaultSize={330}
            >
                <GroupProject />
                {children && isRenderFuctions === false ? children: <FunctionsComponent />}
            </SplitPane>
        </div>
    )
}
export default compose(
    PageDecorator({
        resources: [reducer],
        actions: {
            getDataGroupProject,
            unmount
        },
        mapState: (state) => ({
            isOpenGroupTree: getValueByObject(state, `core.resources.${constants.NAME_REDUCER}.data.isOpenGroupTree`, false),
            group_prj: getValueByObject(state, `core.resources.${constants.NAME_REDUCER}.data.group_prj`, []),
            isRenderFuctions: getValueByObject(state, `core.resources.${constants.NAME_REDUCER}.data.isRenderFuctions`, true)
        })
    }),
    (withStyles(stylesWapper, { withTheme: true }))
)(WapperComponent);