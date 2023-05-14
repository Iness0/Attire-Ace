import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap"
import Message from "../component/Message";
import Loader from "../component/Loader";
import { listUsers, deleteUser } from "../actions/userActions";

function UserListScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList

    const userLogin = useSelector(state => state.userInfo)
    const { user: userInfo} = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
            navigate('/login')
        }
    }, [dispatch, navigate, userInfo, successDelete]);


    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you wanna delete this user?')){
        dispatch(
            deleteUser(id))
    }}

    return (
        <div>
            <h1>Users</h1>
            {loading
            ? (<Loader/>)
            : error
            ? (<Message variant={'danger'}>{error}</Message>)
            : (
                  <Table striped bordered hover responsive className={'table-small'}>
                      <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th></th>
                      </tr>
                      </thead>
                      <tbody>
                      {users.map((user) => (
                          <tr key={user._id}>
                              <td>{user._id}</td>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>{user.isAdmin ? (
                                  <i className='fas fa-check' style={{color: 'green'}}></i>
                              ) : (
                                       <i className='fas fa-x' style={{color: 'red'}}></i>
                                   )}</td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button variant={'light'} className={'btn-sm'}>
                                            <i className={'fas fa-edit'}></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant={'light'} className={'btn-sm'} onClick={() => deleteHandler(user._id)}>
                                        <i className={'fas fa-trash'}></i>
                                    </Button>
                                </td>
                          </tr>
                      ))}
                      </tbody>
                  </Table>
              )}
        </div>
    )
}

export default UserListScreen