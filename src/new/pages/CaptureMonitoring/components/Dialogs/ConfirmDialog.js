import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const styles: any = (theme: any) => {
	return {
		title: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'baseline'
		}
	};
};

const ConfirmDialog = (props) => {
	const {
		classes,
		isOpenConfirm,
		setIsOpenConfirm,
		itemDel,
		userDel,
		unclaimStep,
		projectId,
		selectedAssign
	} = props;

	const handleDelete = (task_id) => {
		const newItems = selectedAssign.map((item) => {
			if (item.id === task_id) {
				item.assignee = null;
				return item.id;
			}
		});
		unclaimStep(projectId, newItems);
		setIsOpenConfirm(false);
	};

	return (
		<Dialog open={isOpenConfirm} onClose={() => setIsOpenConfirm(false)}>
			<div className={classes.title}>
				<DialogTitle>{'Confirm remove assign user'}</DialogTitle>
			</div>
			<DialogContent>
				You sure remove assign user <span style={{ fontWeight: 'bold', color: 'red' }}>{userDel}</span>?
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setIsOpenConfirm(false)} color="primary" autoFocus>
					Cancel
				</Button>
				<Button
					onClick={() => {
						handleDelete(itemDel);
					}}
					color="primary"
					autoFocus
				>
					Ok
				</Button>
			</DialogActions>
		</Dialog>
	);
};
export default withStyles(styles, { withTheme: true })(ConfirmDialog);
