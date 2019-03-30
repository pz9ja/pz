import React from 'react'
import {connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import TextField from '../../node_modules/@material-ui/core/TextField'


import asyncValidate from './asyncValidate'

const validate = values => {
  const errors = {}
  const requiredFields = [
    {name: 'firstName',label: 'first name'},
    'lastName',
    'email',
    'favoriteColor',
    'notes'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = `The ${field.label} is Required`
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  console.log(errors)
  return errors
}

const renderTextField = ({
  input,
  label,
  type,

  meta: { asyncValidating, touched, error },
  ...custom
}) => (
  <TextField
 
 label={label}
    error={touched && error}
    {...input}
    {...custom}
  />
)


let MaterialUiForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit= {handleSubmit}>
      <div>
        <Field
          name="firstName"
          component={renderTextField}
          label="First Name"
        />
      </div>
      
      <div>
        <Field name="email" component={renderTextField} label="Email" />
      </div>
     
      
      <div>
        <Field
          name="notes"
          component={renderTextField}
          label="Notes"
          multiline={true}
          rows={2}
        />
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

MaterialUiForm =  reduxForm({
  form: 'MaterialUiForm', // a unique identifier for this form
  validate,asyncValidate
})(MaterialUiForm);
export default MaterialUiForm;