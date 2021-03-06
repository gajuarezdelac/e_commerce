import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, clearError,newReviewProduct } from '../../actions/ProductAction';
import { addItemToCart } from '../../actions/CartAction';
import {ACTION_TYPES } from '../../constants/ProductConst';

// Components
import { useAlert } from 'react-alert';
import MetaData from '../Layout/MetaData';
import Loader from '../Layout/Loader';
import { Carousel } from 'react-bootstrap';
import ListReviews from '../review/ListReviews';


const ProductDetails = ({ match }) => {

    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');


    const alert = useAlert();
    const dispatch = useDispatch();

    const {
        loading,
        product,
        error
    } = useSelector(state => state.ProductDetailReducer);
    const { user } = useSelector(state => state.AuthReducer);
    const {error: reviewError, success} = useSelector(state => state.NewReviewReducer);

    useEffect(() => {

        dispatch(getProductDetails(match.params.id));

        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearError());
        }

        if(success) {
            alert.success('Review posted successfully');
            dispatch({type:ACTION_TYPES.NEW_REVIEW_PRODUCT_RESET });
        }

    }, [dispatch, alert, error, match.params.id,reviewError, success]);

    const addToCart = () => {
        dispatch(addItemToCart(match.params.id, quantity));
        alert.success('Item Add to Cart')
    }

    const decreaseQty = () => {

        const count = document.querySelector('.count');

        if (count.valueAsNumber <= 1) return;

        const qty = count.valueAsNumber - 1;
        setQuantity(qty);

    }

    const increaseQty = () => {
        const count = document.querySelector('.count');

        if (count.valueAsNumber >= product.product?.stock) return;

        const qty = count.valueAsNumber + 1;
        setQuantity(qty);

    }

    const setUserRatings = () => {
        const starts = document.querySelectorAll('.star');
        starts.forEach((star, index) => {
            star.startValue = index + 1;
            ['click', 'mouseover', 'mouseout'].forEach(function (item) {
                star.addEventListener(item, showRatings);
            })
        })

        function showRatings(e) {
            starts.forEach((star, index) => {
                if (e.type === 'click') {
                    if (index < this.startValue) {
                        star.classList.add('orange');
                        setRating(this.startValue);
                    } else {
                        star.classList.remove('orange')
                    }
                }
                if (e.type === 'mouseover') {
                    if (index < this.startValue) {
                        star.classList.add('yellow');
                    } else {
                        star.classList.remove('yellow')
                    }
                }
                if (e.type === 'mouseout') {
                    star.classList.remove('yellow');
                }
            })
        }
    }

    const reviewHandler = () => {
         const formData = new FormData();
         formData.set('rating',rating);
         formData.set('comment',comment);
         formData.set('productId',match.params.id);

         dispatch(newReviewProduct(formData));
    
    }

    return (

        <Fragment>
            { loading ? <Loader /> : (
                <Fragment>

                    <MetaData title={product.product?.name} />

                    <div className="row f-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                            <Carousel pause="hover">
                                {product.product?.images && product.product?.images.map(image => (
                                    <Carousel.Item key={image.public_id}>
                                        <img className="d-block w-100" src={image.url} alt={product.product.name} height="500" width="500" />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>

                        <div className="col-12 col-lg-5 mt-5">
                            <h3>{product.product?.name}</h3>
                            <p id="product_id">Product # {product.product?._id}</p>
                            <hr />
                            <div className="rating-outer" >
                                <div className="rating-inner" style={{ width: `${(product.product?.ratings / 5) * 100}%` }} ></div>
                            </div>
                            <span id="no_of_reviews">({product.product?.numOfReviews} Reviews)</span>

                            <hr />

                            <p id="product_price">${product.product?.price}</p>
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={decreaseQty} >-</span>

                                <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                                <span className="btn btn-primary plus" onClick={increaseQty} >+</span>
                            </div>
                            <button type="button" disabled={product.product?.stock === 0} onClick={addToCart} id="cart_btn" className="btn btn-primary d-inline ml-4">Add to Cart</button>

                            <hr />

                            <p>Status: <span id="stock_status" className={product.product?.stock > 0 ? 'greenColor' : 'redColor'}>{product.product?.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

                            <hr />

                            <h4 className="mt-2">Description:</h4>
                            <p>
                                {product.product?.description}
                            </p>
                            <hr />
                            <p id="product_seller mb-3">Sold by: <strong>{product?.seller}</strong></p>

                            {user ? <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal" onClick={setUserRatings}>
                                Submit Your Review
               </button> : <div className="alert alert-danger mt-5" type="alert" > Login to post your review  </div>}

                            <div className="row mt-2 mb-5">
                                <div className="rating w-50">

                                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">

                                                    <ul className="stars" >
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                    </ul>

                                                    <textarea name="review"
                                                    id="review" 
                                                    value={comment}
                                                    className="form-control mt-3"
                                                    onChange={(e) => setComment(e.target.value)}
                                                    >

                                                    </textarea>

                                                    <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close" onClick={reviewHandler}   >Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                     
                    {product.product?.reviews && product.product?.reviews.length > 0 && (
                         <ListReviews reviews={product.product?.reviews} />
                     )}


                </Fragment>
            )}
        </Fragment>
    );

}


export default ProductDetails;