import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';

// components
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './components/Home';
import ProductDetails from './components/card/ProductDetails';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword  from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';
import Cart from './components/cart/Cart';
import ShippingInfo from './components/cart/ShippingInfo';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';
import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import ProcessOrder from './components/admin/ProcessOrder';
import UserList from './components/admin/UserList';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews';

// Redux
import { loadUser } from './actions/userAction';
import store from './store';
import ProtectedRoute from './components/route/ProtectedRoute';
import { loadStripe } from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js'
import {useSelector} from 'react-redux';


function App() {

  const [stripeKey,setStripeKey] = useState('');

  const  { loading,isAuthenticated,user} = useSelector(state => state.AuthReducer);



  useEffect(() => {
    store.dispatch(loadUser());
    async function getStripeApiKey() {
      const {data} = await axios.get('/api/v1/stripeapi');
      setStripeKey(data.stripeKey);
    }
    getStripeApiKey();
  },[])

  return (
    <Router>
    <div className="App">
      <Header/>
      <div className="container container-fluid">
      <Route path="/" component={Home}  exact/>
      <Route path="/search/:keyword" component={Home}/>
      <Route path="/product/:id" component={ProductDetails}  exact/>
      <Route path="/login" component={Login}  exact/>
      <Route path="/register" component={Register}  exact/>
      <Route path="/password/forgot" component={ForgotPassword}  exact/>
      <Route path="/password/reset/:token" component={NewPassword}  exact/>
      <Route path="/cart" component={Cart}  exact/>
      
      <ProtectedRoute path="/me" component={Profile}  exact/>
      <ProtectedRoute path="/me/update" component={UpdateProfile}  exact/>
      <ProtectedRoute path="/password/update" component={UpdatePassword}  exact/>
      <ProtectedRoute path="/shipping" component={ShippingInfo}  exact/>
      <ProtectedRoute path="/confirm" component={ConfirmOrder}  exact/>
      <ProtectedRoute path="/success" component={OrderSuccess}  exact/>
     
      <ProtectedRoute path="/orders/me" component={ListOrders}  exact/>
      <ProtectedRoute path="/order/:id" component={OrderDetails}  exact/>
 
     
      { stripeKey && 
        <Elements  stripe={loadStripe(stripeKey)}>
          <ProtectedRoute path="/payment"  component={Payment}  exact />
        </Elements>
      }
      </div>  
      <ProtectedRoute path="/dashboard" isAdmin={true} component={Dashboard}  exact/>
      <ProtectedRoute path="/admin/products" isAdmin={true} component={ProductList}  exact/>
      <ProtectedRoute path="/admin/product" isAdmin={true} component={NewProduct}  exact/>
      <ProtectedRoute path="/admin/product/:id" isAdmin={true} component={UpdateProduct}  exact/>
      <ProtectedRoute path="/admin/orders" isAdmin={true} component={OrderList}  exact/>
      <ProtectedRoute path="/admin/order/:id" isAdmin={true} component={ProcessOrder}  exact/>
      <ProtectedRoute path="/admin/users" isAdmin={true} component={UserList}  exact/>
      <ProtectedRoute path="/admin/user/:id" isAdmin={true} component={UpdateUser}  exact/>
      <ProtectedRoute path="/admin/reviews" isAdmin={true} component={ProductReviews}  exact/>

      {!loading && (!isAuthenticated || user.role !== 'admin') && (
        <Footer/>
      )}
    
    </div>
    </Router>
  );
}

export default App;
