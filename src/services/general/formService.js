import * as Yup from 'yup';

class FormService {
  static validateForm = (objectSchema, stateData) => {
    const result = {};
    const productSchema = Yup.object().shape(objectSchema);
    try {
      result.value = productSchema.validateSync(stateData, { abortEarly: false });
    } catch (validationErrors) {
      result.errors = validationErrors.inner;
    }

    if (!result.errors) {
      return null;
    }

    // for (const item of result.error.details) errors[item.path[0]] = item.message;
    // was replaced by the code below due to airbnb requirement regarding for...of loop
    const errors = result.errors.reduce((accumulator, item) => ({ ...accumulator, ...{ [item.path]: item.message } }), {});

    return errors;
  };

  static validateFormItem = (input, matchedInputName, objectSchema, stateData) => {
    const { name, value } = input;
    const objectToValidate = { [name]: value };
    const propertySchema = Yup.object().shape({ [name]: objectSchema[name] });
    const result = {};
    try {
      result.value = propertySchema.validateSync(objectToValidate);
    } catch (propertyValidationError) {
      result.error = propertyValidationError;
    }

    if (matchedInputName) {
      if (value !== stateData[matchedInputName]) {
        return `The value does not match to ${matchedInputName}`;
      }
    }

    return result.error ? result.error.message : null;
  };

  static handleChange = (input, matchedInputName, prevState, formObjectSchema) => {
    const errors = { ...prevState.errors };
    const errorMessage = this.validateFormItem(input, matchedInputName, formObjectSchema, prevState.data);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }

    const newData = { ...prevState.data };
    newData[input.name] = input.value;

    return { data: newData, errors };
  };
}

export default FormService;
