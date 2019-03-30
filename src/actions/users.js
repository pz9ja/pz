//import config from 'config';
import axios from 'axios';
export const addUser = (userData = {}) => ({
    type: 'ADD_USER',
    user: userData

})

export const startAddUser = (userData = {}) => {

    return (dispatch) => {

        const {
            username = '',
                firstName = '',
                lastName = '',
                email = '',
                bankName = '',
                accountNumber = '',
                password = '',
                confirm_password = ''

        } = userData;

        axios.post('/api/users/register', userData).then((data) => {
                console.log(data);
                dispatch(addUser)

                return data;
            }).catch(error => console.log(error))
            // const d = await axios.post('/api/user/register', userData)
            // console.log(d)

    }


}