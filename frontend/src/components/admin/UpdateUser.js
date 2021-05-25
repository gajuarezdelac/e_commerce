import React,{ Fragment, useEffect, useState} from 'react';
import { useHistory,useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import {getUserDetails, updateUser,loadUser,clearError} from '../../actions/userAction';
import { ACTION_TYPES } from '../../constants/UserConst';

// import Loader from '../Layout/Loader';
import MetaData from '../Layout/MetaData';
import {useAlert} from 'react-alert';
import Sidebar from './SideBar';

const UpdateUser = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { id } = useParams();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');


    const {user} = useSelector(state => state.UserDetailsReducer);
    const { error, isUpdated, loading } = useSelector(state => state.UserReducer)


    useEffect(() => {
        
        if(user && user._id !== id){
            dispatch(getUserDetails(id));
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
        
        if(error) {
            alert.error(error);
            dispatch(clearError());
        }

        if(isUpdated){
            alert.success('User updated successfully')
            history.push('/admin/users')

            dispatch({
               type: ACTION_TYPES.UPDATE_PROFILE_RESET
            })
        }

    },[dispatch, alert,error,history,isUpdated,user,id]);


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('role', role);

        dispatch(updateUser(user._id, formData))
    }

  

    return (
        <Fragment>
            <MetaData title={`Update User`} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mt-2 mb-5">Update User</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="name"
                                        id="name_field"
                                        className="form-control"
                                        name='name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="role_field">Role</label>

                                    <select
                                        id="role_field"
                                        className="form-control"
                                        name='role'
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </div>

                                <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
}
 
export default UpdateUser;