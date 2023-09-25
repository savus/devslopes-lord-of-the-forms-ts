import { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { ClassTextInput } from "./ClassTextInput";
import { PhoneInputState } from "../types";
import { isCityValid, isEmailValid, isNameValid, isPhoneValid } from "../utils/validations";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export class ClassForm extends Component {
  state = {
    isSubmitted: false,
    firstNameInput: "",
    lastNameInput: "",
    emailInput: "",
    cityNameInput: "",
    phoneInputState: ["", "", "", ""]
  };

  render() {
    const {isSubmitted, firstNameInput, lastNameInput, emailInput, cityNameInput, phoneInputState} = this.state;
    
    const firstNameIsValid = isNameValid(firstNameInput);
    const lastNameIsValid = isNameValid(lastNameInput);
    const emailIsValid = isEmailValid(emailInput);
    const cityIsValid = isCityValid(cityNameInput);
    const phoneIsValid = isPhoneValid(phoneInputState as PhoneInputState);

    const showFirstNameError = isSubmitted && !firstNameIsValid;
    const showLastNameError = isSubmitted && !lastNameIsValid;
    const showEmailError = isSubmitted && !emailIsValid;

    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        this.setState({isSubmitted: true});
      }}>
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* first name input */}
        <ClassTextInput 
          label={"First Name"}
          inputProps={{
            type: "text",
            placeholder: "Bilbo",
            value: firstNameInput,
            onChange: ({target: {value}}) => this.setState({firstNameInput: value})
          }}
          isPhone={false}
        />

        <ErrorMessage message={firstNameErrorMessage} show={showFirstNameError} />

        {/* last name input */}
        <ClassTextInput 
          label={"Last Name"}
          inputProps={{
            type: "text",
            placeholder: "Baggins",
            value: lastNameInput,
            onChange: ({target: {value}}) => this.setState({lastNameInput: value })
          }}
          isPhone={false}
        />

        <ErrorMessage message={lastNameErrorMessage} show={showLastNameError} />

        {/* Email Input */}
        <ClassTextInput 
          label={"Email"}
          inputProps={{
            type: "text",
            placeholder: "bilbo-baggins@adventurehobbits.net",
            value: emailInput,
            onChange: ({target: {value}}) => this.setState({emailInput: value })
          }}
          isPhone={false}
        />
        
        <ErrorMessage message={emailErrorMessage} show={showEmailError} />

        {/* City Input */}
        <div className="input-wrap">
          <label>{"City"}:</label>
          <input placeholder="Hobbiton" />
        </div>
        <ErrorMessage message={cityErrorMessage} show={true} />

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

        <ErrorMessage message={phoneNumberErrorMessage} show={true} />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
