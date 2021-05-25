import React, { Fragment,useState,useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link,useParams} from 'react-router-dom';
import  { getOrderDetails,updatedOrder,clearError } from '../../actions/OrderAction';
import {useAlert} from 'react-alert';

// Componentss
import MetaData from '../Layout/MetaData';
import Loader from '../Layout/Loader';
import Sidebar from './SideBar';
import { ACTION_TYPES } from '../../constants/OrderConst';


const ProcessOrder = () => {

  const {id} = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const [status, setStatus] = useState('');

  const { loading, order = {}  } = useSelector(state => state.OrderDetailsReducer);
  const {shippingInfo, orderItems,paymentInfo, user,totalPrice,orderStatus} = order;
  const { error, isUpdated } = useSelector(state => state.DelUpdOrderReducer)


  useEffect(() => {

    dispatch(getOrderDetails(id));

      if (error) {
          alert.error(error);
          dispatch(clearError())
      }

      
      if (isUpdated) {
          alert.success('Order updated successfully');
          dispatch({ type: ACTION_TYPES.UPDATE_ORDER_RESET })
      }

  }, [dispatch, alert, error, isUpdated,id])


  const updateOrderHandler = (id) => {

    const formData = new FormData();
    formData.set('status', status);

    dispatch(updatedOrder(id, formData))
  }
  
  const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city},${shippingInfo.postalCode},${shippingInfo.country}`;
  const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false; 

    return ( 
        <Fragment>
        <MetaData title={'Process Orders'} />
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>

            <div className="col-12 col-md-10">
                
            <Fragment>
                        {loading ? <Loader /> : (
                            <div className="row d-flex justify-content-around">
                                <div className="col-12 col-lg-7 order-details">

                                    <h2 className="my-5">Order # {order._id}</h2>

                                    <h4 className="mb-4">Shipping Info</h4>
                                    <p><b>Name:</b> {user && user.name}</p>
                                    <p><b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                                    <p className="mb-4"><b>Address:</b>{shippingDetails}</p>
                                    <p><b>Amount:</b> ${totalPrice}</p>

                                    <hr />

                                    <h4 className="my-4">Payment</h4>
                                    <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "PAID" : "NOT PAID"}</b></p>

                                    <h4 className="my-4">Stripe ID</h4>
                                    <p><b>{paymentInfo && paymentInfo.id}</b></p>

                                    <h4 className="my-4">Order Status:</h4>
                                    <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>



                                    <h4 className="my-4">Order Items:</h4>

                                    <hr />
                                    <div className="cart-item my-1">
                                        {orderItems && orderItems.map(item => (
                                            <div key={item.product} className="row my-5">
                                                <div className="col-4 col-lg-2">
                                                    <img src={item.image} alt={item.name} height="45" width="65" />
                                                </div>

                                                <div className="col-5 col-lg-5">
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </div>


                                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                    <p>${item.price}</p>
                                                </div>

                                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                    <p>{item.quantity} Piece(s)</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-12 col-lg-3 mt-5">
                                    <h4 className="my-4">Status</h4>

                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            name='status'
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>

                                    <button className="btn btn-primary btn-block" onClick={() => updateOrderHandler(order._id)}>
                                        Update Status
                                    </button>
                                </div>

                            </div>
                        )}
                    </Fragment>

            </div>
        </div>

    </Fragment>
    );
}
 
export default ProcessOrder;