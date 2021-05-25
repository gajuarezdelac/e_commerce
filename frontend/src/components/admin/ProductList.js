import React, { Fragment,useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import  { deleteProduct,getProductsAdmin,clearError } from '../../actions/ProductAction';
import {useAlert} from 'react-alert';
import {ACTION_TYPES} from '../../constants/ProductConst';

// Componentss
import MetaData from '../Layout/MetaData';
import { MDBDataTable } from 'mdbreact'
import Loader from '../Layout/Loader';
import Sidebar from './SideBar';

const ProductList = () => {
  

    const history = useHistory();
    const dispatch = useDispatch();
    const alert = useAlert();


    const { loading, error, products = [] } = useSelector(state => state.ProductReducer);
    const { error:  deleteError, isDeleted} = useSelector(state => state.DeleteProductReducer);

    useEffect(() => {
        dispatch(getProductsAdmin());

        if (error) {
            alert.error(error);
            dispatch(clearError())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearError())
        }

        if(isDeleted) {
            alert.success('Delete successfully');
            history.push('/admin/products')
            dispatch({type: ACTION_TYPES.DELETE_PRODUCT_RESET});
         }

    }, [dispatch, alert, error,deleteError,isDeleted,history])

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `$${product.price}`,
                stock: product.stock,
                actions: <Fragment>
                    <Link to={`/admin/product/${product._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProductHandler(product._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteProductHandler = (id) => {
         dispatch(deleteProduct(id));
    }


return ( 
    <Fragment>
            <MetaData title={'All Products'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Products</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setProducts()}
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
 
export default ProductList;