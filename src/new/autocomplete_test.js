import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import { withStyles } from '@material-ui/core/styles';
import { getDataUserOther } from './data_user_order'
import { log } from 'util';
const suggestions = getDataUserOther()

const renderInputComponent = (inputProps) => {
  const { classes, inputRef = () => { }, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

const renderSuggestion = (suggestion, { query, isHighlighted }) => {
  const matches = match(suggestion.UserName, query);
  const parts = parse(suggestion.UserName, matches);
  const arrSugg = suggestion || []
  console.log(arrSugg);

  return (
    <MenuItem selected={isHighlighted} component="div" onClick={() => { console.log("dsd") }}>
      <div style={{ width: '100px' }}>
        {parts.map(part => (
          <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
            {part.text}
          </span>
        ))}

      </div>
      <span style={{ paddingLeft: '10px', width: '150px' }}>
        {suggestion.FullName}
      </span>
      <span style={{ paddingLeft: '40px' }}>
        {suggestion.JobTitle}
      </span>
    </MenuItem>

  );
}

const getSuggestions = (value) => {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
      const keep =
        count < 5 && suggestion.UserName.slice(0, inputLength).toLowerCase() === inputValue;

      if (keep) {
        count += 1;
      }

      return keep;
    });
}

const getSuggestionValue = (suggestion) => {
  return suggestion.UserName;
}

const styles = theme => ({
  root: {
    height: 250,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

const IntegrationAutosuggest = (props) => {
  const { classes } = props

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [state, setState] = React.useState({
    popper: '',
  });
  const [stateSuggestions, setSuggestions] = React.useState([]);
  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = name => (event, { newValue }) => {
    setState({
      ...state,
      [name]: newValue,
    });
  };

  const autosuggestProps = {
    renderInputComponent,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion,
  };
  return (
    <div className={classes.root}>
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          classes,
          label: 'User',
          placeholder: 'ex:linhnp',
          value: state.popper,
          onChange: handleChange('popper'),
          inputRef: node => {
            setAnchorEl(node);
          },
          InputLabelProps: {
            shrink: true,
          },
        }}
        theme={{
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderSuggestionsContainer={options => {
          console.log(options)
          return (
            <Popper anchorEl={anchorEl} open={Boolean(options.children)}>
              <Paper
                square
                {...options.containerProps}
                style={{ width: anchorEl ? anchorEl.clientWidth : undefined }}
              >
                {options.children}
              </Paper>
            </Popper>
          )
        }

        }
      />
    </div>
  );
}
export default withStyles(styles)(IntegrationAutosuggest);
