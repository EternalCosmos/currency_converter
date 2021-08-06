import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

import "./text-input.scss";

const useStyles = makeStyles({});

const TextInput = ({ error, label, name, onChange, type, variant }) => {
  const classes = useStyles({
    root: {
      width: 200,
    },
  });

  return (
    <div className="text_field_container">
      <TextField
        className={classes.root}
        error={error}
        label={label}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        variant={variant}
      />
      {error && (
        <span className="text_field_error">This field is required</span>
      )}
    </div>
  );
};

export default TextInput;

TextInput.propTypes = {
  error: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string,
  variant: PropTypes.string,
};
