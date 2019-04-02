import React from 'react';
import   Button from '@material-ui/core/Button';
 import { validateAll} from 'indicative';
import {connect} from 'react-redux'
import { Field, reduxForm , formValueSelector} from 'redux-form'
import TextField from '../../node_modules/@material-ui/core/TextField'
import {Card } from 'react-bootstrap'


const validate = values => {
  const errors = {}
  const requiredFields = [
      {name:'firstName',label:'first name'},
      {name:'lastName',label:'last name'},
      {name:'email',label:'email'},
      {name:'username',label:'username'},
      {name:'bankName',label:'bank name'},
      {name:'accountNmumber',label:'account number'},
      {name:'password',label:'password'},
      
  
  ]
  requiredFields.forEach(field => {
    if (!values[field.name]) {
      errors[field.name] = `This ${field.label} is Required`;
      console.log(errors)
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }

  if (values.password !== values.confirm_password){
    errors.confirm_password = 'Passwords do not match'

  }
   
  return errors
}
console.log(validate)
// const styles = {
//   resize:{
// fontSize:30
// },
//   card_main:{
//     width:350
// }

// }


const renderTextField = ({
  input,
  label,
  type,


  meta: { asyncValidating, touched, error },
  ...custom
}) => (

  <TextField
 label={label}
   error={error && touched}
  fullWidth={true}
   helperText={error &&touched?error:''}
    {...input}
    {...custom}
    variant={"outlined"}
inputProps={{style:{fontSize:13}}}
InputLabelProps={{style:{fontSize:15}}}
  />

  
)


class AddUser extends React.Component {

    render(){
        const { firstName, lastName, username, bankName, accountNumber, password , 
          handleSubmit, pristine, reset, submitting ,classes} = this.props
        return(
          <div className="user-for">
          <div >

      <form  onSubmit={handleSubmit}>
    
      <div className="field">
        <Field
          name="firstName"
          component={renderTextField}
          label="first name"
        />
     
      </div>
      
      <div className="field">
        <Field
          name="lastName"
     
          component={renderTextField}
          label="last name"
       
        />
     
      </div>

      <div className="field">
        <Field
          name="username"
   
          component={renderTextField}
          label="username"
       
        />
     
      </div>

      <div className="field">
        <Field
          name="email"
          component={renderTextField}
          label="email"
       
        />
     
      </div>

      <div className="field">
        <Field
          name="bankName"
 
          component={renderTextField}
          label="bank name"
        />
      </div>

      <div className="field">
        <Field
          name="accountNumber"
          component={renderTextField}
          label="account number"
        />
      </div>

      <div className="field">
        <Field
          name="password"
          component={renderTextField}
          label="password"
        />
      </div>

      <div className="field">
        <Field
          name="confirm_password"
          component={renderTextField}
          label="confirm password"
        />
      </div>
    
    <div> <Button variant="contained" color="primary" type="submit"
    disabled={pristine || submitting}
    >Submit</Button>  

   
</div>

 </form>      
 
          </div>

          </div>
        )
    }
}


AddUser =  reduxForm({
  form: 'addUserForm', // a unique identifier for this form
  validate
})(AddUser);

// AddUser =  reduxForm({
//   form: 'EdituserForm', // a unique identifier for this form
//   validate
// })(AddUser);


const selector = formValueSelector('addUserForm');
AddUser = connect(state=> {
const { firstName , lastName, username, bankName, accountNumber, password,confirm_password} = 
selector(state, 'firstname', 'lastName','username','bankName', 'accountNumber', 'password','confirm_password')

return {
  firstName , lastName, username, bankName, accountNumber, password,confirm_password
}
})(AddUser)



export default AddUser