import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/userService";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };

  schema = {
    password: Joi.string()
      .required()
      .min(8)
      .max(60)
      .label("Password"),
    email: Joi.string()
      .required()
      .email()
      .label("Email")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.email, data.password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        // User Did Something Wrong
        const errors = { ...this.state.errors };
        if (ex.response.data.email) {
          errors.email = ex.response.data.email;
        }
        if (ex.response.data.password) {
          errors.password = ex.response.data.password;
        }

        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div id="register-form">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit} style={{ padding: 5 }}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
