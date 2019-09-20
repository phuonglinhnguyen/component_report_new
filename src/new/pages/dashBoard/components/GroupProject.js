import React, { useState, useEffect } from 'react';
import get from 'lodash/get';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import classNames from 'classnames';
import {
	List,
	Typography,
	Paper,
	Divider,
	Collapse,
	InputBase
} from '@material-ui/core';
import {
	PageDecorator,
} from '@dgtx/coreui'
import { getValueByObject } from '@dgtx/core-component-ui';
import GroupChild from './GroupChild';
import * as constants from '../redux/actions';
import reducer from '../redux/reducers';
import {
	setClickProject,
	setOnSearchGroupTree
} from '../redux/actionCreators';
const drawerWidth = 330;
const styles = (theme) => {
	return {
		drawer: {
			// width: drawerWidth,
			flexShrink: 0,
			background: "none",
			zIndex: 0
		},
		drawerPaper: {
			// width: drawerWidth,
			marginTop: theme.spacing.unit * 8,
			background: "none",
			borderRight: "0px",
			zIndex: 0
		},
		drawerContent: {
			margin: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit * 4}px ${theme.spacing.unit}px`,
			width: `calc(100% - ${theme.spacing.unit * 2}px)`,
            height: 'calc(100vh - 8px)',
			// overflow: 'auto',
		},
		drawerHeader: {
			display: 'flex',
			alignItems: 'center',
			margin: theme.spacing.unit,
			width: `calc(100% - ${theme.spacing.unit * 2}px)`,
			borderRadius: "3px",
			// ...theme.mixins.toolbar,
		},
		hoverGroupTree: {
			margin: theme.spacing.unit,
			width: `calc(100% - ${theme.spacing.unit * 2}px)`,
			borderRadius: "3px",
			"&:hover": {
				boxShadow: theme.overrides.shadowsHover_1,
				background: theme.overrides.backgroundHover_1,
				fontWeight: "bold",
			}
		},
		groupProject: {
			padding: '20px'
		},
		root: {
			width: '100%',
			height: '100%',
			overflowY: 'auto',
		},
		listItem: {
			paddingLeft: '0px !important',
			'&:hover $listItemActions': {
				display: 'block !important'
			}
		},
		listItemActions: {
			display: 'none'
		},
		listMore: {
			height: '900px',
			width: '100%'
		}
	};
};

const GroupProject = (props) => {
	const { 
		classes, 
		group_prj_search, 
		setClickProject = () => null,
		setOnSearchGroupTree = () => null, 
		searchKeyWordsGroups,
	} = props;
	const [isOpenGroupChild, setIsOpenGroupChild] = useState({});
	useEffect(() => {
		return () => { }
	}, [group_prj_search]);
	const renderChilds = (parentField, parentFields, paddingLeft, fieldIndexs) => {
		return (
			<Collapse in={isOpenGroupChild[parentField.name]} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{parentFields.map((groupItem, groupIndex) => {
						const childFields = get(groupItem, 'childs', []);
						const newFieldIndexs = [...fieldIndexs, groupIndex];
						return (
							<React.Fragment key={groupIndex}>
								<GroupChild
									groupItem={groupItem}
									wrapStyles={{ paddingLeft: `${paddingLeft}px`, display: 'flex' }}
									isOpenGroupChild={isOpenGroupChild}
									setIsOpenGroupChild={setIsOpenGroupChild}
									setClickProject={setClickProject}
									{...props}
								/>
								{renderChilds(groupItem, childFields, paddingLeft + 20, newFieldIndexs)}
							</React.Fragment>
						);
					})}
				</List>
			</Collapse>
		);
	};
	const handleOnSearch = (e) => {
		let value = e.target.value;
		setOnSearchGroupTree(value)
	}
	return (
			<Paper elevation={5} className={classes.drawerContent}>
				<div className={classNames(classes.drawerHeader)}
				>
					<Typography gutterBottom={true} variant="h5" style={{ margin: "0px", textAlign: "center" }}>
						{"GROUP"}
					</Typography>
				</div>
				<div style={{ marginLeft: '24px', textAlign: "center" }}>
					<InputBase
						id="search"
						type="search"
						value={searchKeyWordsGroups}
						onChange={handleOnSearch}
						placeholder="Search"
						fullWidth={true}
					/>
				</div>
				<Divider />
				<List component="nav" className={classes.root}>
					{group_prj_search && group_prj_search.length > 0 && group_prj_search.map((groupItem, groupIndex) => {
						const parentFields = get(groupItem, 'childs', []);
						return (
							<div key={groupIndex}>
								<GroupChild
									groupItem={groupItem}
									isOpenGroupChild={isOpenGroupChild}
									setIsOpenGroupChild={setIsOpenGroupChild}
									setClickProject={setClickProject}
									{...props}
								/>
								{renderChilds(groupItem, parentFields, 20, [groupIndex])}
							</div>
						);
					})}
					<div className={classes.listMore}></div>
				</List>
			</Paper>
	);
};
export default compose(
	PageDecorator({
		resources: [reducer],
		actions: {
			setClickProject,
			setOnSearchGroupTree
		},
		mapState: (state) => ({
			isOpenGroupTree: getValueByObject(state, `core.resources.${constants.NAME_REDUCER}.data.isOpenGroupTree`, false),
			group_prj_search: getValueByObject(state, `core.resources.${constants.NAME_REDUCER}.data.group_prj_search`, []),
			searchKeyWordsGroups: getValueByObject(state, `core.resources.${constants.NAME_REDUCER}.data.searchKeyWordsGroups`, ''),
		})
	}),
	(withStyles(styles, { withTheme: true }))
)(GroupProject);