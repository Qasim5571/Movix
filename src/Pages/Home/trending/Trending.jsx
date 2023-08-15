import React, { useState } from 'react'
import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper';
import SwitchTab from '../../../Components/switchTab/SwitchTab';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../Components/carousel/Carousel';

const Trending = () => {

    const [endpoint, setEndpoint] = useState('day');

    const {data, loading} = useFetch(`/trending/movie/${endpoint}`);

    const onTabChange = (tab) => {
        
        setEndpoint(tab === "Days" ? "day" : "week");
        
    }

  return (
    <div className='carouselSelection'>
        <ContentWrapper>
            <span className='carouselTitle'>Trending</span> 
            <SwitchTab data = {["Days", "Week"]} onTabChange = {onTabChange}/>
        </ContentWrapper>
        <Carousel data = {data?.results} loading = {loading} />
    
    </div>
  )
}

export default Trending