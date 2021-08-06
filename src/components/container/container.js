import { availableCurrencies } from "../../assets";
import { SelectionInput, TextInput, Result } from "../";
import { useEffect, useState } from "react";
import { generateUrl, makeRequest } from "../../utils";
import { Preloader } from "../../assets";

import "./container.scss";

const Container = () => {
  const [isFetching, setIsFetching] = useState(true);

  const [hasErrorAmount, setHasErrorAmount] = useState(false);

  const [valueFrom, setValueFrom] = useState("");
  const [valueTo, setValueTo] = useState("");
  const [valueAmount, setValueAmount] = useState("");

  const [rate, setRate] = useState("");
  const [result, setResult] = useState("");

  let debounce = null;

  const onAmountChange = (value) => {
    if (debounce) {
      clearTimeout(debounce);
    }
    debounce = setTimeout(() => {
      setValueAmount(value);
    }, 1300);
    if (value === "") {
      setHasErrorAmount(true);
    } else {
      setHasErrorAmount(false);
    }
  };

  useEffect(() => {
    if (valueFrom && valueTo && valueAmount) {
      const exchangePair = `${valueFrom}-${valueTo}`;
      const previousInfo = JSON.parse(localStorage.getItem("exchangeRates"));

      let secondsPassed;
      if (previousInfo?.hasOwnProperty(exchangePair)) {
        secondsPassed =
          (Date.now() - previousInfo?.[exchangePair]?.createdAt) / 1000;
      }

      if (!previousInfo || !secondsPassed || secondsPassed > 10) {
        setIsFetching(true);
        makeRequest("get", generateUrl(valueFrom, valueTo, valueAmount))
          .then((data) => {
            const {
              data: { info },
            } = data;
            setRate(info.rate.toFixed(2));
            const calculatedResult = info.rate * valueAmount;
            setResult(calculatedResult.toFixed(2));

            let exchangeRates = localStorage.getItem("exchangeRates");
            if (!exchangeRates) {
              exchangeRates = {
                [exchangePair]: {
                  rate: info.rate.toFixed(2),
                  createdAt: Date.now(),
                },
              };
              localStorage.setItem(
                "exchangeRates",
                JSON.stringify(exchangeRates)
              );
              setIsFetching(false);
            } else {
              exchangeRates = JSON.parse(exchangeRates);
              exchangeRates[exchangePair] = {
                rate: info.rate.toFixed(2),
                createdAt: Date.now(),
              };
              localStorage.setItem(
                "exchangeRates",
                JSON.stringify(exchangeRates)
              );
              setIsFetching(false);
            }
          })
          .catch((error) => {
            console.error(error);
            setIsFetching(false);
          });
      } else {
        const calculatedResult =
          previousInfo?.[exchangePair].rate * valueAmount;
        setResult(calculatedResult.toFixed(2));
      }
    }
  }, [valueFrom, valueTo, valueAmount]);

  useEffect(() => {
    setIsFetching(false);
    return () => {
      clearTimeout(debounce);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <div className="input_container">
        <SelectionInput
          data={availableCurrencies}
          label="I have"
          name="valueFrom"
          onChange={setValueFrom}
          value={valueFrom}
          variant="outlined"
        />
        <SelectionInput
          data={availableCurrencies}
          label="I'll get"
          name="valueTo"
          onChange={setValueTo}
          value={valueTo}
          variant="outlined"
        />
        <TextInput
          error={hasErrorAmount}
          label="Amount"
          name="Amount"
          onChange={onAmountChange}
          type="number"
          variant="outlined"
        />
      </div>
      {isFetching || !result ? (
        <Preloader imgClass="preloader" />
      ) : (
        <Result
          rate={rate}
          result={result}
          valueAmount={valueAmount}
          valueFrom={valueFrom}
          valueTo={valueTo}
        />
      )}
    </div>
  );
};

export default Container;
