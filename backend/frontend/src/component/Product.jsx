import React from 'react';
import {Card} from 'react-bootstrap'
import Rating from './Rating'
import {Link} from 'react-router-dom'
import {addToWishlist, removeFromWishlist} from "../actions/wishlistActions";
import {useDispatch, useSelector} from "react-redux";

function Product({product, height}) {

    const dispatch = useDispatch()
    const {wishlist} = useSelector((state) => state.wishlist);
    const isProductInWishlist = wishlist.some(item => item.product === product._id);

    const addToWishlistHandler = () => {
        dispatch(addToWishlist(product._id));
    }
    const removeFromWishlistHandler = () => {
        dispatch(removeFromWishlist(product._id))
    };

    return (
        <Card className="my-3 p-3 product-card">
            <div className="image-container">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} style={{height: `${height}`, border: 'none'}}/>
            </Link>
                {isProductInWishlist ? <i className="pi pi-heart-fill icon" onClick={() => removeFromWishlistHandler()}></i>
                    : <i className="pi pi-heart icon" onClick={() => addToWishlistHandler()}></i>}
            </div>
            <Card.Body>
                <Link to={`/product/${product._id}`} style={{textDecoration: 'none', fontWeight: 'bold'}}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <div className="my-3">
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                    </div>
                </Card.Text>
                <Card.Text as="h5">
                    {product.sale_price ? (
                        <>
                            <span style={{
                                textDecoration: "line-through", marginLeft: '-0.3rem'
                            }}>{product.price}</span>
                            <span className={'sale-price'}
                                  style={{fontWeight: "bold", color: "red", marginLeft: '1rem'}}>
                            {product.sale_price}
                          </span>
                        </>
                    ) : (
                        <>{product.price}</>
                    )}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product;