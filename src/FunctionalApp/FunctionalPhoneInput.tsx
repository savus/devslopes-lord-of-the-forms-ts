import { ChangeEventHandler, Dispatch, SetStateAction, useRef, useState } from "react";
import { FunctionalTextInput } from "./FunctionalTextInput";
import { PhoneInputState } from "../types";

export function FunctionalPhoneInput({ phoneInput, phoneInputHandler}: {phoneInput: PhoneInputState, phoneInputHandler: Dispatch<SetStateAction<PhoneInputState>>}) {
   const refs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)]
   const maxLengths = [2,2,2,1];

   const onChangeEventHandler = (index: number): ChangeEventHandler<HTMLInputElement> => (e) => {
      const value = e.target.value;
      if (isNaN(value)) return;
      const currentMaxLength = maxLengths[index];
      const nextRef = refs[(index < refs.length - 1) ? index + 1 : index];
      const prevRef = refs[(index > 0) ? index - 1 : index];
      const shouldGoToNextRef = value.length === currentMaxLength;
      const shouldGoToPrevRef = value.length === 0;

      const newState = phoneInput.map((phoneInput, phoneIndex) => 
         (index === phoneIndex) ? value : phoneInput) as PhoneInputState;
      
      if (shouldGoToNextRef) {
         nextRef.current?.focus();
      }
      
      if (shouldGoToPrevRef) {
         prevRef.current?.focus();
      }

      phoneInputHandler(newState);
   }

   return (
    <div className="input-wrap">
      <label htmlFor="phone">Phone:</label>
      <div id="phone-input-wrap">
         <FunctionalTextInput 
            label={""}
            inputProps={{
               type:"text",
               id: "phone-input-1",
               placeholder: "55",
               value: phoneInput[0],
               onChange: onChangeEventHandler(0),
               ref: refs[0],
               maxLength: maxLengths[0]
            }}
            isPhoneInput={true}
         />
         -
         <FunctionalTextInput 
            label={""}
            inputProps={{
               type:"text",
               id: "phone-input-1",
               placeholder: "55",
               value: phoneInput[1],
               onChange: onChangeEventHandler(1),
               ref: refs[1],
               maxLength: maxLengths[1]
            }}
            isPhoneInput={true}
         />
         -
         <FunctionalTextInput 
            label={""}
            inputProps={{
               type:"text",
               id: "phone-input-1",
               placeholder: "55",
               value: phoneInput[2],
               onChange: onChangeEventHandler(2),
               ref: refs[2],
               maxLength: maxLengths[2]
            }}
            isPhoneInput={true}
         />
         -
         <FunctionalTextInput 
            label={""}
            inputProps={{
               type:"text",
               id: "phone-input-1",
               placeholder: "5",
               value: phoneInput[3],
               onChange: onChangeEventHandler(3),
               ref: refs[3],
               maxLength: maxLengths[3]
            }}
            isPhoneInput={true}
         />
      </div>
    </div>
  );
}
