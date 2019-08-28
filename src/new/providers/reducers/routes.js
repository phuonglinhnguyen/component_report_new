import { RECIVE_ROUTE } from "../actions/common";
const getRoutesApp = (state = [], action) => {
  switch (action.type) {
    case RECIVE_ROUTE:
      return action.payload;
    default:
      return state;
  }
};
export default getRoutesApp;
