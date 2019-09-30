import { PureComponent } from 'react';
import * as Yup from 'yup';

class FormBase extends PureComponent {
    state = {
      data: {},
      errors: {},
    }

   validateForm = (objectSchema) => {
     const result = {};
     const productSchema = Yup.object().shape(objectSchema);
     try {
       result.value = productSchema.validateSync(this.state.data, { abortEarly: false });
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

   handleControlChange = (e, errorMessage) => {
     const { currentTarget: input } = e;
     this.setState((prevState) => {
       const errors = { ...prevState.errors };
       if (errorMessage) {
         errors[input.name] = errorMessage;
       } else {
         delete errors[input.name];
       }

       const newData = { ...prevState.data };
       newData[input.name] = input.value;
       return { data: newData, errors };
     });
   };
}


export default FormBase;
