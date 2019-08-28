import React from 'react';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
const styles: any = (theme: any) => {
	return {
		listItem: {
			'&:hover $listItemActions': {
				display: 'block !important'
			}
		},
		item: {
			display: 'flex',
			alignItems: 'center'
		},
		listItemActions: {
			display: 'none'
		},
		itemLink: {
			paddingLeft: '10px',
			textDecoration: 'none',
			color: 'wheat',
			'&:hover': {
				color: 'white'
			}
		}
	};
};

const theme_override = createMuiTheme({
	overrides: {
		MuiTypography: {
			subheading: {
				color: 'wheat'
			}
		},
		MuiIconButton: {
			root: {
				color: 'none',
				padding: '5px'
			}
		},
		MuiSvgIcon: {
			root: {
				height: '15px'
			}
		}
	}
});

const GroupChild = (props) => {
	const { classes, groupItem, wrapStyles = {}, setIsOpenGroupChild, isOpenGroupChild } = props;

	const isEmptyFields = isEmpty(get(groupItem, 'childs', []));
	const collapse = () => {
		setIsOpenGroupChild({
			...isOpenGroupChild,
			[groupItem.name]: !isOpenGroupChild[groupItem.name]
		});
	};
	return (
		<MuiThemeProvider theme={theme_override}>
			<ListItem button className={classes.listItem}>
				<div className={classes.item} style={wrapStyles}>
					{isEmptyFields ? (
						<div style={{ padding: '12px' }} />
					) : isOpenGroupChild[groupItem.name] ? (
						<IconButton onClick={collapse} size="small">
							<ExpandMore style={{ width: '15px' }} />
						</IconButton>
					) : (
						<IconButton onClick={collapse} size="small">
							<ExpandLess style={{ width: '15px' }} />
						</IconButton>
					)}
					<Link to={`/dashboard/capture_monitoring?groupId=${groupItem.id}`} className={classes.itemLink}>
						{groupItem.name}
					</Link>
				</div>
			</ListItem>
		</MuiThemeProvider>
	);
};

export default withStyles(styles, { withTheme: true })(GroupChild);
