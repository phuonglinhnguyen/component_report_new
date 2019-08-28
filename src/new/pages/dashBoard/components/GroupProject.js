import React, { useState } from 'react';
import get from 'lodash/get';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import { getGroupProjects } from '../../../../providers/data/mockData/group_project';
import GroupChild from './GroupChild';

const styles: any = (theme: any) => {
	return {
		groupProject: {
			minHeight: '500px',
			padding: '20px'
		},
		root: {
			width: '100%',
			maxHeight: '500px',
			overflowY: 'auto',
		},
		listItem: {
			color: 'wheat',
			
			paddingLeft: '0px !important',
			'&:hover $listItemActions': {
				display: 'block !important'
			}
		},
		listItemActions: {
			display: 'none'
		}
	};
};

const GroupProject: React.FC<IDefautProps, IDefautState> = (props) => {
	const { classes } = props;

	const groupProjects = getGroupProjects();

	const [ isOpenGroupChild, setIsOpenGroupChild ] = useState({});

	const renderChilds = (parentField, parentFields, paddingLeft, fieldIndexs) => {
		return (
			<Collapse in={isOpenGroupChild[parentField.name]} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{parentFields.map((groupItem, groupIndex) => {
						const childFields = get(groupItem, 'childs', []);
						const newFieldIndexs = [ ...fieldIndexs, groupIndex ];
						return (
							<div>
								<GroupChild
									groupItem={groupItem}
									wrapStyles={{ paddingLeft: `${paddingLeft}px`, display: 'flex' }}
									isOpenGroupChild={isOpenGroupChild}
									setIsOpenGroupChild={setIsOpenGroupChild}
									{...props}
								/>
								{renderChilds(groupItem, childFields, paddingLeft + 20, newFieldIndexs)}
							</div>
						);
					})}
				</List>
			</Collapse>
		);
	};

	return (
		<div className={classes.groupProject}>
			<List component="nav" className={classes.root}>
				{groupProjects.map((groupItem, groupIndex) => {
					const parentFields = get(groupItem, 'childs', []);
					return (
						<div>
							<GroupChild
								groupItem={groupItem}
								isOpenGroupChild={isOpenGroupChild}
								setIsOpenGroupChild={setIsOpenGroupChild}
								{...props}
							/>

							{renderChilds(groupItem, parentFields, 20, [ groupIndex ])}
						</div>
					);
				})}
			</List>
		</div>
	);
};
export default withStyles(styles, { withTheme: true })(GroupProject);
