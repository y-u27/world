import { atom } from "recoil";

export const worldState = atom<string>({
  key: "worldState",
  default: "",
});
