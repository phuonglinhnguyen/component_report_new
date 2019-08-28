import * as React from "react";
import routesPrivate from "./routesPrivate";
import routesPublic from "./routesPublic";
export default key => {
  if (key === "public") {
    return routesPublic;
  }
  return apps => {
    return routesPrivate;
  };
};
