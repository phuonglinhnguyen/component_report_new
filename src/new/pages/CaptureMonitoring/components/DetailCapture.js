import React, { useState, useEffect } from 'react';
import { get, filter } from 'lodash';
import orderBy from 'lodash/orderBy';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import { PageDecorator, getDataObject } from '@dgtx/coreui';
import compose from 'recompose/compose';
import * as types from '../redux/actions';
import { getInstancesDetail, setSteps } from '../redux/actionCreators';
import Table from '@material-ui/core/Table';
import reducer from '../redux/reducers';
import Checkbox from '@material-ui/core/Checkbox';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import TablePagination from '@material-ui/core/TablePagination';
import Users from './Dialogs/Users';
import ConfirmDialog from './Dialogs/ConfirmDialog';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import AscIcon from '@material-ui/icons/ArrowUpward';
import DescIcon from '@material-ui/icons/ArrowDownward';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import moment from 'moment';
import VariablesTaskDialog from './Dialogs/VariablesTaskDialog';

const styles = (theme) => {
	return {
		rowDetail: {
			width: '15%'
		},
		btnAssign: {
			fontSize: '10px'
		},
		rowId: {
			width: '20%'
		},
		grow: {
			flexGrow: 1
		},
		btnViecw: {
			fontSize: '10px'
		},
		search: {
			position: 'relative',
			borderRadius: theme.shape.borderRadius,
			backgroundColor: fade(theme.palette.common.white, 0.15),
			'&:hover': {
				backgroundColor: fade(theme.palette.common.white, 0.25)
			},
			marginLeft: 0,
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				marginLeft: theme.spacing.unit,
				width: 'auto'
			}
		},
		searchIcon: {
			width: theme.spacing.unit * 9,
			height: '100%',
			position: 'absolute',
			pointerEvents: 'none',
			display: 'flex',
			alignstep: 'center',
			justifyContent: 'center'
		},
		inputRoot: {
			color: 'inherit',
			width: '100%'
		},
		inputInput: {
			paddingTop: theme.spacing.unit,
			paddingRight: theme.spacing.unit,
			paddingBottom: theme.spacing.unit,
			paddingLeft: theme.spacing.unit * 10,
			transition: theme.transitions.create('width'),
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				width: 120,
				background: 'lightgray',
				borderRadius: '25px',
				'&:focus': {
					width: 200
				}
			}
		}
	};
};

const theme = createMuiTheme({
	overrides: {
		MuiTableCell: {
			root: {
				padding: '10px'
			}
		},
		MuiChip: {
			colorPrimary: {
				backgroundColor: '#4caf50'
			},
			colorSecondary: {
				backgroundColor: 'gray'
			}
		}
	}
});

const DetailCapture = (props) => {
	const {
		classes,
		steps,
		task,
		projectId,
		userOther,
		setSteps,
		unclaimStep,
		user_online,
		project,
		getInstancesDetail
	} = props;
	const definition_id = get(task, 'process_definition_id');
	const instance_id = get(task, 'process_instance_id');
	const taskId = get(task, 'id');
	const taskAssignee = get(task, 'assignee');
	let projectName = get(project, 'name');
	let userOnlineProject = get(user_online, [ 'production', projectName ], {});

	const taskKeys = Object.keys(userOnlineProject);
	const userMappingTask = {};

	taskKeys.forEach((taskKey) => {
		const value = userOnlineProject[taskKey] || {};
		const users = value.users || [];
		users.forEach((user) => {
			userMappingTask[user] = taskKey;
		});
	});

	const [ anchorEl, setAnchorEl ] = useState(null);
	const [ isOpenConfirm, setIsOpenConfirm ] = useState(false);
	const [ isOpenViewVariables, setIsOpenViewVariables ] = useState(false);
	const [ itemDel, setItemDel ] = useState(null);
	const [ userDel, setUserDel ] = useState(null);
	const [ selectedAssign, setSelectedAssign ] = useState(null);
	const [ page, setPage ] = useState(0);
	const [ rowsPerPage, setRowsPerPage ] = useState(5);
	const [ sortDes, setSortDes ] = useState('desc');
	const [ userNameSearch, setUserNameSearch ] = useState('');
	const [ selected, setSelected ] = React.useState([]);
	const open = Boolean(anchorEl);
	const [ checkAll, setCheckAll ] = useState(false);
	const id = open ? 'simple-popover' : undefined;
	const [ isCheckAll, setIs ] = useState(false);

	useEffect(
		() => {
			let didUpdate = false;

			if (!didUpdate) {
				const fetch = async () => {
					const stepsStateRes = await getInstancesDetail(projectId, definition_id, instance_id, taskId);
					setSteps(stepsStateRes);
				};
				fetch();
			}
			return () => {
				didUpdate = true;
			};
		},
		[ getInstancesDetail, projectId, definition_id, instance_id, taskId, task, taskAssignee ]
	);

	//==Rows Per Page
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value);
	};
	//Search
	const filterData = (data, field, strSearch) => {
		const strSearchLowercase = strSearch ? String(strSearch).toLowerCase() : '';
		return filter(data, (item) => {
			const fieldTextLowercase = item[field] ? String(item[field]).toLowerCase() : '';
			if (!fieldTextLowercase) return false;
			return fieldTextLowercase.indexOf(strSearchLowercase) + 1;
		});
	};

	let userNameData = steps;
	if (userNameSearch) {
		userNameData = filterData(steps, 'assignee', userNameSearch);
	}

	const onSearchUserName = (e) => {
		const value = e.target.value;
		setUserNameSearch(value);
	};

	//Sort
	const sortBy = (key) => {
		let arrCopy = [ ...steps ];
		if (sortDes === 'asc') {
			setSortDes('desc');
			arrCopy = orderBy(arrCopy, key, sortDes);
			setSteps(arrCopy);
		} else if (sortDes === 'desc') {
			setSortDes('asc');
			arrCopy = orderBy(arrCopy, key, sortDes);
			setSteps(arrCopy);
		}
	};

	//Checked

	const handleSelectAllClick = (event) => {
		if (event.target.checked === true) {
			const newSelecteds = userNameData.map((item) => {
				if (item.assignee === null) {
					return item;
				}
			});
			const arr = newSelecteds.filter((_item) => {
				if (_item !== undefined) {
					return _item;
				}
			});
			setCheckAll(event.target.checked);
			setSelected(arr);
			setIs(true);
		} else if (event.target.checked === false) {
			
			setCheckAll(event.target.checked);
			setSelected([]);
			setIs(false);
		}
	};

	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);

		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	};
	console.log(checkAll, 'checkAll');
	console.log(selected, 'selected');
	console.log(isCheckAll,"isCheckAll");
	
	const isSelected = (name) => selected.indexOf(name) !== -1;
	const renderDetail = () => {
		return (
			<React.Fragment>
				{userNameData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
					const created_date = get(item, 'created', {});
					const created = moment(created_date).format('dddd, MMMM Do YYYY, h:mm:ss a');
					const isItemSelected = isSelected(item);
					return (
						<TableRow key={item.id}>
							<TableCell padding="checkbox">
								<Checkbox
									checked={item.assignee === null ? isItemSelected || isCheckAll : false}
									onChange={(e) => {
										handleClick(e, item);
									}}
									disabled={item.assignee}
								/>
							</TableCell>
							<TableCell className={classes.rowSmall}>{index + 1}</TableCell>
							<TableCell className={classes.rowId}>{item.id}</TableCell>
							<TableCell className={classes.rowId}>{created}</TableCell>
							<TableCell align="center" className={classes.rowId}>
								{item.assignee === null ? (
									<Button
										aria-describedby={id}
										className={classes.btnAssign}
										variant="contained"
										onClick={(e) => {
											setAnchorEl(e.currentTarget);
											setSelectedAssign([ item ]);
										}}
									>
										Assign
									</Button>
								) : (
									<Chip
										icon={<FaceIcon />}
										label={item.assignee}
										onDelete={() => {
											setItemDel(item.id);
											setUserDel(item.assignee);
											setSelectedAssign([ item ]);
											setIsOpenConfirm(true);
										}}
										className={classes.chip}
									/>
								)}
							</TableCell>
							<TableCell align="center" className={classes.rowDetail}>
								<Chip
									label={userMappingTask[item.assignee] ? 'Online' : 'Offline'}
									color={userMappingTask[item.assignee] ? 'primary' : 'secondary'}
									className={classes.chip}
								/>
							</TableCell>
							<TableCell align="right" className={classes.rowDetail}>
								<Button
									className={classes.btnViecw}
									color="primary"
									onClick={() => {
										setSelectedAssign(item);
										setIsOpenViewVariables(true);
									}}
								>
									View
								</Button>
							</TableCell>
						</TableRow>
					);
				})}
				<ConfirmDialog
					userDel={userDel}
					itemDel={itemDel}
					steps={steps}
					setSteps={setSteps}
					selectedAssign={selectedAssign}
					isOpenConfirm={isOpenConfirm}
					setIsOpenConfirm={setIsOpenConfirm}
					unclaimStep={unclaimStep}
					projectId={projectId}
				/>
				<VariablesTaskDialog
					isOpen={isOpenViewVariables}
					setIsOpen={setIsOpenViewVariables}
					selectedAssign={selectedAssign}
					{...props}
				/>
				<Popover
					id={id}
					open={open}
					anchorEl={anchorEl}
					onClose={() => setAnchorEl(null)}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center'
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center'
					}}
				>
					<Users
						steps={steps}
						selectedAssign={selectedAssign}
						setSelectedAssign={setSelectedAssign}
						setSteps={setSteps}
						setAnchorEl={setAnchorEl}
						userOther={userOther}
						{...props}
					/>
				</Popover>
			</React.Fragment>
		);
	};

	return (
		<div>
			<MuiThemeProvider theme={theme}>
				<div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Username…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput
							}}
							onChange={onSearchUserName}
							value={userNameSearch}
						/>
					</div>
					{selected.length > 0 ? (
						<Button
							className={classes.btnAssign}
							variant="contained"
							onClick={(e) => {
								setAnchorEl(e.currentTarget);
								setSelectedAssign(selected);
							}}
						>
							Assign All
						</Button>
					) : null}
				</div>
				<Paper style={{ overflow: 'auto' }}>
					<Table>
						<TableHead style={{ background: 'lightgray' }}>
							<TableRow>
								<TableCell>
									<Checkbox
										indeterminate={selected.length > 0 && selected.length < userNameData.length}
										checked={checkAll}
										onChange={handleSelectAllClick}
									/>
								</TableCell>
								<TableCell className={classes.rowSmall}>No.</TableCell>
								<TableCell align="center" className={classes.rowId}>
									<TableSortLabel direction={sortDes} onClick={() => sortBy('id')}>
										Task ID
										{sortDes === 'desc' ? <DescIcon style={{ fontSize: 15 }} /> : <AscIcon style={{ fontSize: 15 }} />}
									</TableSortLabel>
								</TableCell>
								<TableCell align="center" className={classes.rowId}>
									Created Date
								</TableCell>
								<TableCell align="center" className={classes.rowId}>
									<TableSortLabel direction={sortDes} onClick={() => sortBy('assignee')}>
										User
										{sortDes === 'desc' ? <DescIcon style={{ fontSize: 15 }} /> : <AscIcon style={{ fontSize: 15 }} />}
									</TableSortLabel>
								</TableCell>
								<TableCell align="center" className={classes.rowDetail}>
									Status
								</TableCell>
								<TableCell align="right" className={classes.rowDetail}>
									View Variables
								</TableCell>
							</TableRow>
						</TableHead>
					</Table>
				</Paper>
				<Paper style={{ overflow: 'auto', height: '300px' }}>
					<Table style={{ tableLayout: 'fixed' }}>
						<TableBody>{renderDetail()}</TableBody>
					</Table>
				</Paper>

				<TablePagination
					rowsPerPageOptions={[ 5, 10, 25 ]}
					component="div"
					count={userNameData.length}
					rowsPerPage={rowsPerPage}
					page={page}
					backIconButtonProps={{
						'aria-label': 'Previous Page'
					}}
					nextIconButtonProps={{
						'aria-label': 'Next Page'
					}}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</MuiThemeProvider>
		</div>
	);
};

DetailCapture.defaultProps = {
	steps: []
};

export default compose(
	PageDecorator({
		resources: [ reducer ],
		actions: {
			getInstancesDetail,
			setSteps
		},
		mapState: (state) => ({
			steps: getDataObject(`resources.${types.NAME_REDUCER}.data.steps`, state.core)
		})
	}),
	withStyles(styles, { withTheme: true })
)(DetailCapture);
