import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListIcon from '@material-ui/icons/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Users from '@material-ui/icons/PermIdentity';
import { getProjects } from '../../../providers/data/mockData/projects';
import { getGroupProjects } from '../../../providers/data/mockData/group_project';
import dashboardRoutes from '../routes/dashboardRoutes';
import { getDataUsers } from '../../../providers/data/mockData/task';
import Popper from '@material-ui/core/Popper';
import UsersDialog from './Dialog/UsersDialog';
import GroupProject from './GroupProject';

const drawerWidth = 300;

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
		}
	}
});

const styles = (theme) => ({
	testList: {
		fontWeight: 'bold',
		cursor: 'pointer',
		transition: 'background 0.1s ease-in',
		'&:hover': {
			background: 'lightgray'
		}
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 20
	},
	hide: {
		display: 'none'
	},
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
	drawerHeaderUser: {
		display: 'flex',
		alignItems: 'center',
		padding: '0 8px',
		...theme.mixins.toolbar,
		justifyContent: 'flex-start'
	},
	drawerUser: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaperUser: {
		width: drawerWidth
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
	itemLink: {
		textDecoration: 'none',
		color: 'wheat',
		'&:hover': {
			color: 'white'
		}
	},
	nested: {
		paddingLeft: '40px',
		fontWeight: 'bold'
	},
	dotOnline: {
		height: '8px',
		width: '8px',
		backgroundColor: '#4caf50',
		borderRadius: '50%',
		display: 'inline-block'
	},
	dotOffline: {
		height: '8px',
		width: '8px',
		backgroundColor: '#bbb',
		borderRadius: '50%',
		display: 'inline-block'
	},
	listUser: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'baseline',
		paddingRight: '20px',
		cursor: 'pointer',
		'&:hover': {
			background: 'lightgray'
		}
	},
	totalUser: {
		position: 'absolute',
		color: '#bbb',
		bottom: 0,
		padding: '10px',
		display: 'grid'
	}
});

const DetailUser = (props) => {
	const { user } = props;

	return (
		<div style={{ width: '300px' }}>
			<Paper>
				<div style={{ padding: '10px' }}>Infor User</div>
				<Divider />
				<div
					style={{
						padding: '10px',
						display: 'grid',
						gridTemplateColumns: '50% 50%'
					}}
				>
					<div>
						<div>Task:</div>
						<div>Full Name:</div>
						<div>Group Name:</div>
					</div>
					<div>
						<div>{user.taskName}</div>
						<div>{user.fullname}</div>
						<div>{user.groupname}</div>
					</div>
				</div>
			</Paper>
		</div>
	);
};

const DashBoard = (props) => {
	const { classes, theme } = props;
	const [open, setOpen] = useState(false);
	const [openUser, setOpenUser] = useState(false);
	const [openTotalUser, setOpenTotalUser] = useState(false);
	const users = getDataUsers();
	const toggleUser = () => {
		openUser ? setOpenUser(false) : setOpenUser(true);
	};

	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedUser, setSelectedUser] = useState('');

	const hoverUser = (e, user) => {
		setAnchorEl(e.currentTarget)
		setSelectedUser(user)
	};

	return (
		<BrowserRouter>
			<div className={classes.root}>
				<MuiThemeProvider theme={theme_override}>
					<CssBaseline />
					<div style={{ background: 'bottom', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
						<Toolbar disableGutters={!open}>
							<IconButton
								color="inherit"
								aria-label="Open drawer"
								onClick={() => setOpen(true)}
								className={classNames(classes.menuButton, open && classes.hide)}
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
							<span style={{ fontWeight: 'bold', paddingRight: '20px' }}>PROJECTS</span>
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
					<Drawer
						className={classes.drawerUser}
						variant="persistent"
						anchor="right"
						open={openUser}
						classes={{
							paper: classes.drawerPaperUser
						}}
					>
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<div style={{ paddingLeft: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>All Users</div>
							<IconButton color="secondary" onClick={() => setOpenTotalUser(true)}>
								<ListIcon />
							</IconButton>
							<UsersDialog users={users} open={openTotalUser} setOpen={setOpenTotalUser} />
						</div>

						<Divider />
						<List>
							{users.map((user) => {
								return (
									<div>
										<div
											className={classes.listUser}
											onMouseEnter={(e) => hoverUser(e, user)}
											onMouseLeave={(e) => hoverUser(e, null)}
										>
											<ListItem>{user.username}</ListItem>
										</div>


									</div>
								);
							})}
						</List>
						<Popper
							open={selectedUser !== null}
							anchorEl={anchorEl}
							placement="left"
							disablePortal={false}
						>
							<DetailUser user={selectedUser} />
						</Popper>
						<Divider />
						<div className={classes.totalUser}>
							<span>Total users online:5</span>
							<span>Total users offline:10</span>
						</div>
					</Drawer>
					<main
						className={classNames(
							classes.content,
							{
								[classes.contentShift]: open
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
