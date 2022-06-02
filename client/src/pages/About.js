import React from 'react';
import Cart from "../components/Cart";

const About = () => {
    return (
        <div className='about-page-container'>
            <div className='about-title'>
            <h1>About My Attic...</h1>
            </div>

            <div className='about-content'>

                <div className='about-left-side'>
                    <p>
                    MyAttic is an ecommerce application that provides a widely-needed public service to connect communities to reduce waste and repurpose their ‘stuff’. Think of it as an online ‘garage sale’. People—from millennials to seniors—moving to smaller spaces look for help through the stressful process of downsizing. And those who find themselves inheriting the stuff of family and friends need a service that can help them sell no-longer-needed items to others who may be looking for classic, charming, and unique things. Welcome to MyAttic!
                    </p>
                    <p>
                    MyAttic buyers and sellers login/register on the site and can view the Products and Categories for sale. Buyers… can select items, place them in their shopping cart and pay by credit card through our secure online system. Sellers… can post items to MyAttic via their contact form by name, description, image (upload 640px wide image in standard format, we tend to use .jpg), and suggested price. MyAttic can assist you if needed and will let you know when you have a buyer.
                    </p>
                </div>
                <div className='about-right-side'>
                    <p>
                    Shipping… costs are generally passed on to the buyer but are kept minimal through our partnerships with standard overland couriers and moving companies (for larger items). We can help sellers with good local shipping contacts, packaging materials and tips. Once the transaction is completed a shipping label will be provided to the seller to send the item directly to the buyer.
                    </p>
                </div>

            </div>

        </div>
    )
}

export default About;
