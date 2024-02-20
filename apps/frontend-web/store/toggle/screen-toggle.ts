import { atom } from "recoil";

export const screentoggleState = atom<boolean>({
  key: "screentoggleState",
  default: false,
});
