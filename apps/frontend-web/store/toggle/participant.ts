import { atom } from "recoil";

export const participantLengthState = atom<number>({
  key: "participantLengthState",
  default: 1,
});
