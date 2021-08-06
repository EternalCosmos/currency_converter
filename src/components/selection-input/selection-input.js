import { FormControl, MenuItem, Select, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

import "./selection-input.scss";

const useStyles = makeStyles({
  root: {
    "@media (max-width: 650px)": {
      minWidth: "100%",
      width: "100%",
    },
  },
  select: {
    marginRight: "15px",
    minWidth: 150,
    "@media (max-width: 650px)": {
      marginBottom: "10px",
      marginRight: "0",
      minWidth: "100%",
      width: "100%",
    },
  },
  label: {
    left: "10px",
  },
});

const SelectionInput = ({ data, label, name, onChange, value, variant }) => {
  const classes = useStyles();

  const options = data?.map((option, index) => (
    <MenuItem value={option.value} key={option.text + index}>
      {option.text}
    </MenuItem>
  ));

  return (
    <FormControl className={classes.root}>
      <Select
        className={classes.select}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={label}
        value={value}
        variant={variant}
      >
        <MenuItem value="" disabled>
          {label}
        </MenuItem>
        {options}
      </Select>
    </FormControl>
  );
};

export default SelectionInput;

SelectionInput.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.exact({
      text: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  variant: PropTypes.string,
};
