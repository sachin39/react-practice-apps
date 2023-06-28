import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const nameInputRef = useRef(); //refs are used when you just want to read the value from a dom and you dont want to update dom. If you want to manipulate the dom you need to use states.
  const ageInputRef = useRef(); //default value is null;

  const [error, setError] = useState();
  const addUserHandler = (event) => {
    event.preventDefault();
    console.log(nameInputRef.current.value); //a json object will be output on the console and that object have a current property that holds the actual value of the element to which this ref connected to.
    const eneteredName = nameInputRef.current.value;
    const eneterdUserAge = ageInputRef.current.value;
    if (
      eneteredName.trim().length === 0 ||
      eneterdUserAge.trim().length === 0
    ) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+eneterdUserAge < 1) {
      //append + for comparing the string to a number because the enteredAge is a string bydefault.
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (>0).",
      });
      return;
    }

    const enteredUser = {
      name: eneteredName,
      age: eneterdUserAge,
      id: Math.random().toString(),
    };
    props.onAddUser(enteredUser);
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username </label>
          <input id="username" type="text" ref={nameInputRef}></input>
          <label htmlFor="age">Age (Years) </label>
          <input id="age" type="number" ref={ageInputRef}></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};
export default AddUser;
