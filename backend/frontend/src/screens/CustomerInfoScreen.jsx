import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import {Col, Row} from "react-bootstrap";

import {useParams} from "react-router-dom";


function CustomerInfoScreen() {

    const {tab} = useParams();


    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey={tab}>
            <Row>
                <Col md={3} sm={12}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="1">Delivery information</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="2">Payment</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="3">Return Policy</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={12} md={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="1">
                            <h2>Delivery information</h2>
                            <p>
                                At Attire Ace, we are committed to providing fast and reliable delivery services to our
                                valued customers. We understand the importance of timely deliveries, so we have
                                partnered
                                with some of the most trusted courier services in the industry to ensure your orders
                                arrive
                                on time and in excellent condition. Our delivery options are designed to cater to your
                                needs, whether you require standard or express shipping.
                            </p>
                            <p>
                                Our standard delivery service typically takes <b>3-7 business days</b>, depending on
                                your location.
                                For customers who need their orders urgently, we offer an <b>express shipping
                                option </b>, which
                                guarantees delivery within <b>1-3 business days</b>. Please note that delivery times may
                                be
                                affected during peak shopping seasons or in the event of unforeseen circumstances, such
                                as
                                extreme weather conditions or carrier delays. In such cases, we will always strive to
                                keep
                                you informed about the status of your order. To further enhance your shopping
                                experience, we
                                also provide free shipping on orders above a <b>100$</b>.
                            </p>
                            <p>
                                At Attire Ace, we take great care in packing and shipping your orders. However, if you
                                happen to receive a damaged or incorrect item, please contact our customer support team
                                within 7 days of delivery, and we will arrange for a return or exchange, as per our
                                return
                                policy. We are dedicated to ensuring your satisfaction and will work closely with you to
                                resolve any issues that may arise during the delivery process.
                            </p>
                            <p>
                                Thank you for choosing Attire Ace, and we look forward to serving you with the best in
                                fashion and customer service.
                            </p>
                        </Tab.Pane>
                        <Tab.Pane eventKey="2">
                            <h2> Payment and pricing</h2>
                            <p>
                                At Attire Ace, we prioritize the security and convenience of our customers when it comes
                                to
                                payment options. To cater to diverse preferences, we offer a variety of payment methods
                                that
                                are both safe and user-friendly. Our goal is to make your shopping experience as
                                seamless
                                and enjoyable as possible.
                            </p>
                            <p>
                                We accept all major credit and debit cards, including <b>Visa, Mastercard, American
                                Express</b>. Our secure payment gateway ensures that your sensitive information is
                                protected with the highest level of encryption, safeguarding your privacy and financial
                                details. For those who prefer alternative payment methods, we also accept <b>PayPal</b>,
                                a
                                widely
                                recognized and reliable online payment service, which allows you to make purchases
                                without
                                sharing your card information directly with our website.
                            </p> <p>
                            In addition to these popular payment options, Attire Ace offers on delivery payment with
                            cash. This allows you to shop now and pay for your
                            However this option is available only in the regions where delivery provided directly by us.
                        </p><p>
                            We value your trust in Attire Ace and strive to make your shopping experience as smooth and
                            secure as possible. If you encounter any issues or have questions regarding payment options,
                            please don't hesitate to reach out to our customer support team. We are here to assist you
                            and ensure that your transactions are both efficient and worry-free.
                        </p>
                        </Tab.Pane>
                        <Tab.Pane eventKey="3">
                            <h2>Return Policy</h2>
                            <p>
                                At Attire Ace, customer satisfaction is our top priority. We understand that sometimes,
                                items purchased online may not meet your expectations, which is why we have implemented
                                a
                                comprehensive and flexible return policy. Our goal is to provide you with a hassle-free
                                return process and ensure your shopping experience remains positive.
                            </p><p>
                            If you are not completely satisfied with your purchase, you may return eligible items within <b>7 days of receipt</b> for a full refund or exchange. To be eligible for a return, items must be
                            unworn, unwashed, and in their original condition with all tags and packaging intact. Please
                            note that some products, such as undergarments, swimwear, and final sale items, may be
                            excluded from our return policy due to hygiene and clearance reasons.
                        </p><p>
                            To initiate a return, simply contact our customer support team, who will provide you with
                            detailed instructions on how to proceed. Once we receive your returned item(s) and confirm
                            that they meet our return criteria, we will process your refund or exchange promptly.
                            Refunds will be issued to your <strong>original payment method</strong>, and you will be notified via email
                            once the process is complete.
                        </p><p>
                            Please note that customers are responsible for return shipping costs, unless the reason for
                            the return is due to a defective or incorrect item received. In such cases, Attire Ace will
                            cover the return shipping expenses and ensure that you receive a replacement or a full
                            refund as quickly as possible.
                        </p><p>
                            We are committed to making your shopping experience at Attire Ace enjoyable and worry-free.
                            If you have any questions or concerns regarding our return policy or require assistance with
                            a return, please don't hesitate to reach out to our customer support team. We are here to
                            help and ensure your satisfaction with every purchase.
                        </p>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>

    )
}

export default CustomerInfoScreen;