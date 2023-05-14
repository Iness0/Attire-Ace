import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {setGender} from "../actions/productActions";
import {useNavigate, useParams} from "react-router-dom";
import HomeAd from "../component/ADsection";


function HomeScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const {gender} = useParams()
    const preferences = useSelector(state => state.preferences)
    const selectedGender = gender == 'null' ||  gender == null
        ? preferences.gender == 'null' || gender == null
          ? "men"
          : preferences.gender
        : gender;



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