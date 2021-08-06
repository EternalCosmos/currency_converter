import { ACCESS_KEY, USERNAME } from "../assets";

export const generateUrl = (from, to, amount) => {
  return `https://v1.nocodeapi.com/${USERNAME}/cx/${ACCESS_KEY}/rates/convert?amount=${amount}&from=${from}&to=${to}`;
};
