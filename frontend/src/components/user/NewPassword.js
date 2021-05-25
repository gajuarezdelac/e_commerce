import React,{ Fragment, useEffect, useState} from 'react';
import { useHistory,useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import {resetPassword,clearError} from '../../actions/userAction';

// Components
import MetaData from '../Layout/MetaData';
import {useAlert} from 'react-alert';


const NewPassword = () => {
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const history = useHistory();
    const alert = useAlert();
    const dispatch = useDispatch();
    const { token } = useParams();

    console.log(token);

    const { error, success } = useSelector(state => state.ForgotPasswordReducer)

    useEffect(() => {
           
        if(error) {
            alert.error(error);
            dispatch(clearError());
        }

        if(success){
            alert.success('Password update successfully')
            history.push('/login');
        }

    },[dispatch, alert,error,success,history]);

    const submitHandler = (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.set('password', password);
      formData.set('confirmPassword', confirmPassword);

      dispatch(resetPassword(token,formData))
  }


    return ( <Fragment>
      <MetaData title={'Reset your password'}/>

      <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form onSubmit={submitHandler} className="shadow-lg">
                    <h1 className="mb-3">New Password</h1>

                    <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm_password_field">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        id="new_password_button"
                        type="submit"
                        className="btn btn-block py-3">
                        Set Password
                    </button>

                </form>
            </div>
        </div>

    </Fragment> );
}
 
export default NewPassword;
