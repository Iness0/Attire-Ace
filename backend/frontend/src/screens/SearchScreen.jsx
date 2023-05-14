import React, {useEffect} from 'react';
import Product from '../component/Product';
import Loader from "../component/Loader";
import {useDispatch, useSelector} from 'react-redux'
import {searchProducts} from "../actions/productActions";
import Message from "../component/Message";
import {useLocation} from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';

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
                <div className="grid">
                    {products.map(product => (
                        <div key={product._id} className="col-6 md:col-4 lg:col-3">
                            <Product product={product} height={'22rem'}/>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>)}

    </div>)
}

export default FilteredProductsScreen