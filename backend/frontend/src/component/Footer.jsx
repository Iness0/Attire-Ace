import React, {useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import {InputText} from 'primereact/inputtext';
import {Link} from "react-router-dom";
import {Accordion, AccordionTab} from 'primereact/accordion';

const Footer = () => {
    const [value, setValue] = useState("")
    const [showMessage, setShowMessage] = useState(false);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setShowMessage(true);
        }
    };

    return (<footer>
        <Container>
            <div className="card d-md-none" style={{border: 'none'}}>
                <Accordion className={'footer-accordion'}>
                    <AccordionTab header="Customer info">
                        <ul style={{listStyleType: 'none', paddingLeft: 0}}>
                            <Link to={'/info/1'} style={{textDecoration: 'none', color: 'inherit'}}>
                                <li>Delivery Information</li>
                            </Link>
                            <Link to={'/info/2'} style={{textDecoration: 'none', color: 'inherit'}}>
                                <li>Payment</li>
                            </Link>
                            <Link to={'/info/3'} style={{textDecoration: 'none', color: 'inherit'}}>
                                <li>Return Policy</li>
                            </Link>
                        </ul>
                    </AccordionTab>
                    <AccordionTab header="Follow us">
                                                   <span className="flex justify-content-start gap-3 mt-3">
                        <a href={"https://www.linkedin.com/in/yury-ash-a74058253/"}
                           style={{textDecoration: 'none', color: 'inherit'}}>
                        <i className="pi pi-linkedin"></i></a>

                        <a href={"https://www.linkedin.com/in/yury-ash-a74058253/"}
                           style={{textDecoration: 'none', color: 'inherit'}}>
                        <i className="pi pi-twitter"></i></a>
                        <a href={"https://www.linkedin.com/in/yury-ash-a74058253/"}
                           style={{textDecoration: 'none', color: 'inherit'}}>
                        <i className="pi pi-facebook"></i></a>
                            </span>
                    </AccordionTab>
                    <AccordionTab header="Subscribe">
                        <p style={{marginBottom: '1.5rem'}}>Receive news and updated about our product</p>
                        <span className="p-float-label">
                <InputText id="username" value={value} onKeyDown={handleKeyPress} className="footer-input"
                           onChange={(e) => setValue(e.target.value)}/>
                <label htmlFor="username" style={{backgroundColor: "white"}}>email</label>
                            {showMessage && (<div style={{color: 'green', marginTop: '5px'}}>
                                Thank you for subscribing!
                            </div>)}
                    </span>
                    </AccordionTab>
                </Accordion>
            </div>
            <Row className="d-none d-md-flex">
                <Col md={4}><h5 style={{color: 'white'}}>Customer Information</h5>
                    <ul style={{listStyleType: 'none'}}>
                        <Link to={'/info/1'} style={{textDecoration: 'none', color: 'inherit'}}>
                            <li>Delivery Information</li>
                        </Link>
                        <Link to={'/info/2'} style={{textDecoration: 'none', color: 'inherit'}}>
                            <li>Payment</li>
                        </Link>
                        <Link to={'/info/3'} style={{textDecoration: 'none', color: 'inherit'}}>
                            <li>Return Policy</li>
                        </Link>
                    </ul>
                </Col>
                <Col md={4} style={{textAlign: "center"}}><h5 style={{color: 'white'}}>Follow us</h5>
                    <span className="flex justify-content-center gap-3 mt-3">
                        <a href={"https://www.linkedin.com/in/yury-ash-a74058253/"}
                           style={{textDecoration: 'none', color: 'inherit'}}>
                        <i className="pi pi-linkedin"></i></a>

                        <a href={"https://www.linkedin.com/in/yury-ash-a74058253/"}
                           style={{textDecoration: 'none', color: 'inherit'}}>
                        <i className="pi pi-twitter"></i></a>
                        <a href={"https://www.linkedin.com/in/yury-ash-a74058253/"}
                           style={{textDecoration: 'none', color: 'inherit'}}>
                        <i className="pi pi-facebook"></i></a>
                            </span>
                </Col>
                <Col md={4}><h5 style={{color: 'white'}}>Subscribe </h5>
                    <p style={{marginBottom: '1.5rem'}}>Receive news and updated about our product</p>
                    <span className="p-float-label">
                <InputText id="username" value={value} onKeyDown={handleKeyPress} className="footer-input"
                           onChange={(e) => setValue(e.target.value)}/>
                <label htmlFor="username">email</label>
                        {showMessage && (<div style={{color: 'green', marginTop: '5px'}}>
                            Thank you for subscribing!
                        </div>)}
            </span>
                </Col>
            </Row>
            <Row>
                <Col className="text-center py-3">
                    Copyright &copy; 2023 Attire Ace
                </Col>
            </Row>
        </Container>
    </footer>)
}

export default Footer