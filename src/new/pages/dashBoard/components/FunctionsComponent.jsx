import React, { useState, useEffect } from 'react';
import classNames from "classnames";
import { compose } from 'recompose';
import withStyles from "@material-ui/core/styles/withStyles";
import {
    PageDecorator,
} from '@dgtx/coreui'
import { getValueByObject } from '@dgtx/core-component-ui';
import * as constants from '../redux/actions';
import reducer from '../redux/reducers';
import {
    Grid,
    Input,
    Paper
} from '@material-ui/core';
import {
    setClickFunction,
    setSearchFunctions
} from '../redux/actionCreators';
import FunctionItemComponent from './FunctionItemComponent'
const keyTranslate = constants.KEY_TRANSLATE;
const styles = (theme) => {
    return {
        root: {
            margin: '8px 8px 0px 0px',
            height: 'calc(100vh - 8px)',
            width: 'calc(100% - 8px)',
            overflow: 'auto'
        },
        search: {
            padding: '16px 0px 0px 56px'
        },
        item: {
            overflow: 'auto',
            position: 'relative',
            display: 'flex',
            flexWrap: 'wrap',
        },
        paperMore: {
            height: '900px',
            width: '100%'
        }
    };
}
const FunctionComponent = (props) => {
    const {
        classes,
        datas,
        setClickFunction = () => null,
        setSearchFunctions = () => null,
        searchKeyWordsFunctions,
        isClickProject
    } = props;
    useEffect(() => {
        return () => { }
    }, [datas, searchKeyWordsFunctions]);
    const handleOnSearch = (e) => {
        let value = e.target.value;
        setSearchFunctions(value)
    }
    // eslint-disable-next-line no-lone-blocks
    if (isClickProject) {
        return (
            <Paper elevation={5} className={classes.root}
            >
                <div className={classes.search}>
                    <Input
                        id="search"
                        type="search"
                        value={searchKeyWordsFunctions}
                        onChange={handleOnSearch}
                        placeholder="Search"
                    />
                </div>
                <div className={classes.item}>
                    <Grid
                        container={true}
                        direction="row"
                    >
                        {
                            datas && datas.length > 0 && datas.map((data, index) => {
                                return (
                                    <FunctionItemComponent
                                        index={index}
                                        // onHover={this.handleHoverChild}
                                        // selecting={index === selecting}
                                        onClick={setClickFunction}
                                        keyTranslate={keyTranslate}
                                        item={data}
                                        key={index}
                                    />
                                )
                            })
                        }
                    </Grid>
                </div>
                <div className={ datas && datas.length >= 15 ? classes.paperMore : ''}></div>
            </Paper>
        )
    }
    else {
        return '';
    }
}
export default compose(
    PageDecorator({
        resources: [reducer],
        actions: {
            setClickFunction,
            setSearchFunctions
        },
        mapState: (state) => ({
            datas: getValueByObject(state, `core.resources.${constants.NAME_REDUCER}.data.functions_search`, []),
            searchKeyWordsFunctions: getValueByObject(state, `core.resources.${constants.NAME_REDUCER}.data.searchKeyWordsFunctions`, ''),
            isClickProject: getValueByObject(state, `core.resources.${constants.NAME_REDUCER}.data.isClickProject`, ''),
        })
    }),
    (withStyles(styles, { withTheme: true }))
)(FunctionComponent);