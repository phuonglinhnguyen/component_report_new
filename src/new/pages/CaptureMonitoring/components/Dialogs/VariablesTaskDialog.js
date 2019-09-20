import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { PageDecorator } from '@dgtx/coreui';
import compose from 'recompose/compose';
import reducer from '../../redux/reducers';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Variablestask from '../Variablestask';
import DialogContent from '@material-ui/core/DialogContent';

const styles = (theme) => {
	return {
		btnViecw: {
			fontSize: '10px'
		}
	};
};

const VariablesTaskDialog = (props) => {
	const {classes, isOpen, setIsOpen, selectedAssign } = props;

	return (
		<React.Fragment>
			<Dialog
				open={isOpen}
				onClose={() => {
					setIsOpen(false);
				}}
			>
				<DialogTitle>{'View Variables Task'}</DialogTitle>
				<DialogContent>
					<Variablestask selectedAssign={selectedAssign} {...props} />
				</DialogContent>

				<DialogActions>
					<Button onClick={() => setIsOpen(false)} className={classes.btnViecw} color="primary" autoFocus>
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
		actions: {}
	}),
	withStyles(styles, { withTheme: true })
)(VariablesTaskDialog);
