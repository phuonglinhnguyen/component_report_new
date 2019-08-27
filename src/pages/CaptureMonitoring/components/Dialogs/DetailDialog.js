import React from 'react';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import DetailCapture from './../DetailCapture';
import DetailQC from './../DetailQC';

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
				width: '1000px',
			}
		}
	}
});

const DetailDialog = (props) => {
	const { classes, open, setOpen, cap, choose, role } = props;

	return (
		<MuiThemeProvider theme={theme}>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<div className={classes.title}>
					<DialogTitle id="alert-dialog-title">{'Detail task ' + choose}</DialogTitle>
					<div style={{ paddingRight: '25px', color: 'gray' }}>2019-06-03T04:42:05.107+0000 </div>
				</div>

				<DialogContent>
					{role === 'QC' ? <DetailQC cap={cap} choose={choose} /> : <DetailCapture cap={cap} choose={choose} />}
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
