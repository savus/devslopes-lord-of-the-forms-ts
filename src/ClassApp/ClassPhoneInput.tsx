import {
  Component,
  Dispatch,
  SetStateAction,
  createRef,
  ChangeEventHandler,
} from "react";
import { PhoneInputState } from "../types";
import { ClassTextInput } from "./ClassTextInput";

export class ClassPhoneInput extends Component<{
  phoneInput: PhoneInputState;
  phoneInputHandler: Dispatch<SetStateAction<HTMLInputElement>>;
}> {
  render() {
    const { phoneInput, phoneInputHandler } = this.props;
    const refsList = [
      createRef<HTMLInputElement>(),
      createRef<HTMLInputElement>(),
      createRef<HTMLInputElement>(),
      createRef<HTMLInputElement>(),
    ];
    const maxLengths = [2, 2, 2, 1];

    const createOnChangeHandler =
      (index: 0 | 1 | 2): ChangeEventHandler<HTMLInputElement> =>
      (e) => {
        const value = e.target.value;
        if (isNaN(value)) return;
        const currentMaxLength = maxLengths[index];
        const nextRef =
          refsList[index < refsList.length - 1 ? index + 1 : index];
        const prevRef = refsList[index > 0 ? index - 1 : index];
        const shouldGoToNextRef = value.length === currentMaxLength;
        const shouldGoToPrevRef = value.length === 0;

        const newState = phoneInput.map((phoneInput, phoneIndex) =>
          index === phoneIndex ? value : phoneInput
        ) as PhoneInputState;

        if (shouldGoToNextRef) {
          nextRef.current?.focus();
        }

        if (shouldGoToPrevRef) {
          prevRef.current?.focus();
        }

        phoneInputHandler(newState);
      };

    return (
      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
          <ClassTextInput
            label={""}
            inputProps={{
              type: "text",
              id: "phone-input-1",
              placeholder: "55",
              value: phoneInput[0],
              onChange: createOnChangeHandler(0),
              ref: refsList[0],
              maxLength: maxLengths[0],
            }}
            isPhone={true}
          />
          -
          <ClassTextInput
            label={""}
            inputProps={{
              type: "text",
              id: "phone-input-2",
              placeholder: "55",
              value: phoneInput[1],
              onChange: createOnChangeHandler(1),
              ref: refsList[1],
              maxLength: maxLengths[1],
            }}
            isPhone={true}
          />
          -
          <ClassTextInput
            label={""}
            inputProps={{
              type: "text",
              id: "phone-input-3",
              placeholder: "55",
              value: phoneInput[2],
              onChange: createOnChangeHandler(2),
              ref: refsList[2],
              maxLength: maxLengths[2],
            }}
            isPhone={true}
          />
          -
          <ClassTextInput
            label={""}
            inputProps={{
              type: "text",
              id: "phone-input-4",
              placeholder: "5",
              value: phoneInput[3],
              onChange: createOnChangeHandler(3),
              ref: refsList[3],
              maxLength: maxLengths[3],
            }}
            isPhone={true}
          />
        </div>
      </div>
    );
  }
}
