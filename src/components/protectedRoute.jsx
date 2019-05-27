import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../services/userService";
import { toast } from "react-toastify";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  toast.warn("You Need To Login For Access");
  return (
    <Route
      {...rest}
      render={props => {
        if (!auth.getCurrentUser()) {
          return <Redirect to="/login" />;
        } else {
          return Component ? <Component {...props} /> : render(props);
        }
      }}
    />
  );
};

export default ProtectedRoute;
