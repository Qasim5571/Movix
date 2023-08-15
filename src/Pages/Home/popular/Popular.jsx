import React, { useState } from 'react'
import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper';
import SwitchTab from '../../../Components/switchTab/SwitchTab';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../Components/carousel/Carousel';

const Popular = () => {

    const [endpoint, setEndpoint] = useState('movie');

    const {data, loading} = useFetch(`/${endpoint}/popular`);

    const onTabChange = (tab) => {
        
        setEndpoint(tab === "Movies" ? "movie" : "tv");
        
    }

  return (
    <div className='carouselSelection'>
        <ContentWrapper>
            <span className='carouselTitle'>What's Popular</span> 
            <SwitchTab data = {["Movies", "TV Shows"]} onTabChange = {onTabChange}/>
        </ContentWrapper>
        <Carousel data = {data?.results} loading = {loading} endpoint = {endpoint} />
    
    </div>
  )
}

export default Popular;