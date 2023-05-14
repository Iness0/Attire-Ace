import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Col, ListGroup, Image, Card, Row} from "react-bootstrap";
import {useNavigate, Link } from "react-router-dom";
import CheckoutSteps from '../component/CheckoutComponent'
import Message from "../component/Message";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import {Button} from 'primereact/button'


function PlaceOrderScreen() {

    const orderCreate = useSelector(state => state.orderCreate)
    const {order, error, success} = orderCreate;
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart);
    const navigate = useNavigate();


    const itemsPrice = cart.cartItems
        .reduce((acc, item) => acc + (item.sale_price ? item.sale_price : item.price) * item.qty, 0)
        .toFixed(2);

    const shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2);

    const taxPrice = Number(0.082 * itemsPrice).toFixed(2);

    const totalPrice = (
        Number(itemsPrice) +
        Number(shippingPrice) +
        Number(taxPrice)
    ).toFixed(2);

    if (!cart.paymentMethod) {
        navigate('/payment')
    }

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`);
            dispatch({type: ORDER_CREATE_RESET,});
        }
    }, [success, dispatch, navigate]);

    const placeOrder = () => {
        dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress.address,
        paymentMethod: cart.paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      })
    );
    };

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant={'flush'}>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Shipping: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city},
                                {'  '}
                                {cart.shippingAddress.postalCode},
                                {'  '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment</h2>
                            <p>
                                <strong>Payment method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? (<Message variant={'info'}>
                                Your cart is empty
                            </Message>) : (
                                <ListGroup variant={'flush'}>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col>{item.size}</Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.sale_price ? item.sale_price : item.price} = ${(item.qty * (item.sale_price ? item.sale_price : item.price)).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={4}>
                                        Item:
                                    </Col>
                                    <Col>${itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={4}>
                                        Shipping:
                                    </Col>
                                    <Col>${shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={4}>
                                        Tax:
                                    </Col>
                                    <Col>${taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={4}>
                                        Total:
                                    </Col>
                                    <Col>${totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="w-100"
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrder}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>

                    </Card>
                </Col>
            </Row>
        </div>
    )
}




export default PlaceOrderScreen;