import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from "react-router-dom";
import {Form, Row, Col, Table} from "react-bootstrap";
import Message from "../component/Message";
import Loader from "../component/Loader";
import {getUserDetails, updateUserProfile} from "../actions/userActions";
import {USER_UPDATE_PROFILE_RESET} from '../constants/userConstants'
import {listMyOrders} from "../actions/orderActions";
import {LinkContainer} from 'react-router-bootstrap'
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import AddressManager from "../component/Addresses";
import {Button} from "primereact/button";


function ProfileScreen() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userLogin = useSelector(state => state.userInfo)
    const {loading: loadingUser, user: userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const {loading: loadingOrders, error: errorOrders, orders} = orderListMy;


    useEffect(() => {
        if (!loadingUser && !userInfo) {
            navigate('/login')
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, userInfo, user, success, navigate])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }));
            setMessage("");
        }
    };

    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
                <Col md={3} sm={12}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="first">Personal information</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">Orders</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="third">Address</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={12} md={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <h2>User Profile</h2>
                            {message && <Message variant={'danger'}>{message}</Message>}
                            {error && <Message variant={'danger'}>{error}</Message>}
                            {loading && <Loader/>}
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='name'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        required
                                        type={'name'}
                                        placeholder={'Enter name'}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId='email'>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        required
                                        type={'email'}
                                        placeholder={'Enter email'}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId='password'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type={'password'}
                                        placeholder={'Enter password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId='passwordConfirm'>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type={'password'}
                                        placeholder={'Enter password again'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Button type={'submit'} variant={'primary'} className={'mt-3'}>Update</Button>
                            </Form>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <h2>My Orders</h2>
                            {loadingOrders ? (
                                <Loader/>
                            ) : errorOrders ? (
                                <Message variant={'danger'}>{errorOrders}</Message>
                            ) : (
                                <Table striped responsive className={'table-sm'}>
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Paid</th>
                                        <th>Delivered</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>${order.totalPrice}</td>
                                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                                <i className="fas fa-times" style={{color: 'red'}}></i>
                                            )}</td>
                                            <td>
                                                <LinkContainer to={`/order/${order._id}`}>
                                                    <Button className={'btn-sm'}>Details</Button>
                                                </LinkContainer>
                                            </td>
                                            <td></td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            )}
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                            <h2>Address book</h2>
                            <AddressManager/>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>

    )
}


export default ProfileScreen