import React from 'react';
import { get } from 'lodash';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import DetailCapture from './../DetailCapture';
import moment from 'moment';

const styles: any = (theme: any) => {
	return {
		title: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'baseline'
		}
	};
};

const theme = createMuiTheme({
	overrides: {
		MuiDialog: {
			paperWidthSm: {
				maxWidth: '100%'
			}
		},
		MuiDialogContent: {
			root: {
				width: '1000px'
			}
		}
	}
});

const DetailDialog = (props) => {
	const { classes, open, setOpen, cap } = props;

	const created_time = get(cap, 'created_date', {});
	let tam = moment(created_time).format("dddd, MMMM Do YYYY, h:mm:ss a");

	return (
		<MuiThemeProvider theme={theme}>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<div className={classes.title}>
					<DialogTitle id="alert-dialog-title">{'Detail task '}</DialogTitle>
					<div style={{ paddingRight: '25px', color: 'gray' }}>{tam}</div>
				</div>

				<DialogContent>
					<DetailCapture cap={cap} {...props} />
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)} color="primary" autoFocus>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</MuiThemeProvider>
	);
};
export default withStyles(styles, { withTheme: true })(DetailDialog);
