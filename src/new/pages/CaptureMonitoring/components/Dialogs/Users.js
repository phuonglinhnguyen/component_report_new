import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import { getDataUsers } from '../../../../../providers/data/mockData/task';
const styles: any = (theme: any) => {
	return {
		selectedList: {
			'&:hover': {
				cursor: 'pointer',
				background: '#3c4858'
			}
		},
		text: {
			'&:hover': {
				color: 'white'
			}
		}
	};
};

const theme = createMuiTheme({
	overrides: {}
});
const Users = (props) => {
	const { classes, items, setItems, setAnchorEl, selectedAssign } = props;
	const users = getDataUsers();
	const onChooseUser = (user) => {
		const newItems = items.map((item) => {
			if (selectedAssign.username === '') {
				selectedAssign.username = user.username;
				return item;
			}
			return item;
		});
		setItems(newItems);
		setAnchorEl(null);
	};

	return (
		<List className={classes.root}>
			{users.map((user, index) => {
				return (
					<ListItem
						key={index}
						className={classes.selectedList}
						onClick={() => {
							onChooseUser(user);
						}}
					>
						<ListItemAvatar>
							<Avatar>
								<ImageIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText className={classes.text} primary={user.username} />
					</ListItem>
				);
			})}
		</List>
	);
};
export default withStyles(styles, { withTheme: true })(Users);
