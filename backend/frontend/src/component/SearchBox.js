import React, {useState} from 'react'
import { Form} from 'react-bootstrap'
import {useLocation, useNavigate} from "react-router-dom";
import { InputText } from "primereact/inputtext";


function SearchBox() {
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate();
    const location = useLocation();


    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword) {
            navigate({
                pathname: '/search',
                search: `?keyword=${keyword}&page=1`,
            })} else {
                navigate(location.pathname)
            }
    }

    return (
        <div>
        <Form onSubmit={submitHandler}>
                        <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="text" className='p-inputtext-sm' placeholder="Search" onChange={(e) => setKeyword(e.target.value)} />
            </span>
        </Form>
        </div>
    )
}

export default SearchBox