import React, { useRef } from 'react'
import "./carousel.scss"
import ContentWrapper from '../ContentWrapper/ContentWrapper'
import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from "react-icons/bs"
import Img from '../LazyLoadImg/Img'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import DummyPoster from "../../assets/no-poster.png"
import RatingCircle from '../RatingCircle/RatingCircle'
import Genres from '../Genres/Genres'
import { useNavigate } from 'react-router-dom'

const Carousel = ({data, loading, endPoint, title}) => {

    const carouselContainer = useRef();
    const navigate = useNavigate();
    const navigation = (dir) => {
        const container = carouselContainer.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };
    const {url} = useSelector((state)=>state.home)
    const skItem = ()=>{
        return(
            <div className='skeletonItem'>
                <div className='posterBlock'></div>
                <div className='textBlock'>
                    <div className='title'></div>
                    <div className='date'></div>
                </div>
            </div>
        )
    }
  return (
    <div className='carousel'>
        <ContentWrapper>
            {title && <div className='carouselTitle'>{title}</div>}
            <BsArrowLeftCircleFill className='carouselLeftNav arrow' onClick={()=>navigation("left")}/>
            <BsArrowRightCircleFill className='carouselRightNav arrow' onClick={()=>navigation("right")}/>
            {loading ? (<div className='loadingSkeleton'>
                {skItem()}
                {skItem()}
                {skItem()}
                {skItem()}
                {skItem()}
                {skItem()}
                {skItem()}
                {skItem()}
                {skItem()}
            </div>): (
                <div className='carouselItems' ref={carouselContainer}>
                    {data?.map((item)=>{
                        const posterPath = item.poster_path ? url.poster+item.poster_path : DummyPoster;
                    return(
                        <div key={item.id} className='carouselItem' onClick={()=>navigate(`/${item.media_type || endPoint}/${item.id}`)}>
                            <div className='posterBlock'>
                                <Img src={posterPath} alt=""/>
                                <RatingCircle rating={item.vote_average.toFixed(1)}/>
                                <Genres data={item.genre_ids}/>
                            </div>
                            <div className='textBlock'>
                                <span className='title'>{item.title || item.name}</span>
                                <span className='date'>{dayjs(item.release_Date).format("MMM D, YYYY")}</span>
                            </div>                           
                        </div>                        
                    )
                })}
                </div>
            )}
        </ContentWrapper>
    </div>
  )
}

export default Carousel