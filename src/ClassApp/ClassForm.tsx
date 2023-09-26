import { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { ClassTextInput } from "./ClassTextInput";
import { PhoneInputState, UserInformation } from "../types";
import {
  isCityValid,
  isEmailValid,
  isNameValid,
  isPhoneValid,
} from "../utils/validations";
import { ClassPhoneInput } from "./ClassPhoneInput";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export class ClassForm extends Component<{
  userInformationHandler: (userInformation: UserInformation) => undefined;
}> {
  state = {
    isSubmitted: false,
    firstNameInput: "",
    lastNameInput: "",
    emailInput: "",
    cityNameInput: "",
    phoneInputState: ["", "", "", ""] as PhoneInputState,
  };

  render() {
    const { userInformationHandler } = this.props;
    const {
      isSubmitted,
      firstNameInput,
      lastNameInput,
      emailInput,
      cityNameInput,
      phoneInputState,
    } = this.state;

    const firstNameIsValid = isNameValid(firstNameInput);
    const lastNameIsValid = isNameValid(lastNameInput);
    const emailIsValid = isEmailValid(emailInput);
    const cityIsValid = isCityValid(cityNameInput);
    const phoneIsValid = isPhoneValid(phoneInputState);

    const showFirstNameError = isSubmitted && !firstNameIsValid;
    const showLastNameError = isSubmitted && !lastNameIsValid;
    const showEmailError = isSubmitted && !emailIsValid;
    const showCityError = isSubmitted && !cityIsValid;
    const showPhoneError = isSubmitted && !phoneIsValid;

    const doBadInputsExist =
      !firstNameIsValid ||
      !lastNameInput ||
      !emailIsValid ||
      !cityIsValid ||
      !phoneIsValid;

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.setState({ isSubmitted: true });
          if (doBadInputsExist) {
            alert("Bad Inputs");
          } else {
            userInformationHandler({
              firstName: firstNameInput,
              lastName: lastNameInput,
              email: emailInput,
              city: cityNameInput,
              phone: phoneInputState.join(""),
            });
          }
        }}
      >
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
            onChange: ({ target: { value } }) =>
              this.setState({ firstNameInput: value }),
          }}
          isPhone={false}
        />

        <ErrorMessage
          message={firstNameErrorMessage}
          show={showFirstNameError}
        />

        {/* last name input */}
        <ClassTextInput
          label={"Last Name"}
          inputProps={{
            type: "text",
            placeholder: "Baggins",
            value: lastNameInput,
            onChange: ({ target: { value } }) =>
              this.setState({ lastNameInput: value }),
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
            onChange: ({ target: { value } }) =>
              this.setState({ emailInput: value }),
          }}
          isPhone={false}
        />

        <ErrorMessage message={emailErrorMessage} show={showEmailError} />

        {/* City Input */}
        <ClassTextInput
          label={"City"}
          inputProps={{
            type: "text",
            list: "cities",
            placeholder: "Hobbiton",
            value: cityNameInput,
            onChange: ({ target: { value } }) =>
              this.setState({ cityNameInput: value }),
          }}
          isPhone={false}
        />

        <ErrorMessage message={cityErrorMessage} show={showCityError} />

        <ClassPhoneInput
          phoneInput={phoneInputState}
          phoneInputHandler={(phoneInputState) => {
            this.setState({ phoneInputState: phoneInputState });
          }}
        />

        <ErrorMessage message={phoneNumberErrorMessage} show={showPhoneError} />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
