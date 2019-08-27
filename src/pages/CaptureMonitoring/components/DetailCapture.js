import React from 'react';
import { get } from 'lodash';
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
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Users from './Dialogs/Users';

const styles: any = (theme: any) => {
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
			const data = get(cap, 'omr', []);
			return data;
		} else if (choose === 'Invoice Header') {
			const data = get(cap, 'invoice_header', []);
			return data;
		} else if (choose === 'Invoice Item') {
			const data = get(cap, 'invoice_item', []);
			return data;
		}
	};

	let data = chooseData();
	const [ anchorEl, setAnchorEl ] = React.useState(null);

	const [ selectedUser, setSelectedUser ] = React.useState(null);
	const user = get(selectedUser, 'username', {});
	console.log(user);

	const [ chipData, setChipData ] = React.useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleDelete = (chip) => {
		// setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
		// console.log(chipData);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<div>
			<MuiThemeProvider theme={theme}>
				<Paper style={{ overflow: 'auto' }}>
					<Table>
						<TableHead style={{ background: 'lightgray' }}>
							<TableRow>
								<TableCell className={classes.rowSmall}>No.</TableCell>
								<TableCell align="center" className={classes.rowId}>
									Task ID
								</TableCell>
								<TableCell align="center" className={classes.rowLg}>
									File Path
								</TableCell>
								<TableCell align="center" className={classes.rowDetail}>
									User
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
							{data.map((item, index) => {
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
													onClick={handleClick}
												>
													Assign
												</Button>
											) : (
												<Chip
													icon={<FaceIcon />}
													label={item.username}
													onDelete={(chip) => {
														setSelectedUser(item);
														handleDelete(chip);
													}}
													className={classes.chip}
												/>
											)}
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
				<Popover
					id={id}
					open={open}
					anchorEl={anchorEl}
					onClose={handleClose}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center'
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center'
					}}
				>
					<Users selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
				</Popover>
			</MuiThemeProvider>
		</div>
	);
};
export default withStyles(styles, { withTheme: true })(DetailCapture);
