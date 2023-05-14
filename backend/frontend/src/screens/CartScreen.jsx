import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Row, Col, ListGroup, Image, Form} from "react-bootstrap";
import Message from "../component/Message"
import {addToCart, removeFromCart, updateCartItem} from "../actions/cartActions";
import {Button} from "primereact/button"

function CartScreen() {
    const {id} = useParams();
    const ProductID = id;
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const searchParams = new URLSearchParams(location.search);

    const initialSize = searchParams.get("size")
    const initialQty = 1;


    useEffect(() => {
        if (ProductID) {
            dispatch(addToCart(ProductID, initialSize, initialQty));
            const newURL = `/cart`;
            navigate(newURL, {replace: true});
        }
    }, [dispatch, ProductID, initialSize, initialQty]);


    const cart = useSelector((state) => state.cart);
    const {cartItems} = cart;

    const removeFromCartHandler = (id, size) => {
        dispatch(removeFromCart(id, size))
    };
    const checkOutHandler = () => {
        navigate('/login?redirect=shipping')
    }
    const updateCartHandler = (id, size_id, size, qty) => {
        dispatch(updateCartItem(id, size_id, size, qty))
    };

    const cantProceed = cartItems.some((item) => item.availableQty <= 0)

    return (<Row>
            <Col md={12} lg={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (<Message variant='info'>
                    Your cart is empty. <Link to='/'>Go Back</Link>
                </Message>) : (<ListGroup variant='flush'>
                        {cartItems.map((item) => (<ListGroup.Item key={item.product + item.size}>
                                <Row>
                                    <Col md={2} lg={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col md={2} lg={2}>
                                        <Link to={`/product/${item.product}`}
                                              style={{textDecoration: 'none'}}>{item.name}</Link>
                                    </Col>
                                    <Col md={3} lg={3}>
                                        {item.sale_price ? <>
                                    <span style={{
                                        textDecoration: "line-through", transform: 'rotate(-30deg)'
                                    }}>${item.price}</span>
                                            <span
                                                style={{fontWeight: "bold", color: "red", marginLeft: '2rem'}}>
                                            ${item.sale_price}
                                        </span>
                                        </> : <span style={{fontWeight: "bold"}}>${item.price}</span>}
                                    </Col>
                                    <Col md={3} lg={3}>
                                        <div key={item.size}>
                                            Size:
                                            <Form.Control
                                                as="select"
                                                size="sm"
                                                value={item.size}
                                                onChange={(e) => updateCartHandler(item.product, item.size_id, e.target.value, item.qty)}>
                                                {item.sizes.map((x) => (<option key={x.size} value={x.size}>
                                                    {x.size}
                                                </option>))}
                                            </Form.Control>
                                        </div>
                                        Amount:
                                        {item.sizes
                                            .filter((sizeItem) => sizeItem.size === item.size)
                                            .map((sizeItem) => sizeItem.countInStock === 0 ? (<div>
                                                <Message variant="danger"
                                                         style={{
                                                             height: '2.4rem',
                                                             fontSize: '0.9rem',
                                                             display: 'flex',
                                                             alignItems: 'center'
                                                         }}>
                                                    Out of stock
                                                </Message></div>) : (<div key={item.size}>
                                                <Form.Control
                                                    as="select"
                                                    size="sm"
                                                    value={item.qty}
                                                    onChange={(e) => {
                                                        dispatch(addToCart(item.product, item.size, e.target.value))
                                                    }}>
                                                    {[...Array(sizeItem.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>))}
                                                </Form.Control>
                                            </div>))}
                                    </Col>
                                    <Col md={1} lg={1}>
                                        <Button
                                            type='button'
                                            variant='dark'
                                            onClick={() => removeFromCartHandler(item.product, item.size)}
                                            icon="pi pi-trash" rounded text/>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4} lg={4} className={'cart-summery'}>
                <h2>Summary</h2>
                <Row className='mt-3'>
                    <Col sm={6}>
                        items
                    </Col>
                    <Col sm={6}>{cartItems.reduce((acc, item) => acc + parseInt(item.qty), 0)}
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col sm={6}>
                        price:
                    </Col>
                    <Col sm={6}>
                        ${cartItems.reduce((acc, item) => acc + parseInt(item.qty) * (item.sale_price ? item.sale_price : item.price), 0).toFixed(2)}
                    </Col>
                </Row>
                <Button
                    type='button'
                    disabled={cartItems.length === 0 || cantProceed}
                    className='mt-3'
                    onClick={() => checkOutHandler()}
                    style={{fontSize: '0.9rem'}}
                >
                    Proceed to Checkout
                </Button>
            </Col>
        </Row>
    )
}

export default CartScreen;