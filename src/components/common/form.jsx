import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Dropdown from "./dropdown";
import TextArea from "./textArea";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false
    });
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = (input, matchedInputName) => {
    const { name, value } = input;
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    let { error } = Joi.validate(obj, schema);
    if (matchedInputName) {
      if (value !== this.state.data[matchedInputName])
        return `The value does not match to ${matchedInputName}`;
    }
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    console.log(errors);
    console.log(e);
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChange = (e, matchedInputName) => {
    const errors = { ...this.state.errors };
    const { currentTarget: input } = e;
    const errorMessage = this.validateProperty(input, matchedInputName);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const newdata = { ...this.state.data };
    newdata[input.name] = input.value;
    this.setState({ data: newdata, errors });
  };

  renderButton(label) {
    console.log("submitButton errors", this.validate());
    return (
      <button disabled={this.validate()} className="btn btn-secondary">
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text", matchedInputName) {
    const { data, errors } = this.state;
    console.log("renderInput data", data);
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        error={errors[name]}
        onChange={e => this.handleChange(e, matchedInputName)}
      />
    );
  }

  renderDropdown(name, label, options) {
    const { data, errors } = this.state;
    console.log("renderDropdownMethod", data);
    return (
      <Dropdown
        name={name}
        label={label}
        options={options}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }

  renderTextArea(name, label) {
    const { data, errors } = this.state;
    return (
      <TextArea
        name={name}
        label={label}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }
}

export default Form;
