import React, {useEffect} from 'react';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Row, Col, ListGroup, Image, Form, Button} from "react-bootstrap";
import Message from "../component/Message"
import {addToWishlist, removeFromWishlist, updateWishlist} from "../actions/wishlistActions";


function WishlistScreen() {
    const {id} = useParams();
    const location = useLocation();
    const ProductID = id;
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const initialSize = searchParams.get('size')
    const {cartItems} = useSelector((state) => state.cart);

    const dispatch = useDispatch();

    useEffect(() => {
        if (ProductID) {
            dispatch(addToWishlist(ProductID, initialSize));
            const newURL = `/wishlist`;
            navigate(newURL, {replace: true});
        }
    }, [dispatch, ProductID, initialSize]);

    const {wishlist} = useSelector((state) => state.wishlist);


    const removeFromWishlistHandler = (size_id) => {
        dispatch(removeFromWishlist(size_id))
    };

    const updateWishlistHandler = (id, size_id, size) => {
        dispatch(updateWishlist(id, size_id, size))
    };

    const addToCartHandler = (id, size) => {
        navigate(`/cart/${id}?size=${size}`)
    }

    return (
        <Row>
            <Col xs={12}>
                <h1>Your wishlist</h1>
                {(!wishlist || wishlist.length === 0) ? (
                    <Message variant='info'>
                        Your wishlist is empty. <Button variant="link" onClick={() => navigate(-1)}>
                        Go Back
                    </Button>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {wishlist.map((item) => (
                            <ListGroup.Item key={item.product + item.size}>
                                <Row>
                                    <Col xs={5} md={2} className={'flex align-items-center'}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col xs={7} md={10}>
                                <Row>
                                    <Col md={2} className={'flex align-items-center mt-3'}>
                                        <Link to={`/product/${item.product}`}
                                              style={{textDecoration: 'none', fontWeight: 'bold'}}>{item.name}</Link>
                                    </Col>
                                    <Col md={2} className={'flex align-items-center mt-3'}>
                                        ${item.price}
                                    </Col>
                                    <Col md={3} lg={3} className={'flex align-items-center mt-3'}>
                                        <div key={item.size} style={{width: '100%'}}
                                        >
                                            <Form.Control
                                                as="select"
                                                value={item.size}
                                                onChange={(e) => (updateWishlistHandler(item.product, item.size_id, e.target.value))
                                                }>
                                                <option key={item.size} value=''>
                                                    Choose size...
                                                </option>
                                                {item.sizes.map((x) => (
                                                    <option key={x.size} value={x.size}>
                                                        {x.size}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </div>

                                    </Col>
                                    <Col md={5} className={'flex align-items-center mt-3'}>
                                        <Button
                                            type='button'
                                            variant='light'
                                            onClick={() => removeFromWishlistHandler(item.size_id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                        {
                                            cartItems.some(cartItem => cartItem.size_id === item.size_id)
                                                ? <Button type='button' variant='dark'
                                                          onClick={() => navigate('/cart')}>
                                                    In cart
                                                </Button>
                                                : item.size ? <Button type='button' variant='dark'
                                                                         onClick={() => addToCartHandler(item.product, item.size)}>
                                                        Add to cart
                                                    </Button>
                                                    : <Button type='button' disabled variant='dark'>
                                                        Choose size
                                                    </Button>
                                        }
                                    </Col>
                                </Row>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
        </Row>
    )
}

export default WishlistScreen;