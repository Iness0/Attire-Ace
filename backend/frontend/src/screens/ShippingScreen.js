import React from 'react';
import {Container} from "react-bootstrap";
import CheckoutSteps from '../component/CheckoutComponent'
import AddressManager from "../component/Addresses";



function ShippingScreen() {

    return (
        <Container>
            <CheckoutSteps step1 step2/>
            <h3>Choose where to ship</h3>
            <AddressManager check={true}/>
        </Container>
    )
}

export default ShippingScreen;