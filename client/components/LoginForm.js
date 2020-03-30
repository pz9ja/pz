// import { Form, Input } from "element-react";
import "element-theme-default";
import React, { useState, useEffect } from "react";
// import { render } from "node-sass";
let Form, Input;

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showui: false,
      user: {
        email: "",
        password: ""
      },
      rules: {
        email: [
          {
            required: true,
            message: "Email is required",
            trigger: "blur"
          },
          { type: "email", message: "Enter a valid email", trigger: "blur" }
        ],
        password: [
          {
            required: true,
            message: "Password is required",
            trigger: "blur"
          }
        ]
      }
    };
  }
  componentDidMount() {
    Form = require("element-react").Form;
    Input = require("element-react").Input;
    this.setState({ showui: true });
  }
  onChange = (key, value) => {
    this.setState({
      user: Object.assign(this.state.user, { [key]: value })
    });
  };
  render() {
    return (
      <div className="form-div">
        {this.state.showui}
        {this.state.showui && (
          <Form
            className="demo-form-stacked"
            model={this.state.user}
            labelPosition="top"
            labelWidth="100"
            rules={this.state.rules}
            ref="form"
          >
            <Form.Item label="Email" prop="email">
              <Input
                value={this.state.user.email}
                onChange={this.onChange.bind(this, "email")}
              ></Input>
            </Form.Item>
            <Form.Item label="Password" prop="password">
              <Input
                type="password"
                value={this.state.user.password}
                onChange={this.onChange.bind(this, "password")}
              ></Input>
            </Form.Item>
          </Form>
        )}
        <style jsx>{`
          .bg-grey {
            background: #f7f7f7 0% 0% no-repeat padding-box;
          }
          .min-height-100 {
            min-height: 100vh !important;
          }
          .form-div {
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-content: center;
            /* min-width: max-content; */
            // height: -webkit-fill-available;
          }
          .form-css {
            width: 300px;
            height: 400px;

            background: #ffffff 0% 0% no-repeat padding-box;
            box-shadow: 0px 3px 6px #00000029;
            opacity: 1;
          }
        `}</style>
        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }

          * {
            box-sizing: border-box;
          }
        `}</style>
      </div>
    );
  }
}

export default LoginForm;
