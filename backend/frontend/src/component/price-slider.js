import React, {useState} from 'react';
import {InputNumber} from 'primereact/inputnumber';
import {Slider} from 'primereact/slider';
import {useLocation, useNavigate} from "react-router-dom";

const PriceRange = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [minPrice, setMinPrice] = useState(1);
    const [maxPrice, setMaxPrice] = useState(999);

    const handleSliderChange = (value, type='slider') => {
        const searchParams = new URLSearchParams(location.search);
        if (type === 'min') {
            setMinPrice(value);
        } else if (type === 'max') {
            setMaxPrice(value);
        } else {
            const [min, max] = value;
            if (min < max) {
                setMinPrice(min);
                setMaxPrice(max);
            } else {
                setMaxPrice(min);
                setMinPrice(max);
            }}
        searchParams.set('min', minPrice);
        searchParams.set('max', maxPrice);

        navigate(`${location.pathname}?${searchParams.toString()}`, {replace: true});

    };
    const handleSlide = (value) => {
        const [min, max] = value;
        if (min < max) {
                setMinPrice(min);
                setMaxPrice(max);
            } else {
                setMaxPrice(min);
                setMinPrice(max);
            }}

    return (
        <div>
            <div className="price-input-container">
                    <InputNumber value={minPrice} onValueChange={(e) => handleSliderChange(e.value, 'min')}
                                 mode="currency"
                                 currency="USD" locale="en-US"/>

                    <InputNumber value={maxPrice} onValueChange={(e) => handleSliderChange(e.value, 'max')}
                                 mode="currency" currency="USD" locale="en-US"/>
            </div>
            <Slider
                range
                max={5000}
                value={[minPrice, maxPrice]}
                onChange={(e) => {handleSlide(e.value)}}
                onSlideEnd={(e) => handleSliderChange(e.value)}
                orientation="horizontal"
            />
        </div>);
};

export default PriceRange;