import React from 'react';
import AddUserForm from '../components/AddUserForm';
import {addUser,startAddUser} from '../actions/users';
import {connect} from 'react-redux';

class AddUserPage extends  React.Component {
    render() {
        return (
 <div>
    <AddUserForm form="addUserForm"
    onSubmit={(user)=>{
        console.log(user)
        this.props.startAddUser(user);
       this.props.history.push('/');
    
    }}
    
    />
    </div>
        )
    }
   
}

// const mapStatetoProps = (state,props) =>{
//     user:props.values
// }

const mapDispatchtoProps = (dispatch)=>({
startAddUser: (user)=> dispatch(startAddUser(user)) 
})
export default connect(undefined, mapDispatchtoProps)(AddUserPage);