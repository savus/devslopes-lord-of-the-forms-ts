import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { FunctionalTextInput } from "./FunctionalTextInput";
import {
  isCityValid,
  isEmailValid,
  isNameValid,
  isPhoneValid,
} from "../utils/validations";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";
import { PhoneInputState } from "../types";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [cityNameInput, setCityNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneInputState, setPhoneInputState] = useState<PhoneInputState>([
    "",
    "",
    "",
    "",
  ]);

  const firstNameIsValid = isNameValid(firstNameInput);
  const lastNameIsValid = isNameValid(lastNameInput);
  const cityNameIsValid = isCityValid(cityNameInput);
  const emailIsValid = isEmailValid(emailInput);
  const phoneIsValid = isPhoneValid(phoneInputState);

  const showFirstNameError = isSubmitted && !firstNameIsValid;
  const showLastNameError = isSubmitted && !lastNameIsValid;
  const showCityNameError = isSubmitted && !cityNameIsValid;
  const showEmailError = isSubmitted && !emailIsValid;
  const showPhoneError = isSubmitted && !phoneIsValid;

  const doBadInputsExist =
    !firstNameIsValid ||
    !lastNameIsValid ||
    !cityNameIsValid ||
    !emailIsValid ||
    !isPhoneValid;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setIsSubmitted(true);
        if (doBadInputsExist) {
          alert("Bad Inputs");
        }
      }}
    >
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
          onChange: ({ target: { value } }: { target: { value: string } }) => {
            setFirstNameInput(value);
          },
        }}
        isPhoneInput={false}
      />
      <ErrorMessage message={firstNameErrorMessage} show={showFirstNameError} />

      {/* last name input */}
      <FunctionalTextInput
        label={"Last Name"}
        inputProps={{
          type: "text",
          placeholder: "Baggins",
          value: lastNameInput,
          onChange: ({ target: { value } }: { target: { value: string } }) => {
            setLastNameInput(value);
          },
        }}
        isPhoneInput={false}
      />

      <ErrorMessage message={lastNameErrorMessage} show={showLastNameError} />

      {/* Email Input */}
      <FunctionalTextInput
        label={"Email"}
        inputProps={{
          type: "text",
          placeholder: "bilbo-baggins@adventurehobbits.net",
          value: emailInput,
          onChange: ({ target: { value } }: { target: { value: string } }) => {
            setEmailInput(value);
          },
        }}
        isPhoneInput={false}
      />
      <ErrorMessage message={emailErrorMessage} show={showEmailError} />

      {/* City Input */}
      <FunctionalTextInput
        label={"City"}
        inputProps={{
          type: "text",
          placeholder: "Hobbiton",
          value: cityNameInput,
          list: "cities",
          onChange: ({ target: { value } }: { target: { value: string } }) => {
            setCityNameInput(value);
          },
        }}
        isPhoneInput={false}
      />

      <ErrorMessage message={cityErrorMessage} show={showCityNameError} />

      <FunctionalPhoneInput
        phoneInput={phoneInputState}
        phoneInputHandler={(phoneInputState) => {
          setPhoneInputState(phoneInputState);
        }}
      />

      <ErrorMessage message={phoneNumberErrorMessage} show={showPhoneError} />

      <input type="submit" value="Submit" />
    </form>
  );
};
