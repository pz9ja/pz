import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { validateAll} from 'indicative'

class AddUser extends React.Component {
   state = {
      errors:'',
      passequal:'',
       firstName:'',
       lastName:'',
       username:'',
       email:'',
       bankName:'',
       accountNumber:'',
       password:'',
       confirm_password:''
 
   }

onHandleChange = (e)=>{
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value})
    
} 

   
         onSubmit = (e) =>{
            e.preventDefault();
            if (this.state.password !== this.state.confirm_password){
            this.setState({passequal:'password not match'});
          }
         const messages = {
                required: 'This {{field}} is required.',
                'email.email' : 'This email is invalid'
            }
            const data = this.state;
            const rules = {
                firstName: 'required|string',
                lastName: 'required|string',
                email: 'required|email',
                bankName:'required|string',
                accountNumber: 'required|string',
                password:'required|string|min:6'

            }
          validateAll(data, rules, messages).then((m)=>{
               console.log(m)
           }).catch( (errors) => {
               
            const formattedErrors={};
            errors.forEach(error=> formattedErrors[error.field] = error.message);
            this.setState(()=> ({
                
                errors:formattedErrors})
               

                );
                
            })
            console.log(this.state);
              this.props.onSubmit({
                firstName : this.state.firstName,
                lastName: this.state.lastName,
                username: this.state.username,
                bankName:this.state.bankName,
                accountNumber:this.state.accountNumber,
                password:this.state.password
              })

  
        }
        

    render(){
        return(
     
      <form className="form-type material p-50 mb-8 w-400" onSubmit={this.onSubmit}>
     
     <div className="form-group">
         <label >first name</label>
         <input  type="text"
         name="firstName"
          className="form-control" 
         placeholder="First Name" 
      
      type="text"
       onChange={this.onHandleChange}
         /> 
        {this.state.errors.firstName && 
        <span className="small text-danger">{this.state.errors.firstName}</span>
        }
     </div>

     <div className="form-group">
         <label >last name</label>
         <input name="lastName" className="form-control"  type="text"
         placeholder="Last Name" 
        value={this.state.lastName}  
          type="text"
     onChange={this.onHandleChange}
      />
      {this.state.errors.lastName && 
        <span className="small text-danger">{this.state.errors.lastName}</span>
        }
     </div>

     <div className="form-group">
         <label >username</label>
         <input  name="username" className="form-control" 
         placeholder="Username" 
     onChange={this.onHandleChange}
     type="text" />
     {this.state.errors.username && 
        <span className="small text-danger">{this.state.errors.userName}</span>
        }
     </div>

     <div className="form-group">
         <label >email</label>
         <input name="email" className="form-control" 
         placeholder="Username"
         type="text"
         onChange={this.onHandleChange}
        />
        {this.state.errors.email && 
        <span className="small text-danger">{this.state.errors.email}</span>
        }
      </div>

        <div className="form-group">
         <label >
         bank name
         </label>
         <input name="bankName" className="form-control" 
         placeholder="bank name" 
         onChange={this.onHandleChange}
         type="text"
         onChange={this.onHandleChange}
        />
        {this.state.errors.bankName && 
        <span className="small text-danger">{this.state.errors.bankName}</span>
        }
        </div>

        <div className="form-group">
         <label >
         account number
         </label>
         <input name="accountNumber" className="form-control" 
         placeholder="account number" 
         
         type="text"
         onChange={this.onHandleChange}
        />
        {this.state.errors.accountNumber && 
        <span className="small text-danger">{this.state.errors.accountNumber}</span>
        }
        </div>

        <div className="form-group">
         <label >
         password
         </label>
         <input name="password" className="form-control" 
         placeholder="password" 

          autoFocus 
         type="text"
         onChange={this.onHandleChange}
        />
        {this.state.errors.password && 
        <span className="small text-danger">{this.state.errors.password}</span>
        }
     </div>
     <div className="form-group">
         <label >
       confirm  password
         </label>
         <input name="confirm_password" className="form-control" 
         placeholder="confirm password"  
         type="text"
         onChange={this.onHandleChange}
        />
        {this.state.passequal && 
        <span className="small text-danger">{this.state.passequal}</span>
        }
     </div>

    
    
     <Button variant="primary" type="submit">Submit</Button>  

 </form>      


        )
    }
}

