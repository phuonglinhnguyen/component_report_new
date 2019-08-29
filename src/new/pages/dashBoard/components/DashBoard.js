import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Users from '@material-ui/icons/PermIdentity';
import dashboardRoutes from '../routes/dashboardRoutes';
import DashBoardComponent from './DashBoardComponent';
import UserOnline from './Users/UserOnline';
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
	menuButton: {
		marginLeft: 12,
		marginRight: 20
	},
	hide: {
		display: 'none'
	},
	content: {
		flexGrow: 1,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: 0
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: drawerWidth
	},
	contentUser: {
		flexGrow: 1,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginRight: 0
	},
	contentShiftUser: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginRight: drawerWidth
	},

});

const DashBoard = (props) => {
	const { classes } = props;
	const [ openDashBoard, setOpenDashBoard ] = useState(false);
	const [ openUser, setOpenUser ] = useState(false);
	const toggleUser = () => {
		openUser ? setOpenUser(false) : setOpenUser(true);
	};

	return (
		<BrowserRouter>
			<div className={classes.root}>
				<MuiThemeProvider theme={theme_override}>
					<CssBaseline />
					<div style={{ background: 'bottom', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
						<Toolbar disableGutters={!openDashBoard}>
							<IconButton
								color="inherit"
								aria-label="Open drawer"
								onClick={() => setOpenDashBoard(true)}
								className={classNames(classes.menuButton, openDashBoard && classes.hide)}
							>
								<MenuIcon />
							</IconButton>
							<Typography variant="h6" color="inherit" noWrap style={{ fontWeight: 'bold' }}>
								MONITORING
							</Typography>
						</Toolbar>
						<Toolbar disableGutters>
							<IconButton onClick={toggleUser} className={classNames(classes.menuButton)}>
								<Users />
							</IconButton>
						</Toolbar>
					</div>
					<DashBoardComponent open={openDashBoard} setOpen={setOpenDashBoard} />
					<UserOnline open={openUser} />
					<main
						className={classNames(
							classes.content,
							{
								[classes.contentShift]: openDashBoard
							},
							classes.contentUser,
							{
								[classes.contentShiftUser]: openUser
							}
						)}
					>
						<Switch>
							{dashboardRoutes.map((route, index) => {
								return <Route key={index} path={route.path} exact={route.exact} component={route.component} />;
							})}
						</Switch>
					</main>
				</MuiThemeProvider>
			</div>
		</BrowserRouter>
	);
};
export default withStyles(styles, { withTheme: true })(DashBoard);
