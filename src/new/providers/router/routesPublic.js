import { Signin } from "../../views";
let privatePublic = [];
if (process.env["NODE_ENV"] !== "production") {
  privatePublic = [
    {
      name: "signin",
      exact: true,
      path: "/signin",
      component: Signin
    }
  ];
}
export default privatePublic;
