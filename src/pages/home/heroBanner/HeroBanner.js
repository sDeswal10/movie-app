import React, { useEffect, useState } from 'react'
import "./heroBanner.scss"
import { useNavigate } from 'react-router-dom';
import useFetch from "../../../hooks/useFetch.js"
import { useSelector } from 'react-redux';
import Img from "../../../components/LazyLoadImg/Img.jsx"
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper.jsx"

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const {url} = useSelector((state)=>state.home);

    const {data, loading, error} = useFetch("/movie/upcoming")
    useEffect(()=>{
        const bg = url.backdrop+data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
        setBackground(bg);
    },[data])

    const handleQueryInput = (e)=>{
        if(e.key === "Enter" && query.length >0){
            navigate(`/search/${query}`)
        }
    }
  return (
    <div className='heroBanner'>
        <div className='backdrop-img'>
            <Img src={background}/>
        </div>
        <div className='opacity-layer'></div>
        <ContentWrapper>
            <div className='heroBannerContent'>
                <span className='title'>Welcome</span>
                <span className='subTitle'>Millions of Movies, TV Shows and People to discover. Explore Now</span>
                <div className='searchInput'>
                    <input type='text' placeholder='Search your favourite or tv show....' onChange={(e)=>setQuery(e.target.value)} onKeyUp={handleQueryInput}/>
                    <button>Search Now</button>
                </div>
            </div>
        </ContentWrapper>
    </div>
  )
}

export default HeroBanner