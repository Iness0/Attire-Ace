import React, {useState, useEffect} from 'react';
import {Link, useParams, useNavigate} from "react-router-dom";
import {Row, Col, ListGroup, Form} from "react-bootstrap";
import Rating from '../component/Rating'
import Loader from '../component/Loader'
import Message from "../component/Message";
import {listProductdetails, createProductReview} from "../actions/productActions"
import {useDispatch, useSelector} from "react-redux";
import {PRODUCT_CREATE_REVIEW_RESET} from "../constants/productConstants";
import {Dropdown} from 'primereact/dropdown';
import {Button} from 'primereact/button';
import {TabView, TabPanel} from 'primereact/tabview';
import Product from "../component/Product";
import {Image} from 'primereact/image';
import {addToWishlist, removeFromWishlist} from "../actions/wishlistActions";


function ProductScreen() {
    const [size, setSize] = useState('')
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {id} = useParams();

    const productDetails = useSelector((state) => state.productDetails)
    const {loading, error, product, additional_products} = productDetails
    const sizeAvaliable = product.sizes.filter((size) => size.countInStock > 0)

    const {wishlist} = useSelector((state) => state.wishlist);
    const isProductInWishlist = wishlist.some(item => item.product === id);


    const userLogin = useSelector((state) => state.userInfo)
    const {user: userInfo} = userLogin

    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const {
        loading: loadingProductReview, error: errorProductReview, success: successProductReview
    } = productReviewCreate

    const today = new Date();
    const deliveryStartDate = new Date(today.setDate(today.getDate() + 7)).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short'
    });
    const deliveryEndDate = new Date(today.setDate(today.getDate() + 14)).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short'
    });
    useEffect(() => {
        if (successProductReview) {
            setRating(0)
            setComment('')
            dispatch(({type: PRODUCT_CREATE_REVIEW_RESET}))
        }
        dispatch(listProductdetails(id))
    }, [dispatch, id, successProductReview])

    const addToCartHandler = () => {
        navigate(`/cart/${id}?size=${size}`)
    }

    const addToWishlistHandler = (id) => {
        dispatch(addToWishlist(id));
    }
    const removeFromWishlistHandler = (id) => {
        dispatch(removeFromWishlist(id))
    };
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(id, {rating, comment}))
    }

    return (<div>
        <Link to='#' className='btn btn-light my-3' onClick={() => navigate(-1)}>Go Back</Link>
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (<div>
            <Row>
                <Col md={8}>
                    <Image src={product.image} alt={product.name} height={'100%'} preview width={'600px'}
                    />
                </Col>
                <Col md={4}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3 style={{paddingBottom: '0'}}>{product.name}</h3>
                            <span className='small'>{product.description_short}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {product.sale_price ? <>
                                    <span style={{
                                        textDecoration: "line-through", transform: 'rotate(-30deg)'
                                    }}>${product.price}</span>
                                <span
                                    style={{fontWeight: "bold", color: "red", marginLeft: '2rem'}}>
                                            ${product.sale_price}
                                        </span>
                            </> : <span style={{fontWeight: "bold"}}>${product.price}</span>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`}
                                    color={'#f8e825'}></Rating>
                        </ListGroup.Item>
                    </ListGroup>

                    {sizeAvaliable && (
                        <div className="ms-3 my-3">
                            <Dropdown
                                value={size}
                                options={product.sizes.map((size, index) => ({
                                    label: size.size, value: size.size, disabled: size.countInStock === 0
                                }))}
                                onChange={(e) => setSize(e.value)}
                                placeholder="Choose your size..."
                                optionLabel="label"
                                optionDisabled="disabled"
                                style={{width: '74%'}}
                            />
                        </div>)}
                    <div className=' product-page-buttons'>
                        <Button
                            onClick={addToCartHandler}
                            disabled={size === ""}
                            label="Add to cart"/>
                        {isProductInWishlist ? (<Button
                            onClick={() => removeFromWishlistHandler(id)}
                            label="Already in wishlist"  outlined><i className='pi pi-heart-fill'
                                     style={{ color: 'red', paddingLeft: '0.5rem' }}></i></Button>)
                        :
                        <Button
                            onClick={() => addToWishlistHandler(id)}
                            label="Add to wishlist" icon="pi pi-heart" iconPos="right" outlined/>
                        }
                    </div>
                </Col>
            </Row>

            <Row className={'mt-5'}>
                <div>
                    <TabView>
                        <TabPanel header="Description">
                            <p className="m-0">
                                {product.description_long}
                            </p>
                        </TabPanel>
                        <TabPanel header="Delivery">
                            <h5>We are committed to your satisfaction.</h5>
                            <ul>
                                <li>With one delivery fee, we cover most locations.</li>
                                <li>Returns are free within 14 days, except for final sale</li>
                            </ul>
                            <h5>Estimated delivery time</h5>
                            <p className="m-0">
                                {`${deliveryStartDate} - ${deliveryEndDate}`}
                            </p>
                            <h5>Import duties information</h5>
                            <p>
                                Let us handle the legwork.

                                Delivery duties are included in the item price when shipping to all EU countries
                                (excluding the Canary Islands), plus The United Kingdom, USA, Canada, China Mainland,
                                Australia, New Zealand, Puerto Rico, Switzerland, Singapore, Republic Of Korea, India,
                                Norway, Thailand, Japan, Brazil, Isle of Man, San Marino, Colombia, Chile, Argentina and
                                Turkey. All import duties are included in your order – the price you see is the price
                                you pay.</p>
                        </TabPanel>
                    </TabView>
                </div>
            </Row>
            <Row>
                <Col md={6}>
                    <h4 className='ms-3'>Reviews</h4>
                    {product.reviews.length === 0 && <Message variant='info'>No reviews</Message>}
                    <ListGroup variant='flush'>{product.reviews.map((review) => (
                        <ListGroup.Item key={review._id}><strong>{review.name}</strong>
                            <Rating value={review.rating} color='#f8e825'/>
                            <p>{review.createdAt.substring(0, 10)}</p>
                            <p>{review.comment}</p>
                        </ListGroup.Item>))}
                        <ListGroup.Item>
                            <h4>Write a review</h4>

                            {loadingProductReview && <Loader/>}
                            {successProductReview && <Message variant='success'>Review Submitted</Message>}
                            {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                            {userInfo ? (<Form onSubmit={submitHandler}>
                                <Form.Group controlId='rating'>
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control as='select' value={rating}
                                                  onChange={(e) => setRating(e.target.value)}>
                                        <option value=''>Select...</option>
                                        <option value='1'>1 - Poor</option>
                                        <option value='2'>2 - Fair</option>
                                        <option value='3'>3 - Good</option>
                                        <option value='4'>4 - Very Good</option>
                                        <option value='5'>5 - Excellent</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='comment' className='mt-1'>
                                    <Form.Label>Review</Form.Label>
                                    <Form.Control as='textarea' row='6' value={comment}
                                                  onChange={(e) => setComment(e.target.value)}/>
                                </Form.Group>
                                <Button disabled={loadingProductReview} type='submit'
                                        variant='primary' className={'my-3'}>
                                    Submit
                                </Button>
                            </Form>) : (<Message variant='info'>Please, <Link to={'/login'}>Login</Link> to
                                write a review</Message>)}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
                <h4>You also may be interested</h4>
            <div className='scrollable-products'>
                {additional_products.length > 0 && (additional_products.map(product => (
                    <div key={product._id} className='scrollable-products-items'>
                        <Product product={product} height={'16rem'}/>
                    </div>
                )))}
            </div>
        </div>)}
    </div>)
}

export default ProductScreen;