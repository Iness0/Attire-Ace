import React, {useEffect, useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {Accordion, AccordionTab} from 'primereact/accordion';
import {Checkbox} from 'primereact/checkbox';
import PriceRange from "./PriceSlider";
import {useDispatch, useSelector} from "react-redux";
import {getCategories} from "../actions/filterActions";
import Loader from "./Loader";
import Message from "./Message";

const Filter = ({category, gender}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch()
    const searchParams = new URLSearchParams(location.search);


    const [filterState, setFilterState] = useState({
        category: [],
        size: []
    });
    const {subcategories, sizes, loading, error} = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(getCategories(category, gender))
    }, [category, gender])

    useEffect(() => {
        const initialSize = searchParams.get('size');
        const initialCategory = searchParams.get("category")
        const uniqueList = initialCategory ? [...new Set(initialCategory.split("|"))] : [];
        const sizeList = initialSize ? [...new Set(initialSize.split("|").map(Number))] : [];
        setFilterState(prevState => ({
            ...prevState,
            category: uniqueList,
            size: sizeList,
        }));
    }, [location]);

    const updateFilter = (id, type) => {
        setFilterState((prevState) => {
            const updatedState = {...prevState};
            const selectedItems = updatedState[type];

            if (selectedItems.includes(id)) {
                updatedState[type] = selectedItems.filter((itemId) => itemId !== id);
            } else {
                updatedState[type] = [...selectedItems, id];
            }

            return updatedState;
        });
        const searchParams = new URLSearchParams(location.search);
        const updatedItems = filterState[type].includes(id)
            ? filterState[type].filter((itemId) => itemId !== id)
            : [...filterState[type], id];
        const newQueryParam = updatedItems.map((itemId) => `${itemId}`).join('|');

        if (newQueryParam) {
            searchParams.set(type, newQueryParam);
        } else {
            searchParams.delete(type);
        }

        navigate({pathname: location.pathname, search: searchParams.toString()});
    };
    return (
        loading ? <Loader/>
            : error ? <Message variant='danger'>{error}</Message>
                :
                <div className="filter">
                    <Accordion multiple activeIndex={[0]}>
                        <AccordionTab header="Category">
                            {subcategories && subcategories.map((category, index) => (
                                <div key={index} className="pt-2">
                                    <Checkbox inputId={index} name="category" value={index}
                                              onChange={() => updateFilter(category.category, 'category')}
                                              checked={filterState.category.includes(category.category)}/>
                                    <label htmlFor={index}
                                           className="ms-2">{category.category.charAt(0).toUpperCase() + category.category.slice(1)}</label>
                                </div>
                            ))}

                        </AccordionTab>
                        <AccordionTab header="Size">
                            <div className=" flex flex-wrap box-selection-container gap-2">
                                {sizes.map((size) => (
                                    <div
                                        key={size.size__id}
                                        className={`${size.size__size.length >= 6 ? "big-box" : "box"} ${filterState.size.includes(size.size__id) ? "selected" : ""}`}
                                        onClick={() => updateFilter(size.size__id, 'size')}
                                    >
                                        {size.size__size}
                                    </div>

                                ))}
                            </div>
                        </AccordionTab>
                        <AccordionTab header="Price" className={'mb-2'}>
                            <PriceRange/>
                        </AccordionTab>
                    </Accordion>
                </div>
    )
}

export default Filter;
