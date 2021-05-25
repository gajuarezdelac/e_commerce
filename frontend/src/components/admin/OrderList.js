import React, { Fragment,useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import  { deleteOrder,getOAllrders,clearError } from '../../actions/OrderAction';
import {useAlert} from 'react-alert';

// Componentss
import MetaData from '../Layout/MetaData';
import { MDBDataTable } from 'mdbreact'
import Loader from '../Layout/Loader';
import Sidebar from './SideBar';
import { ACTION_TYPES } from '../../constants/OrderConst';

const OrderList = () => {

   const history = useHistory();
   const dispatch = useDispatch();
   const alert = useAlert();

   const { loading, error, orders } = useSelector(state => state.AllOrdersReducer);
   const { isDeleted } = useSelector(state => state.DelUpdOrderReducer);

   useEffect(() => {
    dispatch(getOAllrders());

    if (error) {
        alert.error(error);
        dispatch(clearError())
    }

    if (isDeleted) {
        alert.success('Order deleted successfully');
        history.push('/admin/orders');
        dispatch({ type: ACTION_TYPES.DELETE_ORDER_RESET })
    }

}, [dispatch, alert, error,isDeleted, history])

const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id))
}

const setOrders = () => {
    const data = {
        columns: [
            {
                label: 'Order ID',
                field: 'id',
                sort: 'asc'
            },
            {
                label: 'No of Items',
                field: 'numofItems',
                sort: 'asc'
            },
            {
                label: 'Amount',
                field: 'amount',
                sort: 'asc'
            },
            {
                label: 'Status',
                field: 'status',
                sort: 'asc'
            },
            {
                label: 'Actions',
                field: 'actions',
            },
        ],
        rows: []
    }

    orders.forEach(order => {
        data.rows.push({
            id: order._id,
            numofItems: order.orderItems.length,
            amount: `$${order.totalPrice}`,
            status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
            actions: <Fragment>
                <Link to={`/admin/order/${order._id}`} className="btn btn-primary py-1 px-2">
                    <i className="fa fa-eye"></i>
                </Link>
                <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteOrderHandler(order._id)}>
                    <i className="fa fa-trash"></i>
                </button>
            </Fragment>
        })
    })

    return data;
}





    return ( 
        <Fragment>
        <MetaData title={'All Orders'} />
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>

            <div className="col-12 col-md-10">
                <Fragment>
                    <h1 className="my-5">All Orders</h1>

                    {loading ? <Loader /> : (
                        <MDBDataTable
                            data={setOrders()}
                            className="px-3"
                            bordered
                            striped
                            hover
                        />
                    )}

                </Fragment>
            </div>
        </div>

    </Fragment>
     );
}
 
export default OrderList;