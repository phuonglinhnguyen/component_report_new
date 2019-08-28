import React from 'react';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { BpmnViewer, xml, instances } from '../../../../../@components/bpmnMonitor';

const styles: any = (theme: any) => {
	return {};
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
        width: '1800px',
        height: '500px'
			}
		}
	}
});

const ViewWorkflowDialog = (props) => {
	const { open, setOpen } = props;
	const errorHandler = () => {
		console.log('do something when error');
	};

	const showHandler = () => {
		console.log('do something after rendering');
	};

	const clickElementHandler = (element) => {
		console.log(element);
	};

	return (
		<MuiThemeProvider theme={theme}>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle id="alert-dialog-title">{'Workflow Diagram'}</DialogTitle>
				<DialogContent>
					<BpmnViewer
						xml={xml}
						instances={instances}
						onError={errorHandler}
						onShown={showHandler}
						onClickElement={clickElementHandler}
						showZoomPanel={true}
					/>
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
export default withStyles(styles, { withTheme: true })(ViewWorkflowDialog);
