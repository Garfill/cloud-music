import { atom } from "recoil";

const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '123123213213', // default value (aka initial value)
});

export {
  textState,
}