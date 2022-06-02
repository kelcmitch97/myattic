import React from 'react';
import "./style.css"
import { Link } from 'react-router-dom';
import HeroImg from '../../assets/hero2.PNG';

const Hero = () => {
    return (
        
        <div className="hero-banner">
            <div className="left-side">

                <h1>Upload Your Downsize</h1>
                {/* <h2>Downsize</h2> */}
                
                <p>Reduce waste and repurpose classic charming hard-to-find stuff!</p>

                <Link to={`/productlist/`}><button type="submit">View Products</button></Link>

            </div>

            <div className="right-side">
                <img src={HeroImg} alt='hero image'></img>
            </div>

        </div>
    );
}

export default Hero;
