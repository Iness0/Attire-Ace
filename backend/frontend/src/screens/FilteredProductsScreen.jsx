import React, {useEffect, useState} from 'react';
import Product from '../component/Product';
import Loader from "../component/Loader";
import {useDispatch, useSelector} from 'react-redux'
import {listProducts} from "../actions/productActions";
import {useLocation, useParams} from "react-router-dom";
import Filter from "../component/Filter";
import InfiniteScroll from 'react-infinite-scroll-component';
import {Sidebar} from 'primereact/sidebar';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {Row, Col} from 'react-bootstrap'


function FilteredProductsScreen() {
    const dispatch = useDispatch()
    const location = useLocation()

    const productList = useSelector(state => state.productList)
    const {products, page, pages} = productList

    const [visible, setVisible] = useState(false)
    const searchParams = new URLSearchParams(location.search);
    const searchKeys = ["page", "category", "size", "min", "max",]
    const queryObj = {};

    const [sort, setSort] = useState('Our pick');
    const sortingParams = [{filterName: 'Our pick', filterParam: 'chosen'},
        {filterName: 'Newest first', filterParam: 'by_new'},
        {filterName: 'Low to High price', filterParam: 'price_asc'},
        {filterName: 'High to Low price', filterParam: 'price_desc'}]
    searchKeys.forEach((key) => {
        queryObj[key] = searchParams.get(key);
    });


    const {gender, category} = useParams()
    const preferences = useSelector(state => state.preferences)
    const selectedGender = gender ?? preferences.gender
    const sortingFilter = sort.filterParam

    useEffect(() => {
        dispatch(listProducts(selectedGender, category, sortingFilter, queryObj,))
    }, [selectedGender, category, location, sort])
    const fetchMoreData = () => {
        if (page >= pages) {
            return;
        }
        queryObj.page = page + 1;
        dispatch(listProducts(selectedGender, category, sortingFilter, queryObj));
    };

    return (<div className="mt-3">
        <Row>
            <Col lg={3} className="d-none d-lg-flex">
                <Filter category={category} gender={selectedGender}/>
            </Col>
            <Col xs={12} lg={9}>
                <div className="ms-2 gap-2 d-flex filter-sort-buttons d-lg-none">
                    <Sidebar visible={visible} position="bottom" onHide={() => setVisible(false)}
                             className="w-full h-full">
                        <h2 className='ms-2'> Filters</h2>
                        <Filter category={category} gender={selectedGender}/>
                    </Sidebar>
                    <Dropdown value={sort} onChange={(e) => setSort(e.value)} options={sortingParams}
                              optionLabel="filterName"
                              placeholder="Filter by" className="" style={{width: '60%', borderColor: 'black'}}/>
                    <Button icon="pi pi-sliders-h" label={'Filter'} style={{ width: "40%",
                        display: "inline-block", backgroundColor: 'white', color: 'black'}}
                            onClick={() => setVisible(true)}/>
                </div>
                <div className="d-none d-md-flex justify-content-end me-2">
                    <Dropdown value={sort} onChange={(e) => setSort(e.value)} options={sortingParams}
                              optionLabel="filterName"
                              placeholder="Filter by" className="w-full md:w-13rem" style={{border: "none"}}/>
                </div>
                {products.length === 0 ? (
                    <div style={{justifyContent: 'center'}}>Sorry, there's nothing that satisfy your
                        request.</div>
                ) : (
                    <InfiniteScroll style={{overflow: 'hidden'}}
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
                                <Col key={product._id} xs={6} md={4}>
                                    <Product product={product} height={'18rem'}/>
                                </Col>
                            ))}
                        </Row>
                    </InfiniteScroll>)}
            </Col>
        </Row>
    </div>)
}

export default FilteredProductsScreen