import { atom } from "recoil";

export const mediaStreamState = atom<MediaStream>({
  key: "mediaStreamState",
  default: null!,
});
