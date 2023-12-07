import React, { useState, useEffect } from 'react';
import './index.css'; // Import the CSS file for styling
import { Spinner, Placeholder } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Cards = ({ attractions }) => {
    const [showContent, setShowContent] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 1500);
  
      // Clean up the timer when the component unmounts
      return () => clearTimeout(timer);
    }, []);

    const getImg = (attractions) => {
        if (Array.isArray(attractions.image)) {
            return attractions.image[0];
        }
        else {
            return attractions.image
        }
    }

    const pageSwitch = (attractionId) => {
        navigate(`/detail?id=${attractionId}`);
    };

        return (
            <>
                <div className='card-list'>
                    {attractions.map((attraction, index) => (
                        <div key={index}>
                            {showContent ? (
                                <div className='card-container' key={attraction.id} onClick={() => { pageSwitch(attraction.id) }}>
                                    <img className="card-img" alt={`attraction ${attraction.name}`} src={getImg(attraction)} />
                                    <div className="card-intro-area">
                                        <p className='card-title'>{attraction.name}</p>
                                        <p className='card-text'>{attraction.description}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className='card-container' key={attraction.id}>
                                    <div className="card-img"><Spinner animation="grow" /></div>
                                    <div className="card-intro-area">
                                        <Placeholder className='card-title' animation="glow">
                                            <Placeholder xs={6} />
                                        </Placeholder>
                                        <Placeholder className='card-text' animation="glow">
                                            <Placeholder style={{ margin: '30px 0 0 0' }} xs={7} /> <Placeholder style={{ margin: '30px 0 0 0' }} xs={4} /> <Placeholder xs={4} />{' '}
                                            <Placeholder xs={6} /> <Placeholder xs={8} />
                                        </Placeholder>
                                    </div>
                                </div>
                            )}

                        </div>

                    ))}
                </div>
            </>

        );

}

export default Cards;