import React from 'react';
import {Nav, Container} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {subcategories} from "../assets/categories";

const MegaMenu = ({category, gender}) => {

    const renderColumns = (data) => {
        if (!data) {
            return <div>No Subcategories yet!</div>;
        } else {
            return Object.keys(data).map((key, index) => key === "pictures" ? (
                <div className="mega-picture" key={index}> {data[key].map((picture, index) => (
                    <img key={index} src={picture} alt="Category"/>))}
                </div>) : (<div className="mega-menu-column" key={index}>
                <span className='rowKey'>{key}</span>
                {data[key].map((subcategory, index) => (<LinkContainer
                    key={index}
                    to={subcategory === "View All" ? `/${gender}/${category}` : subcategory.toLowerCase().includes("new") ? {
                        pathname: `/${gender}/${category}`, search: 'category=new'
                    } : subcategory.toLowerCase().startsWith("sale") ? {
                        pathname: `/${gender}/sale`, search: `?category=${subcategory.split(" ")[1].toLowerCase()}`,
                    } : {
                        pathname: `/${gender}/${category}`, search: `?category=${
                            subcategory.toLowerCase()
                        }`
                    }}
                >
                    <Nav.Link>{subcategory}</Nav.Link>
                </LinkContainer>))}
            </div>));
        }
    };

    return (<Container>
        <Nav className="mega-menu-container-items">
            {gender === "men" ? renderColumns(subcategories.men[category]) : renderColumns(subcategories.women[category])}
        </Nav>

    </Container>);
};

export default MegaMenu;
