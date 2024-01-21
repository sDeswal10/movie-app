import React, { useState } from 'react'
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper'
import "../home.scss"
import TabsSwitch from '../../../components/tabsSwitch/TabsSwitch'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/Carousel/Carousel'

const Popular = () => {
    const [endPoint, setEndPoint] = useState('movie')
    const {data, loading} = useFetch(`/${endPoint}/popular`)
    const onTabChange = (tab)=>{
        setEndPoint(tab === "Movies" ? "movie" : "tv")
    }
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'>Popular Right Now</span>
            <TabsSwitch data={["Movies", "TV Shows"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} endPoint={endPoint}/>
    </div>
  )
}

export default Popular