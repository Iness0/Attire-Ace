import React from 'react';
import {Link} from "react-router-dom";
import {Button} from 'primereact/button';

const HomeAd = ({gender}) => {

    return (
        gender === 'men' ? (<div className="hero-section">
            <div className="hero-container" style={{
                backgroundImage: 'url("../../images/malead.avif")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
            }}>
            </div>
            <div className="hero-container">
                <h4>Define style this season with our collection</h4>
                <p>Make a statement with our bold and daring fashion picks that push the boundaries of
                    conventional style, or opt for timeless classics that exude effortless sophistication.
                </p>
                <Link to={`/${gender}/new`}>
                    <Button label="New Collection" className="mt-3"/>
                </Link>
            </div>
            <div className="hero-container">
                <h4>MOST TRENDING SHOES TO FIT YOUR OWN STYLE</h4>
                <p>Whether you're hitting the gym or hitting the streets,
                    our sneakers will keep you looking fresh and on-trend.</p>
                <Link to={`/${gender}/sneakers`}>
                    <Button label="Shop Now" className="mt-3"/>
                </Link>

            </div>
            <div className="hero-container" style={{
                backgroundImage: 'url("../../images/u3.avif")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
            }}>
            </div>
        </div>) : (<div className="hero-section">
            <div className="hero-container" style={{
                backgroundImage: 'url("../../images/femaleAd.avif")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
            }}>
            </div>
            <div className="hero-container">
                <h4>Define style this season </h4>
                <p>Look effortlessly stylish with our collection of women's clothing that complements your every move.
                    Our carefully curated looks never goe out of style.
                </p>
                <Link to={`/${gender}/new`}>
                    <Button label="New Collection" className="mt-3"/>
                </Link>
            </div>
            <div className="hero-container">
                <h4>MOST TRENDING SHOES TO FIT YOUR OWN STYLE</h4>
                <p>Make a statement with our bold and fashion-forward women's shoe collection that's guaranteed to turn
                    heads.</p>
                <Link to={`/${gender}/shoes`}>
                    <Button label="Shop Now" className="mt-3"/>
                </Link>

            </div>
            <div className="hero-container" style={{
                backgroundImage: 'url("../../images/womanboots.avif")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
            }}>
            </div>

        </div>)
    )
}
export default HomeAd