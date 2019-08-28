import React, { useState } from 'react';
import { get, filter } from 'lodash';
import moment from 'moment';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Badge from '@material-ui/core/Badge';
const styles: any = (theme: any) => {
	return {
		rowSmall: {
			width: '10%'
		},
		assCursor: {
			width: '10px'
		},
		rowLarge: {
			width: '20%'
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

const DetailTotalUsers = (props) => {
	const { classes, users } = props;

	const [ page, setPage ] = useState(0);
	const [ rowsPerPage, setRowsPerPage ] = useState(5);

	//==Rows Per Page
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value);
	};

	return (
		<div className={classes.report}>
			<MuiThemeProvider theme={theme}>
				<Paper style={{ overflow: 'auto' }}>
					<Table>
						<TableHead style={{ background: 'lightgray' }}>
							<TableRow>
								<TableCell style={{ width: '2%' }}>No.</TableCell>
								<TableCell align="center" className={classes.rowSmall}>
									Username
								</TableCell>
								<TableCell align="center" className={classes.rowLarge}>
									Full Name
								</TableCell>
								<TableCell align="center" className={classes.rowLarge}>
									Group Name
								</TableCell>
								<TableCell align="center" className={classes.rowSmall}>
									Work Type
								</TableCell>
								<TableCell align="center" className={classes.rowSmall}>
									Task Name
								</TableCell>
								<TableCell align="right" className={classes.rowSmall}>
									Layout
								</TableCell>
								<TableCell align="right" className={classes.rowSmall}>
									Status
								</TableCell>
							</TableRow>
						</TableHead>
					</Table>
				</Paper>
				<Paper style={{ overflow: 'auto', height: '500px' }}>
					<Table style={{ tableLayout: 'fixed' }}>
						<TableBody>
							{users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => {
								return (
									<TableRow>
										<TableCell align="right" style={{ width: '3%' }}>
											{index + 1}
										</TableCell>
										<TableCell align="center" className={classes.rowSmall}>
											{user.username}
										</TableCell>
										<TableCell align="center" className={classes.rowLarge}>
											{user.fullname}
										</TableCell>
										<TableCell align="center" className={classes.rowLarge}>
											{user.groupname}
										</TableCell>
										<TableCell align="center" className={classes.rowSmall}>
											internal
										</TableCell>
										<TableCell align="center" className={classes.rowSmall}>
											{user.taskName}
										</TableCell>
										<TableCell align="right" className={classes.rowSmall}>
											1
										</TableCell>
										<TableCell align="right" className={classes.rowSmall}>
											<Badge color={user.status === 'Online' ? 'primary' : 'secondary'} variant="dot">
												{user.status}
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
					count={users.length}
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
export default withStyles(styles, { withTheme: true })(DetailTotalUsers);
