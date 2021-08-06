import PropTypes from "prop-types";

import "./result.scss";

const Result = ({ rate, result, valueAmount, valueFrom, valueTo }) => {
  return (
    <div className="result_container">
      <p>
        1 {valueFrom} is <span className="red_text">{rate}</span> {valueTo}
      </p>
      <p>
        {valueAmount} {valueFrom} is <span className="red_text">{result}</span>{" "}
        {valueTo}
      </p>
    </div>
  );
};

export default Result;

Result.propTypes = {
  rate: PropTypes.string,
  result: PropTypes.string,
  valueAmount: PropTypes.string,
  valueFrom: PropTypes.string,
  valueTo: PropTypes.string,
};
