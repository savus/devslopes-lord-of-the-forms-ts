import { allCities } from "./all-cities";

export function isEmailValid(emailAddress: string) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}

export function isNameValid(name: string) {
  return (
    name
      .split("")
      .every((char: string) => char.toUpperCase() !== char.toLowerCase()) &&
    name.length > 2
  );
}

export function isCityValid(name: string) {
  const decapitalizedCities = allCities.map((city) => city.toLowerCase());
  return decapitalizedCities.includes(name.toLowerCase());
}

export function isPhoneValid(phoneNum: []) {
  return phoneNum.join("").length === 7;
}
