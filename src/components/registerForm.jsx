import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/userService";

class RegisterForm extends Form {
  state = {
    data: { username: "", email: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .min(5)
      .max(60)
      .label("Username"),
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
      const response = await auth.register(this.state.data);
      auth.loginWithJwt(response.data.token);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        // User Did Something Wrong
        const errors = { ...this.state.errors };
        if (ex.response.data.email) {
          errors.email = ex.response.data.email;
        }
        if (ex.response.data.username) {
          errors.username = ex.response.data.username;
        }

        this.setState({ errors });
      }
    }
  };

  redirectToLogin = () => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <div id="register-form">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit} style={{ padding: 5 }}>
          {this.renderInput("username", "Username")}
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
          <button
            className="btn btn-primary"
            onClick={() => this.redirectToLogin()}
            style={{ marginLeft: 5 }}
          >
            Already Have an Account?
          </button>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
