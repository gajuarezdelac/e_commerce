import React,{ Fragment, useEffect, useState} from 'react';
import { Link, useHistory,useLocation } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import {login,clearError} from '../../actions/userAction';

// Components
import Loader from '../Layout/Loader';
import MetaData from '../Layout/MetaData';
import {useAlert} from 'react-alert';

const Login = () => {
     

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const history = useHistory();
    const location = useLocation();
    const alert = useAlert();
    const dispatch = useDispatch();

    const {isAuthenticated, error, loading} = useSelector(state => state.AuthReducer);

    const redirect =  location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        
        if(isAuthenticated) {
            history.push(redirect);
        } 
        
        if(error) {
            alert.error(error);
            dispatch(clearError());
        }
    },[dispatch, alert, isAuthenticated, error,history,redirect]);


    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(login(email, password));
    }

    return ( 
        <Fragment>
            {loading ? <Loader/> : (
                <Fragment>
                    <MetaData title={'Login'} />
                  
        <div className="row wrapper"> 
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
  
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

            <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>
  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              LOGIN
            </button>

            <Link to="/register" className="float-right mt-2">New User?</Link>
          </form>
		  </div>
    </div>
</Fragment>
            )}
        </Fragment>
     );
}
 
export default Login;