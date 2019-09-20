import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import { filter, get } from 'lodash';
import { withStyles } from '@material-ui/core/styles';

const styles: any = (theme: any) => {
	return {
		selectedList: {
			'&:hover': {
				cursor: 'pointer',
				background: 'lightgray'
			}
		},
		text: {
			'&:hover': {
				color: 'white'
			}
		},
		info: {
			display: 'grid',
			gridTemplateColumns: '1fr 1fr 1fr'
		}
	};
};

const Users = (props) => {
	const {
		classes,
		setAnchorEl,
		selectedAssign,
		user_assign,
		users,
		projectId,
		updateStepArr,
		setSelectedAssign
	} = props;
	const [ userNameSearch, setUserNameSearch ] = useState('');


	const onChooseUser = (user) => {
		console.log({selectedAssign});
		let tam = selectedAssign.map((_item) => {
			if (_item.assignee === null) {
				_item.assignee = user.UserName;
				return _item.id;
			}
		});
		setSelectedAssign([]);
		updateStepArr(user.UserName, projectId, tam)
		setAnchorEl(null);
	};

	const userOther = get(users, 'OtherMember', []);

	let users_tam = Object.assign({}, users);
	delete users_tam.OtherMember;

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
			return newUserAssign;
		});
		return data;
	};

	const newUsers = userAssign(user_assign);

	const filterData = (data, field, strSearch) => {
		const strSearchLowercase = strSearch ? String(strSearch).toLowerCase() : '';
		return filter(data, (item) => {
			const fieldTextLowercase = item[field] ? String(item[field]).toLowerCase() : '';
			if (!fieldTextLowercase) return false;
			return fieldTextLowercase.indexOf(strSearchLowercase) + 1;
		});
	};

	let userNameData = newUsers;
	if (userNameSearch) {
		userNameData = filterData(newUsers, 'UserName', userNameSearch);
	}

	const onSearchUserName = (e) => {
		const value = e.target.value;
		setUserNameSearch(value);
	};

	return (
		<React.Fragment>
			<TextField
				name="textAssignee"
				label="User"
				placeholder="ex:linhnp"
				style={{ margin: '10px' }}
				onChange={onSearchUserName}
				value={userNameSearch}
			/>
			{userNameSearch ? (
				<List className={classes.root}>
					{userNameData.map((user, index) => {
						return (
							<ListItem
								key={index}
								className={classes.selectedList}
								onClick={() => {
									onChooseUser(user);
								}}
							>
								<ListItemText className={classes.text}>
									<div className={classes.info}>
										<span>{user.UserName}</span>
										<span>{user.FullName}</span>
										<span>{user.JobTitle}</span>
									</div>
								</ListItemText>
							</ListItem>
						);
					})}
				</List>
			) : null}
		</React.Fragment>
	);
};
export default withStyles(styles, { withTheme: true })(Users);
