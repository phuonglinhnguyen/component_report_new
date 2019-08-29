import React, { useState } from 'react';
import { get, filter } from 'lodash';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import Badge from '@material-ui/core/Badge';
import TablePagination from '@material-ui/core/TablePagination';
import Users from './Dialogs/Users';
import ConfirmDialog from './Dialogs/ConfirmDialog';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import AscIcon from '@material-ui/icons/ArrowUpward';
import DescIcon from '@material-ui/icons/ArrowDownward';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
const styles = (theme) => {
	return {
		rowDetail: {
			width: '10%'
		},
		rowSmall: {
			width: '5%'
		},
		rowLg: {
			width: '30%'
		},
		btnAssign: {
			fontSize: '10px'
		},
		rowId: {
			width: '25%'
		},
		grow: {
			flexGrow: 1
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
			alignItems: 'center',
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
		MuiBadge: {
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
	const { classes, cap, choose } = props;
	const chooseData = () => {
		if (choose === 'Classify') {
			const data = get(cap, 'classify.items', []);
			return data;
		} else if (choose === 'Omr') {
			const data = get(cap, 'omr.items', []);
			return data;
		} else if (choose === 'Invoice Header') {
			const data = get(cap, 'invoice_header.items', []);
			return data;
		} else if (choose === 'Invoice Item') {
			const data = get(cap, 'invoice_item.items', []);
			return data;
		}
	};

	const [ items, setItems ] = useState(() => {
		return chooseData();
	});
	const [ anchorEl, setAnchorEl ] = useState(null);
	const [ isOpenConfirm, setIsOpenConfirm ] = useState(false);
	const [ itemDel, setItemDel ] = useState(null);
	const [ userDel, setUserDel ] = useState(null);
	const [ selectedAssign, setSelectedAssign ] = useState(null);
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	const [ page, setPage ] = useState(0);
	const [ rowsPerPage, setRowsPerPage ] = useState(5);
	const [ sortDes, setSortDes ] = useState('desc');
	const [ userNameSearch, setUserNameSearch ] = useState('');
	//==Rows Per Page
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value);
	};

	const compareByDesc = (key) => {
		return (a, b) => {
			if (a[key] < b[key]) return -1;
			if (a[key] > b[key]) return 1;
			return 0;
		};
	};

	const compareByAsc = (key) => {
		return (a, b) => {
			if (a[key] > b[key]) return -1;
			if (a[key] < b[key]) return 1;
			return 0;
		};
	};

	const sortBy = (key) => {
		let arrCopy = [ ...items ];
		if (sortDes == 'desc') {
			setSortDes('asc');
			arrCopy.sort(compareByDesc(key));
			setItems(arrCopy);
		} else if (sortDes == 'asc') {
			setSortDes('desc');
			arrCopy.sort(compareByAsc(key));
			setItems(arrCopy);
		}
	};

	const filterData = (data, field, strSearch) => {
		const strSearchLowercase = strSearch ? String(strSearch).toLowerCase() : '';
		return filter(data, (item) => {
			const fieldTextLowercase = item[field] ? String(item[field]).toLowerCase() : '';
			if (!fieldTextLowercase) return false;
			return fieldTextLowercase.indexOf(strSearchLowercase) + 1;
		});
	};

	let userNameData = items;
	if (userNameSearch) {
		userNameData = filterData(items, 'username', userNameSearch);
	}
	
	const onSearchUserName = (e) => {
		const value = e.target.value;
		setUserNameSearch(value);
	};

	return (
		<div>
			<MuiThemeProvider theme={theme}>
				<div style={{ marginBottom: '20px' }}>
					<div className={classes.grow} />
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
				</div>
				<Paper style={{ overflow: 'auto' }}>
					<Table>
						<TableHead style={{ background: 'lightgray' }}>
							<TableRow>
								<TableCell className={classes.rowSmall}>No.</TableCell>
								<TableCell align="center" className={classes.rowId}>
									<TableSortLabel direction={sortDes} onClick={() => sortBy('task_id')}>
										Task ID
										{sortDes === 'desc' ? <DescIcon style={{ fontSize: 15 }} /> : <AscIcon style={{ fontSize: 15 }} />}
									</TableSortLabel>
								</TableCell>
								<TableCell align="center" className={classes.rowLg}>
									File Path
								</TableCell>
								<TableCell align="center" className={classes.rowDetail}>
									<TableSortLabel direction={sortDes} onClick={() => sortBy('username')}>
										User
										{sortDes === 'desc' ? <DescIcon style={{ fontSize: 15 }} /> : <AscIcon style={{ fontSize: 15 }} />}
									</TableSortLabel>
								</TableCell>
								<TableCell align="center" className={classes.rowDetail}>
									Status
								</TableCell>
							</TableRow>
						</TableHead>
					</Table>
				</Paper>
				<Paper style={{ overflow: 'auto', height: '300px' }}>
					<Table style={{ tableLayout: 'fixed' }}>
						<TableBody>
							{userNameData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
								return (
									<TableRow>
										<TableCell className={classes.rowSmall}>{index + 1}</TableCell>
										<TableCell align="right" className={classes.rowId}>
											{item.task_id}
										</TableCell>
										<TableCell align="center" className={classes.rowLg}>
											{item.file_path}
										</TableCell>
										<TableCell align="center" className={classes.rowDetail}>
											{item.username === '' ? (
												<Button
													aria-describedby={id}
													className={classes.btnAssign}
													variant="contained"
													onClick={(e) => {
														setAnchorEl(e.currentTarget);
														setSelectedAssign(item);
													}}
												>
													Assign
												</Button>
											) : (
												<Chip
													icon={<FaceIcon />}
													label={item.username}
													onDelete={() => {
														setItemDel(item.task_id);
														setUserDel(item.username);
														setIsOpenConfirm(true);
													}}
													className={classes.chip}
												/>
											)}
											<ConfirmDialog
												userDel={userDel}
												itemDel={itemDel}
												items={items}
												setItems={setItems}
												isOpen={isOpenConfirm}
												setIsOpen={setIsOpenConfirm}
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
													items={items}
													selectedAssign={selectedAssign}
													setItems={setItems}
													setAnchorEl={setAnchorEl}
												/>
											</Popover>
										</TableCell>
										<TableCell align="center" className={classes.rowDetail}>
											<Badge color={item.status === 'Online' ? 'primary' : 'secondary'} variant="dot">
												{item.status}
											</Badge>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</Paper>
				<TablePagination
					rowsPerPageOptions={[ 5, 10, 25 ]}
					component="div"
					count={items.length}
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
export default withStyles(styles, { withTheme: true })(DetailCapture);
