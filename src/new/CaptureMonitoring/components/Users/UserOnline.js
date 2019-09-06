import React, { useState } from 'react';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListIcon from '@material-ui/icons/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import { getDataUsers } from '../../../../../providers/data/mockData/task';
import Popper from '@material-ui/core/Popper';
import UsersDialog from '../Dialogs/UsersDialog';
const drawerWidth = 240;

const theme_override = createMuiTheme({
	overrides: {
		MuiDrawer: {
			paper: {
				height: '600px',
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
	const { user } = props;

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

const UserOnline = (props) => {
	const { classes, open, user_assign ,user_online} = props;
	console.log({user_online});
	// const user_in=get(user_online,'')
	const [ openTotalUser, setOpenTotalUser ] = useState(false);
	const users = user_assign || [];
	const [ anchorEl, setAnchorEl ] = useState(null);
	const [ selectedUser, setSelectedUser ] = useState('');

	const hoverUser = (e, user) => {
		setAnchorEl(e.currentTarget);
		setSelectedUser(user);
	};

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
										<span className={classes.dotOnline} />
									</div>
								</div>
							);
						})}
					</List>
					<Popper open={selectedUser !== null} anchorEl={anchorEl} placement="left" disablePortal={false}>
						<DetailUser user={selectedUser} />
					</Popper>
					<Divider />
					<div className={classes.totalUser}>
						<span>Total users online: 5</span>
						<span>Total users offline: 10</span>
					</div>
				</Drawer>
			</MuiThemeProvider>
		</div>
	);
};
export default withStyles(styles, { withTheme: true })(UserOnline);
