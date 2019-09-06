import React, { useState } from 'react';
import { get } from 'lodash';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import AscIcon from '@material-ui/icons/ArrowUpward';
import DescIcon from '@material-ui/icons/ArrowDownward';

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

const DetailQC = (props) => {
	const { classes, cap, choose } = props;
	const [ page, setPage ] = useState(0);
	const [ rowsPerPage, setRowsPerPage ] = useState(5);
	const [ sortDes, setSortDes ] = useState('desc');
	const chooseData = () => {
		if (choose === 'Finished Export') {
			const data = get(cap, 'finished_export.items', []);
			return data;
		}
	};
	const [ items, setItems ] = useState(() => {
		return chooseData();
	});
	//==Rows Per Page
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value);
	};

	

	let data = chooseData();
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
	return (
		<div>
			<MuiThemeProvider theme={theme}>
				<Paper style={{ overflow: 'auto' }}>
					<Table>
						<TableHead style={{ background: 'lightgray' }}>
							<TableRow>
								<TableCell className={classes.rowSmall}>No.</TableCell>
								<TableCell align="center" className={classes.rowDetail}>
								<TableSortLabel direction={sortDes} onClick={() => sortBy('username')}>
								Import Date
										{sortDes === 'desc' ? <DescIcon style={{ fontSize: 15 }} /> : <AscIcon style={{ fontSize: 15 }} />}
									</TableSortLabel>
									
								</TableCell>
								<TableCell align="center" className={classes.rowDetail}>
									Export Date
								</TableCell>
								<TableCell align="center" className={classes.rowDetail}>
									Total Exported
								</TableCell>
								<TableCell align="center" className={classes.rowDetail}>
									Total Exported Per hour
								</TableCell>
							</TableRow>
						</TableHead>
					</Table>
				</Paper>
				<Paper style={{ overflow: 'auto', height: '300px' }}>
					<Table style={{ tableLayout: 'fixed' }}>
						<TableBody>
							{items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
								return (
									<TableRow>
										<TableCell className={classes.rowSmall}>{index + 1}</TableCell>

										<TableCell align="center" className={classes.rowDetail}>
											{item.import_date}
										</TableCell>
										<TableCell align="center" className={classes.rowDetail}>
											{item.export_date}
										</TableCell>
										<TableCell align="center" className={classes.rowDetail}>
											{item.total_exported}
										</TableCell>
										<TableCell align="center" className={classes.rowDetail}>
											{item.total_exported_perhour}
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
					count={data.length}
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
export default withStyles(styles, { withTheme: true })(DetailQC);
