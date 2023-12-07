import React, { useState, useEffect } from 'react';
import Cards from '../../components/cardList';
import SearchBar from '../../components/search-bar/search-bar.component';
import './homepage.style.css';
import useRequest from '../../hooks/useRequest';

const Home = () => {
    const [attractions, setAttractions] = useState([]);
    const [searchField, setSearchField] = useState('');
    const { request: requestAttraction, isLoading: isLoadingAttraction, error: errorAttraction } = useRequest(`/attraction/getAll`, { method: 'GET' });

    const fetchData = async () => {
        try {
            const attrData = await requestAttraction();
            if (!errorAttraction) {
                setAttractions(attrData.data.attractions);
            }
        } catch (error) {
            console.error('Error fetching attraction data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onSearchChange = (e) => {
        const searchField = e.target.value.toLowerCase();
        setSearchField(searchField);
    };

    // Check if attractions is undefined before calling filter
    const filteredAttractions = attractions && attractions.filter((attraction) =>
        attraction.name.toLowerCase().includes(searchField)
    );

    return (
        <div className="homepageApp">
            <SearchBar onChangeHandler={onSearchChange} />
            <Cards attractions={filteredAttractions || []} />
        </div>
    );
};

export default Home;
