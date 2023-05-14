import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {LinkContainer} from 'react-router-bootstrap'
import {NavDropdown} from "react-bootstrap";
import {getUserInfo, logout} from "../actions/userActions";
import SearchBox from './SearchBox';
import '../App.css';
import MegaMenu from './pop-up.jsx';
import {categories, subcategories} from "../assets/categories";
import {CSSTransition} from 'react-transition-group';
import {Sidebar} from 'primereact/sidebar';
import {Button} from 'primereact/button';
import {SlideMenu} from 'primereact/slidemenu';

function Header() {

    const dispatch = useDispatch()

    const {user} = useSelector(state => state.userInfo)



    const gender = useSelector(state => state.preferences.gender)
    const genderf = gender == null ? 'men' : gender;

    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [categoriesVisible, setCategoriesVisible] = useState(false);

    useEffect(() => {
        dispatch(getUserInfo())
    }, [])

    const handleMouseEnter = (category) => {
        setHoveredCategory(category);
    };
    const handleMouseLeave = () => {
        setHoveredCategory(null);
    };

    const logoutHandler = () => {
        dispatch(logout())
    }

    const nodes = () => {
        const genderSubcategories = subcategories[genderf];

        const treeData = Object.entries(genderSubcategories).map(([categoryKey, categoryData]) => {
            const categoryLabel = categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);
            const subcategoryData = Object.entries(categoryData)
                .filter(([key]) => key !== "pictures")
                .flatMap(([key, value]) => {
                    return value.map((subcategory) => ({
                        key: `${gender}/${categoryKey}/${key}/${subcategory}`,
                        label: subcategory.charAt(0).toUpperCase() + subcategory.slice(1),
                        url: (subcategory === "View All" ? `/${gender}/${categoryKey}` : subcategory.toLowerCase().includes("new") ?
                            `/${gender}/${categoryKey}?category=new` : subcategory.toLowerCase().startsWith("sale") ?
                                `/${gender}/sale?category=${subcategory.split(" ")[1].toLowerCase()}` : `/${gender}/${categoryKey}?category=${
                                    subcategory.toLowerCase()}`)
                    }));
                });

            return {
                key: `${gender}/${categoryKey}`,
                label: categoryLabel,
                items: subcategoryData,
            };
        });

        return treeData;

    };

    const renderCategory = (category, index, isMegaMenu = true) => (
        category === "new" ? (
            <div
                key={index}
                className="mega-menu-container"
            >
                <LinkContainer to={`/${gender}/new`}>
                    <Nav.Link>New</Nav.Link>
                </LinkContainer>
            </div>
        ) : (
            <div
                key={index}
                className="mega-menu-container"
                onMouseEnter={() => handleMouseEnter(category)}
                onMouseLeave={handleMouseLeave}
            >
                <LinkContainer to={`/${gender}/${category}`}>
                    <Nav.Link>{category.charAt(0).toUpperCase() + category.slice(1)}</Nav.Link>
                </LinkContainer>
                {isMegaMenu && (

                    <CSSTransition
                        in={hoveredCategory === category}
                        timeout={300}
                        classNames="mega-menus-animation"
                        unmountOnExit
                    >
                        <div className="mega-menus">
                            <MegaMenu category={category} gender={gender}/>
                        </div>
                    </CSSTransition>
                )}
            </div>
        ))

    return (
        <header>
            <Container className={"mega-menu"}>
                <Navbar>
                    <Nav className="d-flex d-lg-none">
                        <div className="flex justify-content-center">
                            <Sidebar visible={categoriesVisible} onHide={() => setCategoriesVisible(false)}>
                                <div className='m-3'><SearchBox/></div>
                                <div className={'flex justify-content-evenly'} style={{marginBottom: '4rem'}}>
                                    <LinkContainer to="/women">
                                        <Nav.Link>Women</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/men">
                                        <Nav.Link> Men</Nav.Link>
                                    </LinkContainer>

                                </div>
                                <div className="flex justify-content-start">
                                    <SlideMenu model={nodes()} viewportHeight={410} menuWidth={200}></SlideMenu>
                                </div>
                                {user ? (<div className={'m-3'}>
                                        <LinkContainer to='/profile' className={'mb-4'}>
                                            <Nav.Link><i className='pi pi-user'></i> {user.name}</Nav.Link>
                                        </LinkContainer>
                                        <Button className='logout' onClick={logoutHandler}>Logout</Button>
                                    </div>
                                ) : (
                                    <LinkContainer to='/login'>
                                        <Nav.Link>Login></Nav.Link>
                                    </LinkContainer>
                                )}
                            </Sidebar>
                            <Button icon="pi pi-bars" severity="info" text onClick={() => setCategoriesVisible(true)}/>
                        </div>
                    </Nav>
                    <LinkContainer to='/'>
                        <Navbar.Brand> Attire Ace</Navbar.Brand>
                    </LinkContainer>
                    <Nav className="overlord d-none d-lg-flex">
                        <LinkContainer to="/women">
                            <Nav.Link>Women</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/men">
                            <Nav.Link> Men</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end flex-wrap ">
                        <Nav className='d-none d-lg-flex'>
                            <SearchBox/>
                            <LinkContainer to='/cart'>
                                <Nav.Link><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/wishlist'>
                                <Nav.Link><i className="fas fa-heart"></i> Wishlist</Nav.Link>
                            </LinkContainer>
                            {user ? (
                                <NavDropdown title={user.name} id={'username'}>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link><i className="fas fa-user"></i> Login</Nav.Link>
                                </LinkContainer>
                            )}
                            {user && user.isAdmin && (
                                <NavDropdown title='Admin' id={'adminmenu'}>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                        <Nav className="d-flex d-lg-none mobile-menu">

                            <LinkContainer to='/wishlist'>
                                <Nav.Link><i className="fas fa-heart"></i></Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/cart'>
                                <Nav.Link><i className="fas fa-shopping-cart"></i></Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Nav className="d-none d-lg-flex justify-content-start">
                    {gender === 'men'
                        ? categories.men.map((category, index) => renderCategory(category, index))
                        : categories.women.map((category, index) => renderCategory(category, index))}

                </Nav>
            </Container>
            {hoveredCategory && <div className="overlay"/>}

        </header>
    )
}

export default Header