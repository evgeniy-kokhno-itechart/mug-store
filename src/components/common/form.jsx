/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import Input from './input';
import Dropdown from './dropdown';
import TextArea from './textArea';

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });

    if (!result.error) {
      return null;
    }

    // for (const item of result.error.details) errors[item.path[0]] = item.message;
    // was replaced by the code below due to airbnb requirementregarding for...of loop
    const errors = result.error.details.reduce(
      (accumulator, item) => ({ ...accumulator, ...{ [item.path[0]]: item.message } }),
      {},
    );
    return errors;
  };

  validateProperty = (input, matchedInputName) => {
    const { name, value } = input;
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    if (matchedInputName) {
      if (value !== this.state.data[matchedInputName]) return `The value does not match to ${matchedInputName}`;
    }
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChange = (e, matchedInputName) => {
    const errors = { ...this.state.errors };
    const { currentTarget: input } = e;
    const errorMessage = this.validateProperty(input, matchedInputName);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }

    const newdata = { ...this.state.data };
    newdata[input.name] = input.value;
    this.setState({ data: newdata, errors });
  };

  renderButton(label, customClasses) {
    return (
      <button type="submit" disabled={this.validate()} className={`btn btn-secondary ${customClasses}`}>
        {label}
      </button>
    );
  }

  renderInput(name, label, type = 'text', matchedInputName) {
    const { data, errors } = this.state;
    return (
      <Input
        key={name}
        type={type}
        name={name}
        label={label}
        value={_.get(data, name)}
        error={errors[name]}
        onChange={e => this.handleChange(e, matchedInputName)}
      />
    );
  }

  renderDropdown(name, label, options) {
    const { data, errors } = this.state;
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
    return <TextArea name={name} label={label} value={data[name]} error={errors[name]} onChange={this.handleChange} />;
  }
}

export default Form;
