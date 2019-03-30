import React from 'react';

import axios from 'axios'
import SignIn from './SignIn'
class SiginPage extends React.Component  {
    

    render ()
     {
return (
    
        

<SignIn onSubmit={(credentials)=>{
axios.post('/api/users/login',credentials).then((response)=>{
    console.log(response.headers)
console.log(response.data)
})

}} />

)
     
    }
};

export default SiginPage