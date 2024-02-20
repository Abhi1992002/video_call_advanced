import { atom } from "recoil";

export const audioToggleState = atom<boolean>({
  key: "audioToggleState",
  default: true,
});
