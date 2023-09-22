import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { FunctionalTextInput } from "./FunctionalTextInput";
import { isNameValid } from "../utils/validations";
import { OnChangeInputType } from "../types";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");

  const firstNameIsValid = isNameValid(firstNameInput);
  const lastNameIsValid = isNameValid(lastNameInput);

  const showFirstNameError = isSubmitted && !firstNameIsValid;
  const showLastNameError = isSubmitted && !lastNameIsValid;

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      setIsSubmitted(true);
    }}>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <FunctionalTextInput 
        label={"First Name"}
        inputProps={{
          type: "text",
          placeholder: "Bilbo",
          value: firstNameInput,
          onChange: ({target: {value}}: {target: {value: string}}) => { setFirstNameInput(value) }
        }}
      /> 
      <ErrorMessage message={firstNameErrorMessage} show={showFirstNameError} />

      {/* last name input */}
      <FunctionalTextInput 
        label={"Last Name"}
        inputProps={{
          type: "text",
          placeholder: "Baggins",
          value: lastNameInput,
          onChange: ({target: {value}}: {target: {value: string}}) => { setLastNameInput(value) }
        }}
      /> 
    
      <ErrorMessage message={lastNameErrorMessage} show={showLastNameError} />

      {/* Email Input */}
      <div className="input-wrap">
        <label>{"Email"}:</label>
        <input placeholder="bilbo-baggins@adventurehobbits.net" />
      </div>
      <ErrorMessage message={emailErrorMessage} show={isSubmitted} />

      {/* City Input */}
      <div className="input-wrap">
        <label>{"City"}:</label>
        <input placeholder="Hobbiton" />
      </div>
      <ErrorMessage message={cityErrorMessage} show={isSubmitted} />

      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
          <input type="text" id="phone-input-1" placeholder="55" />
          -
          <input type="text" id="phone-input-2" placeholder="55" />
          -
          <input type="text" id="phone-input-3" placeholder="55" />
          -
          <input type="text" id="phone-input-4" placeholder="5" />
        </div>
      </div>

      <ErrorMessage message={phoneNumberErrorMessage} show={isSubmitted} />

      <input type="submit" value="Submit" />
    </form>
  );
};
