import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const styles: any = (theme: any) => {
	return {
		control: {
			marginBottom: '10px'
		},
		bodyFilter: {
			margin: '0 20px',
			display: 'flex'
		},
		titleFilter: {
			fontSize: '18px',
			fontWeight: 'bold',
			padding: '20px'
		},
		btnExport: {
			float: 'right',
			background: '#3c4858',
			margin: '10px',
			color: '#fff',
			fontWeight: 'bold',
			'&:hover': {
				background: '#ffa000'
			}
		},
		textField: {
			marginRight: '20px',
			marginBottom: '20px'
		},
		textSelect: {
			width: '200px',
			marginRight: '20px'
		}
	};
};

const theme = createMuiTheme({
	overrides: {
		MuiInput: {
			root: {
				fontSize: '14px'
			}
		},
		MuiInputLabel: {
			root: {
				fontSize: '14px'
			}
		}
	}
});

const FilterComponent = (props) => {
	const {
		classes,
		setUserNameSearch,
		setFullNameSearch,
		setGroupNameSearch,
		setLocationSearch,
		setLayoutSearch,
		setWorkTypeSearch,
		setSectionSearch,
		setStepSearch,
		setFromdDateSearch,
		setToDateSearch
	} = props;

	const {
		userNameSearch,
		fullNameSearch,
		groupNameSearch,
		locationSearch,
		layoutSearch,
		workTypeSearch,
		sectionSearch,
		stepSearch,
		fromDateSearch,
		toDateSearch
	} = props;

	const locations = [ { label: 'HCM', value: 'hcm' }, { label: 'CTB', value: 'ctb' }, { label: 'ALL', value: '' } ];

	const workTypes = [
		{ label: 'In WorkShift', value: 'in workshift' },
		{ label: 'Out WorkShift', value: 'out workshift' },
		{ label: 'Overtime', value: 'overtime' },
		{ label: 'ALL', value: '' }
	];

	const onSearchUser = (e) => {
		const value = e.target.value;
		setUserNameSearch(value);
	};

	const onSearchFullname = (e) => {
		const value = e.target.value;
		setFullNameSearch(value);
	};

	const onSearchLayout = (e) => {
		const value = e.target.value;
		setLayoutSearch(value);
	};

	const onSearchGroupname = (e) => {
		const value = e.target.value;
		setGroupNameSearch(value);
	};

	const onSearchType = (e) => {
		const value = e.target.value;
		if (value === '') {
			setWorkTypeSearch('');
		}
		setWorkTypeSearch(value);
	};

	const onSearchLocation = (e) => {
		const value = e.target.value;
		if (value === '') {
			setLocationSearch('');
		}
		setLocationSearch(value);
	};

	const onSearchSection = (e) => {
		const value = e.target.value;
		setSectionSearch(value);
	};

	const onSearchStep = (e) => {
		const value = e.target.value;
		setStepSearch(value);
	};

	const onSearchFromDate = (e) => {
		const value = e.target.value;
		setFromdDateSearch(value);
	};

	const onSearchToDate = (e) => {
		const value = e.target.value;
		setToDateSearch(value);
	};

	return (
		<MuiThemeProvider theme={theme}>
			<div>
				<div className={classes.control}>
					<span className={classes.titleFilter}>Filter</span>
				</div>
				<div className={classes.bodyFilter}>
					<div>
						<TextField
							name="username"
							label="Username"
							margin="dense"
							className={classes.textField}
							type="search"
							value={userNameSearch}
							onChange={onSearchUser}
						/>
						<TextField
							name="fullname"
							label="Full Name"
							margin="dense"
							className={classes.textField}
							type="search"
							value={fullNameSearch}
							onChange={onSearchFullname}
						/>
						<TextField
							name="group_name"
							label="Group Name"
							margin="dense"
							className={classes.textField}
							type="search"
							value={groupNameSearch}
							onChange={onSearchGroupname}
						/>
						<TextField
							select
							name="work_type"
							className={classes.textSelect}
							label="Work Type"
							margin="dense"
							onChange={onSearchType}
							value={workTypeSearch}
						>
							{workTypes.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
						<TextField
							select
							name="location"
							className={classes.textSelect}
							label="Location"
							margin="dense"
							onChange={onSearchLocation}
							value={locationSearch}
						>
							{locations.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
						<TextField
							name="layout"
							label="Layout"
							margin="dense"
							className={classes.textField}
							type="search"
							value={layoutSearch}
							onChange={onSearchLayout}
						/>
						<TextField
							name="section"
							label="Section"
							margin="dense"
							className={classes.textField}
							type="search"
							value={sectionSearch}
							onChange={onSearchSection}
						/>
						<TextField
							name="step"
							label="Step"
							margin="dense"
							type="search"
							className={classes.textField}
							value={stepSearch}
							onChange={onSearchStep}
						/>
						<TextField
							label="From"
							name="fromDate"
							type="date"
							margin="dense"
							className={classes.textField}
							onChange={onSearchFromDate}
							value={fromDateSearch}
							InputLabelProps={{
								shrink: true
							}}
						/>
						<TextField
							label="To"
							type="date"
							name="toDate"
							margin="dense"
							className={classes.textField}
							onChange={onSearchToDate}
							value={toDateSearch}
							InputLabelProps={{
								shrink: true
							}}
						/>
					</div>
				</div>
			</div>
		</MuiThemeProvider>
	);
};
export default withStyles(styles, { withTheme: true })(FilterComponent);
