import React, {useEffect, useState} from 'react';
import {Card, Form, Row, Col} from 'react-bootstrap';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useDispatch, useSelector} from "react-redux";
import {createAddress, deleteAddress, getAddress, updateAddress} from "../actions/userActions";
import {useNavigate} from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
import {Checkbox} from "primereact/checkbox";
import {saveShippingAddress} from "../actions/cartActions";


const AddressManager = ({check = false}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [editAddressId, setEditAddressId] = useState(null);
    const [defaultAddress, setDefaultAddress] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState(null)

    const [showForm, setShowForm] = useState(false);

    const userAddresses = useSelector(state => state.addresses)
    const {error, loading, addresses} = userAddresses

    const userCreateAddress = useSelector(state => state.addressesCreate)
    const {success: isCreated} = userCreateAddress

    const userDeleteAddress = useSelector(state => state.addressesDelete)
    const {success: isDeleted} = userDeleteAddress

    const userUpdateAddress = useSelector(state => state.addressesUpdate)
    const {success: isUpdated} = userUpdateAddress


    useEffect(() => {
        dispatch(getAddress())
    }, [dispatch, isCreated, isUpdated, navigate, isDeleted])

    const createAddressHandler = (e) => {
        e.preventDefault()
        dispatch(createAddress({
            'addressName': name,
            'country': country,
            'city': city,
            'postalCode': postalCode,
            'address': address,
            'current_address': defaultAddress
        }))
        setShowForm(false)
    };
    const deleteAddressHandler = (pk) => {
        dispatch(deleteAddress(pk))
    }
    const nullStates = () => {
        setEditAddressId('')
        setName('')
        setAddress('')
        setCountry('')
        setPostalCode('')
        setCity('')
        setShowForm(false)
        setDefaultAddress(false)
    }
    const updateAddressHandler = () => {
        dispatch(updateAddress({
            '_id': editAddressId,
            'addressName': name,
            'country': country,
            'city': city,
            'postalCode': postalCode,
            'address': address,
            'current_address': defaultAddress
        }))
        nullStates()
    }
    const radioHandler = (address) => {
        setSelectedCardId(address._id)
        dispatch(saveShippingAddress({
            'address': address.address,
            'city': address.city,
            'postalCode': address.postalCode,
            'country': address.country
        }))
    }

    const editAddressHandler = (address) => {
        setEditAddressId(address._id)
        setName(address.addressName)
        setAddress(address.address)
        setCountry(address.country)
        setPostalCode(address.postalCode)
        setCity(address.city)
        setDefaultAddress(address.current_address)
        setShowForm(true)
    }

    return (<div>
        {loading ? <Loader/> : error ? <Message
            variant='danger'>{error}</Message> : addresses && addresses.map((address) => (editAddressId !== address._id && (
            <Card key={address._id} className='address-card'
                  style={{marginBottom: '1rem', border: selectedCardId === address._id && check && '2px solid black'}}>
                <label htmlFor={`address-radio-${address._id}`}>
                    <Card.Title className={'ms-3 mt-3'}>{address.addressName}</Card.Title>
                    <Card.Body>
                        <Row className='ms-5'>
                            {check && <Col sm={1} md={1} className={'flex'} style={{marginLeft: '-2rem'}}>
                                <input
                                    type="radio"
                                    id={`address-radio-${address._id}`}
                                    name="address"
                                    checked={selectedCardId === address._id}
                                    onChange={() => radioHandler(address)}
                                />
                            </Col>}
                            <Col sm={6} md={2} className={'flex align-items-center'}>
                                {address.country}
                            </Col>
                            <Col sm={10} md={2} className={'flex align-items-center'}>
                                {address.city}
                            </Col>
                            <Col sm={10} md={3} className={'flex align-items-center'}>
                                {address.address}
                            </Col>
                            <Col sm={10} md={1} className={'flex align-items-center'}>
                                {address.postalCode}
                            </Col>
                            <Col sm={12} md={2} className={'gap-2 ms-auto buttons-column'}>
                                <Button icon="pi pi-pencil" rounded text severity="success" aria-label="edit"
                                        onClick={() => editAddressHandler(address)}/>
                                <Button icon="pi pi-trash" rounded text severity="danger" aria-label="delete"
                                        onClick={() => deleteAddressHandler(address._id)}/>
                            </Col>
                        </Row>
                    </Card.Body>
                </label>
            </Card>)))}
        {showForm ? (<Card style={{marginBottom: '1rem'}}>
                <Card.Title className={'ms-3 mt-3'}>New Address</Card.Title>
                <Card.Body>
                    <Form onSubmit={editAddressId ? updateAddressHandler : createAddressHandler}>
                        <Row>
                            <Col sm={12} md={8}>
                                <div className="mt-3">
                <span className="p-float-label">
                    <InputText required style={{width: '100%'}} id="username" value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    <label htmlFor="username">Name</label>
                </span>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mt-5 gap-1">
                            <Col sm="8">
            <span className="p-float-label">
                <InputText required style={{width: '100%'}} id="username" value={country}
                           onChange={(e) => setCountry(e.target.value)}/>
                <label htmlFor="username">Country</label>
            </span>
                            </Col>
                        </Row>
                        <Row className="mt-5 gap-1">
                            <Col sm="8">
            <span className="p-float-label">
                <InputText required style={{width: '100%'}} id="username" value={address}
                           onChange={(e) => setAddress(e.target.value)}/>
                <label htmlFor="username">Address</label>
            </span>
                            </Col>
                        </Row>
                        <Row className="mt-5 gap-1">
                            <Col sm="4">
            <span className="p-float-label">
                <InputText required style={{width: '100%'}} id="username" value={city}
                           onChange={(e) => setCity(e.target.value)}/>
                <label htmlFor="username">City</label>
            </span>
                            </Col>
                            <Col sm="4">
            <span className="p-float-label">
                <InputText required style={{width: '100%'}} id="username" value={postalCode}
                           onChange={(e) => setPostalCode(e.target.value)}/>
                <label htmlFor="username">Postal Code</label>
            </span>
                            </Col>
                        </Row>
                        <Row className="mt-5 ">
                            <div className="flex align-items-center">
                                <Checkbox inputId="defaultAddress" name="defaultAddress" value={defaultAddress}
                                          onChange={(e) => setDefaultAddress(e.checked)}
                                          checked={defaultAddress}/>
                                <label htmlFor="defaultAddress" className="ml-2">Set as default address</label>
                            </div>
                        </Row>
                        <div className={'flex justify-content-end mt-5 gap-3'}>
                            <Button label="Cancel" outlined onClick={() => nullStates()}/>
                            <Button variant="primary" type={'submit'}>
                                {editAddressId ? 'Edit Address' : 'Add Address'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>) :
            <div className={'flex justify-content-between address-button'}>
                <Button label="Create new address" onClick={() => setShowForm(true)}/>
                {check && <Button label="Proceed with checked address" disabled={!selectedCardId}
                                  onClick={() => navigate('/payment')}/>
                }            </div>}
    </div>);
};

export default AddressManager;
