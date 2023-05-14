import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Link, useLocation, useNavigate} from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Message from "../component/Message";
import Loader from "../component/Loader";
import { register } from "../actions/userActions";
import FormContainer from "../component/FormContainer";



function RegisterScreen() {

    const [name, setname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')


    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();
    const redirect = location.search ? location.search.split('=')[1]
        : '/';

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        } else {

        dispatch(register(name, email, password))
    }}

    return (
        <FormContainer>
            <h1>Sign in</h1>
            {message && <Message variant={'danger'}>{error}</Message> }
            { error && <Message variant={'danger'}>{error}</Message> }
            {loading && <Loader />}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type={'name'}
                        placeholder={'Enter name'}
                        value={name}
                        onChange={(e) => setname(e.target.value)}
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
                        required
                        type={'password'}
                        placeholder={'Enter password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type={'password'}
                        placeholder={'Enter password again'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
                <Button type={'submit'} variant={'primary'} className={'mt-3'}>Register</Button>
            </Form>
            <Row className={'py-3'}>
                <Col>
                    Have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                    Sign In</Link>
                </Col>
            </Row>
        </FormContainer>
    );
}

export default RegisterScreen