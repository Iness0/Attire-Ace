import React, {useEffect} from 'react';
import Product from '../component/Product';
import Loader from "../component/Loader";
import {useDispatch, useSelector} from 'react-redux'
import {searchProducts} from "../actions/productActions";
import Message from "../component/Message";
import {useLocation} from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import {Col, Row} from 'react-bootstrap';

function FilteredProductsScreen() {
    const dispatch = useDispatch()
    const location = useLocation()

    const productList = useSelector(state => state.productList)
    const {error, products, page, pages} = productList

    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get('keyword')
    const current_page = searchParams.get('page')

    useEffect(() => {
        dispatch(searchProducts(keyword, current_page))
    }, [location, current_page, keyword])

    const fetchMoreData = () => {
        if (page >= pages) {
            return;
        }
        const newPage = page + 1;
        console.log(`new param is ${newPage}`)
        dispatch(searchProducts(keyword, newPage));
    };

    return (<div className="mt-3">
        <h3>Results for search : {keyword}</h3>
        {error ? <Message variant='danger'>{error}</Message>
            : (<InfiniteScroll style={{overflow: 'hidden'}}
                               dataLength={products.length}
                               next={fetchMoreData}
                               hasMore={page < pages}
                               loader={<Loader/>}
                               endMessage={
                                   <p style={{textAlign: 'center'}}>
                                       <b>If you haven't found what you've been looking - checkout later!</b>
                                   </p>
                               }
            >
                <Row>
                    {products.map(product => (
                        <Col key={product._id} xs={6} md={4} lg={3}>
                            <Product product={product} height={'22rem'}/>
                        </Col>
                    ))}
                </Row>
            </InfiniteScroll>)}

    </div>)
}

export default FilteredProductsScreen