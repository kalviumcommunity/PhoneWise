import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { InfinitySpin } from 'react-loader-spinner';
import { Carousel } from 'react-bootstrap';
import './Details.css';


function Details() {
    const { slug } = useParams();
    const [phone, setPhone] = useState(null);

    useEffect(() => {
        async function fetchPhoneDetails() {
            const response = await axios.get(`https://phone-specs-api.vercel.app/${slug}`);
            setPhone(response.data.data);
        }
        fetchPhoneDetails();
        window.scrollTo(0, 0);
    }, [slug]);

    if (!phone) {
        return <div className='spinner-container'>
            <InfinitySpin
                width='200'
                color="#4fa94d"
            />
        </div>
    }

    return (
        <div className="details-container">
            <div className="details-header">
                <h2>{phone.brand} {phone.phone_name}</h2>
                <Carousel slide={false} variant="dark" controls={false} interval={3000}>
                    {phone.phone_images.map((image, index) => (
                        <Carousel.Item key={index}>
                            <img
                                className="d-block w-100 mx-auto"
                                src={image}
                                alt={`Slide ${index}`}
                                style={{ objectFit: 'contain' }}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
                <p><strong>Release Date:</strong> {phone.release_date}</p>
                <p><strong>Dimensions:</strong> {phone.dimension}</p>
                <p><strong>OS:</strong> {phone.os}</p>
                <p><strong>Storage:</strong> {phone.storage}</p>
            </div>

            <div className="details-specs">
                <h3>Specifications:</h3>
                {phone.specifications.map(spec => (
                    <div key={spec.title} className="spec-group">
                        <h4 className="spec-title">{spec.title}</h4>
                        <ul className="spec-details">
                            {spec.specs.map(specDetail => (
                                <li key={specDetail.key}>
                                    <strong>{specDetail.key}:</strong> {specDetail.val.join(', ')}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Details;