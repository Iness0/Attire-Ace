import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {setGender} from "../actions/productActions";
import {useNavigate, useParams} from "react-router-dom";
import HomeAd from "../component/ADsection";


function HomeScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const {gender} = useParams()
    const preferences = useSelector(state => state.preferences)

    let selectedGender;
    if (gender === 'men' || gender === 'women') {
        selectedGender = gender;
    } else if (preferences.gender === 'men' || preferences.gender === 'women') {
        selectedGender = preferences.gender;
    } else {
        selectedGender = 'men'
    }




    useEffect(() => {
        dispatch(setGender(selectedGender))
        let newURL = `/${selectedGender}`;
        navigate(newURL, {replace: true});
    }, [selectedGender, navigate, dispatch])

    return (
            <HomeAd gender={gender}/>
    )
}

export default HomeScreen;