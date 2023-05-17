import React, {useEffect} from 'react';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Row, Col, ListGroup, Image, Form} from "react-bootstrap";
import Message from "../component/Message"
import {addToCart, removeFromCart, updateCartItem} from "../actions/cartActions";
import {Button} from "primereact/button"
import {addToWishlist, removeFromWishlist} from "../actions/wishlistActions";

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

    const {wishlist} = useSelector((state) => state.wishlist);

    const addToWishlistHandler = (id, size) => {
        dispatch(addToWishlist(id, size));
    }
    const removeFromWishlistHandler = (size_id) => {
        dispatch(removeFromWishlist(size_id))
    };

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

    return (<Row className='mt-2'>
        <Col xs={12} lg={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (<Message variant='info'>
                Your cart is empty. <Link to='#' onClick={() => navigate(-1)}>Go Back</Link>
            </Message>) : (<>
                    {cartItems.map((item) => (<ListGroup.Item key={item.product + item.size}>
                            <Row className='mt-3'>
                                <Col xs={5} sm={4} md={2} lg={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                </Col>
                                <Col md={10} lg={10} sm={6} xs={7}>
                                    <Row>
                                        <Col md={3} lg={3}>
                                            <Link to={`/product/${item.product}`}
                                                  style={{textDecoration: 'none'}}>{item.name}</Link>
                                        </Col>
                                        <Col md={2} lg={2}>
                                            {item.sale_price ? <div className='flex flex-column'>
                                    <span style={{
                                        textDecoration: "line-through",
                                    }}>${item.price}</span>
                                                <span
                                                    style={{fontWeight: "bold", color: "red"}}>
                                            ${item.sale_price}
                                        </span>
                                            </div> : <span style={{fontWeight: "bold"}}>${item.price}</span>}
                                        </Col>
                                        <Col md={3} lg={3}>
                                            <div key={item.size} className='mb-1'>
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
                                        <Col md={3} lg={3}>
                                            <Button
                                                type='button'
                                                variant='dark'
                                                onClick={() => removeFromCartHandler(item.product, item.size)}
                                                icon="pi pi-trash" rounded text/>
                                            {wishlist.some(wishItem => wishItem.size_id === item.size_id) ? (<Button
                                                    onClick={() => removeFromWishlistHandler(item.size_id)}
                                                    icon='pi pi-heart-fill' rounded text style={{color: 'red'}}/>)
                                                : <Button
                                                    onClick={() => addToWishlistHandler(item.product, item.size)}
                                                    icon="pi pi-heart" iconPos="right" rounded text/>
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </>
            )}
            </Col>
            <Col xs={12} lg={4} className={'cart-summery'}>
                <h1>Summary</h1>
                <Row className='mt-3'>
                    <Col xs={6}>
                        Items
                    </Col>
                    <Col xs={6} className={'flex justify-content-end'}>{cartItems.reduce((acc, item) => acc + parseInt(item.qty), 0)}
                    </Col>
                </Row>
                <hr />
                <Row className='mt-3'>
                    <Col xs={6}>
                        <b>Subtotal</b>:
                    </Col>
                    <Col xs={6} className={'flex justify-content-end'}>
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