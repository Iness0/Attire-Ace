import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Form, Col} from "react-bootstrap";
import FormContainer from "../component/FormContainer";
import {useNavigate} from "react-router-dom";
import CheckoutSteps from '../component/CheckoutComponent'
import { savePaymentMethod} from '../actions/cartActions'
import {Button} from 'primereact/button'
function PaymentScreen() {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    if (!shippingAddress.address) {
        navigate('/shipping')
    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as={'legend'}>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type={'radio'}
                            label={'Paypal or Credit Card'}
                            id={'paypal'}
                            name={'paymentMethod'}
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                        <Form.Check
                            type={'radio'}
                            label={'Cash'}
                            id={'Cash'}
                            name={'paymentMethod'}
                            disabled
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                    </Col>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen