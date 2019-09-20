import React, { useState, useEffect } from 'react';
import TableCell from '@material-ui/core/TableCell';
import { getVariablesTask } from '../redux/actionCreators';
import { withStyles } from '@material-ui/core/styles';
import { PageDecorator } from '@dgtx/coreui';
import compose from 'recompose/compose';
import reducer from '../redux/reducers';
import { get } from 'lodash';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = (theme) => {
	return {
		rowLg: {
			width: '50%',
			cursor: 'pointer',
			overflow: 'hidden'
		}
	};
};

const DetailCaptureTableCell = (props) => {
	const { classes, item, getVariablesTask, projectId } = props;

	const [ imageURL, setImageURL ] = useState('');
	const [ open, setOpen ] = useState(false);
	const executionsId = get(item, 'executionId', '');
	const processInstanceId = get(item, 'processInstanceId', '');

	useEffect(
		() => {
			let didUpdate = false;

			if (!didUpdate) {
				const fetch = async () => {
					const taskInfosArray = await getVariablesTask(projectId, processInstanceId, executionsId);
					const taskInfo = (taskInfosArray && taskInfosArray.find((task) => task.name === 'input_data')) || {};
					const s2_url = taskInfo.value.s2_url || '';
					setImageURL(s2_url);
				};
				fetch();
			}
			return () => {
				didUpdate = true;
			};
		},
		[ item ]
	);

	return (
		<React.Fragment>
			<TableCell
				align="center"
				className={classes.rowLg}
				onClick={() => {
					setOpen(true);
				}}
			>
				{imageURL}
			</TableCell>
			<Dialog
				open={open}
				onClose={() => {
					setOpen(false);
				}}
			>
				<DialogTitle>{'View img'}</DialogTitle>
				<CardMedia component="img" alt={imageURL} image={imageURL} />
				<DialogActions>
					<Button onClick={() => setOpen(false)} color="primary" autoFocus>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};

export default compose(
	PageDecorator({
		resources: [ reducer ],
		actions: {
			getVariablesTask
		}
	}),
	withStyles(styles, { withTheme: true })
)(DetailCaptureTableCell);
