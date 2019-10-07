import { Component } from 'react';
import * as Yup from 'yup';
import { PropTypes } from 'prop-types';

class ControlBase extends Component {
   handleChange = (e) => {
     const { currentTarget: input } = e;
     const error = this.validateControl(input);
     this.props.onChange(e, error);
   };

   validateControl = (input) => {
     const { name, value } = input;
     const { matchedInput } = this.props;

     if (matchedInput) {
       if (value !== matchedInput.value) {
         return `The value does not match to ${matchedInput.name}`;
       }
     }

     const objectToValidate = { [name]: value };
     const propertySchema = Yup.object().shape({ [name]: this.props.validationSchema });
     const result = {};
     try {
       result.value = propertySchema.validateSync(objectToValidate);
     } catch (propertyValidationError) {
       result.error = propertyValidationError;
     }
     return result.error ? result.error.message : null;
   };
}

ControlBase.propTypes = {
  matchedInput: PropTypes.shape({ name: PropTypes.string, value: PropTypes.string }),
  validationSchema: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

ControlBase.defaultProps = {
  matchedInput: null,
};


export default ControlBase;
