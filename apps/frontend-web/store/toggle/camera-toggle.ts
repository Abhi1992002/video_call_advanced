import { atom } from "recoil";

export const cameraToggleState = atom<boolean>({
  key: "cameraToggleState",
  default: true,
});
