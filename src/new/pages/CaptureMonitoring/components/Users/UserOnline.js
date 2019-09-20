import React, { useState } from 'react';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListIcon from '@material-ui/icons/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { get } from 'lodash';
import UsersDialog from '../Dialogs/UsersDialog';
const drawerWidth = 240;

const theme_override = createMuiTheme({
	overrides: {
		MuiDrawer: {
			paper: {
				height: '720px',
				top: 'none'
			}
		}
	}
});

const styles = (theme) => ({
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
	const { user, userMappingTask } = props;
	const taskName = userMappingTask[user.UserName] || '';
	return (
		<div style={{ width: '300px' }}>
			<Paper>
				<div style={{ padding: '10px', fontWeight: 'bold', background: '#3c4858', color: '#fff' }}>Infor User</div>
				<Divider />
				<div
					style={{
						padding: '10px',
						display: 'grid',
						gridTemplateColumns: '50% 50%'
					}}
				>
					<div>
						<div>Full Name:</div>
						<div>Group Name:</div>
						<div>Task:</div>
					</div>
					<div>
						<div>{user.FullName}</div>
						<div>{user.ManagerFullName}</div>
						<div>{taskName}</div>
					</div>
				</div>
			</Paper>
		</div>
	);
};

const UserOnline = (props) => {
	const { classes, open, user_assign, user_online, users, project } = props;

	let projectName = get(project, 'name');

	let userOnlineProject = get(user_online, [ 'production', projectName ], {});

	const taskKeys = Object.keys(userOnlineProject);
	const userMappingTask = {};

	taskKeys.forEach((taskKey) => {
		const value = userOnlineProject[taskKey] || {};
		const users = value.users || [];
		users.forEach((user) => {
			userMappingTask[user] = taskKey;
		});
	});

	const [ openTotalUser, setOpenTotalUser ] = useState(false);
	const [ anchorEl, setAnchorEl ] = useState(null);
	const [ selectedUser, setSelectedUser ] = useState('');

	const userOnline = user_assign || [];

	let users_tam = Object.assign({}, users);
	const userOther = get(users, 'OtherMember', []);
	delete users_tam.OtherMember;
	users_tam['userOnlineProject'] = userOnlineProject;

	const userAssign = (user_assign) => {
		let data = user_assign.map((_item) => {
			let tam = userOther.filter((item) => {
				if (_item.username === item.UserName) {
					return item;
				}
			});
			
			let newUserAssign = tam[0];
			if (newUserAssign === undefined) {
				return users_tam;
			}
			newUserAssign['userOnlineProject'] = userOnlineProject;
			return newUserAssign;
		});
		return data;
	};

	const newUsers = userAssign(userOnline);
	const hoverUser = (e, user) => {
		setAnchorEl(e.currentTarget);
		setSelectedUser(user);
	};
	const totalUserOnline = Object.keys(userMappingTask).length;
	const totalUserOffline = newUsers.length - totalUserOnline;
	const listUserOnline = newUsers.filter((item, index) => {
		if (userMappingTask[item.UserName]) {
			return item;
		}
	});
	const listUserOffline = newUsers.filter((item, index) => {
		if (!userMappingTask[item.UserName]) {
			return item;
		}
	});

	const arrSortOnline = listUserOnline.concat(listUserOffline);
	
	return (
		<div className={classes.root}>
			<MuiThemeProvider theme={theme_override}>
				<Drawer
					className={classes.drawerUser}
					variant="persistent"
					anchor="right"
					open={open}
					classes={{
						paper: classes.drawerPaperUser
					}}
				>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							background: '#3c4858',
							color: '#fff'
						}}
					>
						<div style={{ paddingLeft: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>All Users</div>
						<IconButton color="secondary" onClick={() => setOpenTotalUser(true)}>
							<ListIcon />
						</IconButton>
						<UsersDialog
							newUsers={arrSortOnline}
							open={openTotalUser}
							setOpen={setOpenTotalUser}
							userMappingTask={userMappingTask}
						/>
					</div>

					<Divider />
					<List>
						{arrSortOnline.map((user) => {
							return (
								<div>
									<div
										className={classes.listUser}
										onMouseEnter={(e) => hoverUser(e, user)}
										onMouseLeave={(e) => hoverUser(e, null)}
									>
										<ListItem>{user.UserName}</ListItem>
										<span className={userMappingTask[user.UserName] ? classes.dotOnline : classes.dotOffline} />
									</div>
								</div>
							);
						})}
					</List>
					<Popper open={selectedUser !== null} anchorEl={anchorEl} placement="left" disablePortal={false}>
						<DetailUser user={selectedUser} userOnlineProject={userOnlineProject} userMappingTask={userMappingTask} />
					</Popper>
					<Divider />
					<div className={classes.totalUser}>
						<span>Total users online: {totalUserOnline ? totalUserOnline : 0}</span>
						<span>Total users offline: {totalUserOffline}</span>
					</div>
				</Drawer>
			</MuiThemeProvider>
		</div>
	);
};
export default withStyles(styles, { withTheme: true })(UserOnline);
