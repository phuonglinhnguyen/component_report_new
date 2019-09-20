import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import { PageDecorator } from '@dgtx/coreui';
import compose from 'recompose/compose';
import Table from '@material-ui/core/Table';
import reducer from '../redux/reducers';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import { getVariablesTask } from '../redux/actionCreators';

import ViewValueVariables from './Dialogs/ViewValueVariables';
const styles = (theme) => {
	return {
		btnViecw: {
			fontSize: '10px'
		}
	};
};

const theme = createMuiTheme({});

const Variablestask = (props) => {
	const { classes, getVariablesTask, selectedAssign, projectId } = props;
	const [ page, setPage ] = useState(0);
	const [ rowsPerPage, setRowsPerPage ] = useState(5);
	const [ openView, setOpenView ] = useState(false);
	const [ variablesTask, setVariablesTask ] = useState([]);
	const [ selectedVariable, setSelectedVariable ] = useState(false);
	useEffect(
		() => {
			let didUpdate = false;

			if (!didUpdate) {
				const fetch = async () => {
					const executionsId = selectedAssign && (await get(selectedAssign, 'executionId', ''));

					const processInstanceId = await get(selectedAssign, 'processInstanceId', '');

					const taskInfosArray = await getVariablesTask(projectId, processInstanceId, executionsId);
					setVariablesTask(taskInfosArray);
				};
				fetch();
			}
			return () => {
				didUpdate = true;
			};
		},
		[ selectedAssign ]
	);

	//==Rows Per Page
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value);
	};

	const renderDetail = () => {
		return (
			<React.Fragment>
				{variablesTask.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
					return (
						<TableRow key={item.id}>
							<TableCell className={classes.rowSmall}>{index + 1}</TableCell>
							<TableCell align="center" className={classes.rowId}>
								{item.name}
							</TableCell>
							<TableCell align="right" className={classes.rowDetail}>
								<Button
									onClick={() => {
										setOpenView(true);
										setSelectedVariable(item);
									}}
									className={classes.btnViecw}
									color="primary"
								>
									View
								</Button>
							</TableCell>
						</TableRow>
					);
				})}
				<ViewValueVariables open={openView} setOpen={setOpenView} selectedVariable={selectedVariable} />
			</React.Fragment>
		);
	};

	return (
		<div>
			<MuiThemeProvider theme={theme}>
				<Paper style={{ overflow: 'auto' }}>
					<Table>
						<TableHead style={{ background: 'lightgray' }}>
							<TableRow>
								<TableCell className={classes.rowSmall}>No.</TableCell>
								<TableCell align="center" className={classes.rowId}>
									Task Name
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
					count={variablesTask.length}
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
export default compose(
	PageDecorator({
		resources: [ reducer ],
		actions: { getVariablesTask },
		mapState: (state) => ({})
	}),
	withStyles(styles, { withTheme: true })
)(Variablestask);
