import React, { useState } from "react";

const initialInput = {
  "current-savings": 10000,
  "yearly-contribution": 1200,
  "expected-return": 7,
  duration: 10,
};

const UserInput = (props) => {
  const [userInput, setUserInput] = useState(initialInput);
  const submitHandler = (event) => {
    event.preventDefault();

    props.onCalculate(userInput);
  };

  const resetHandler = () => {
    setUserInput(initialInput);
    console.log("RESET");
  };

  const inputChangeHandler = (input, value) => {
    // first parameter identifies the source second param is the value which was entered.

    setUserInput((prevInput) => {
      return {
        ...prevInput,
        [input]: value,
        /* This is a special JavaScript syntax where we can set a property dynamically.
            We can access the existing property name by wrapping the identifier that contains the property name into the square brackets. */
      };
    });

    console.log(input, value);
  };

  return (
    <form onSubmit={submitHandler} className="form">
      <div className="input-group">
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input
            type="number"
            id="current-savings"
            onChange={
              (event) =>
                inputChangeHandler("current-savings", event.target.value)
              /* the handler function will not execute when the line is parsed but instead only when this arrow function will be executed by React when a value changes. */
            }
            value={userInput["current-savings"]}
          />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input
            type="number"
            id="yearly-contribution"
            onChange={(event) =>
              inputChangeHandler("yearly-contribution", event.target.value)
            }
            value={userInput["yearly-contribution"]}
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input
            type="number"
            id="expected-return"
            onChange={(event) =>
              inputChangeHandler("expected-return", event.target.value)
            }
            value={userInput["expected-return"]}
          />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input
            type="number"
            id="duration"
            onChange={(event) =>
              inputChangeHandler("duration", event.target.value)
            }
            value={userInput["duration"]}
          />
        </p>
      </div>
      <p className="actions">
        <button type="reset" className="buttonAlt" onClick={resetHandler}>
          Reset
        </button>
        <button type="submit" className="button">
          Calculate
        </button>
      </p>
    </form>
  );
};
export default UserInput;
