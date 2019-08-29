import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import GroupProject from './GroupProject';

const drawerWidth = 240;

const theme_override = createMuiTheme({
	overrides: {
		MuiDrawer: {
			paper: {
				height: '854px',
				top: 'none'
			}
		},
		DashBoard: {
			toolbar: {
				justifyContent: 'space-between'
			}
		},
		MuiIconButton: {
			root: {
				color: 'none'
			}
		}
	}
});

const styles = (theme) => ({
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth,
		background: '#3c4858',
		color: 'wheat'
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: '0 8px',
		...theme.mixins.toolbar,
		justifyContent: 'flex-end'
	},
	itemLink: {
		textDecoration: 'none',
		color: 'wheat',
		fontWeight: 'bold',
		'&:hover': {
			color: 'white'
		}
	}
});

const DashBoardComponent = (props) => {
	const { classes, theme, open, setOpen } = props;
	return (
		<div className={classes.root}>
			<MuiThemeProvider theme={theme_override}>
				<Drawer
					className={classes.drawer}
					variant="persistent"
					anchor="left"
					open={open}
					classes={{
						paper: classes.drawerPaper
					}}
				>
					<div className={classes.drawerHeader}>
						<Link to={`/dashboard/capture_monitoring`} className={classes.itemLink}>
							ALL PROJECTS
						</Link>
						<IconButton
							onClick={() => {
								setOpen(false);
							}}
						>
							{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
						</IconButton>
					</div>
					<Divider />
					<GroupProject />
				</Drawer>
			</MuiThemeProvider>
		</div>
	);
};
export default withStyles(styles, { withTheme: true })(DashBoardComponent);
