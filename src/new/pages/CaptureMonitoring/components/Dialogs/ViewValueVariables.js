import * as React from 'react';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import AceEditor from 'react-ace';
import { get } from 'lodash';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

const styles: any = (theme: any) => {
	return {
		title: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'baseline'
		},
		btnViecw: {
			fontSize: '10px'
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

const ViewValueVariables = (props) => {
	const { classes, open, setOpen, selectedVariable } = props;
	const values = get(selectedVariable, 'value', {});

	return (
		<MuiThemeProvider theme={theme}>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<div className={classes.title}>
					<DialogTitle>{'Value variables task '}</DialogTitle>
				</div>
				<DialogContent>
					<AceEditor
						mode="javascript"
						theme="monokai"
						showGutter={true}
						showPrintMargin={false}
						highlightActiveLine={true}
						readOnly={true}
						width="100%"
						value={JSON.stringify(values, null, 4)}
					/>
				</DialogContent>

				<DialogActions>
					<Button
						onClick={() => {
							setOpen(false);
						}}
						className={classes.btnViecw}
						color="primary"
						autoFocus
					>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</MuiThemeProvider>
	);
};
export default withStyles(styles, { withTheme: true })(ViewValueVariables);
