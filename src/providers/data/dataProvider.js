import resourceRegistry from "./resourceRegistry";

export default (type, resource, params) => {
  if (typeof resourceRegistry[resource] !== "function") {
  }
  return resourceRegistry[resource](type, resource, params);
};
