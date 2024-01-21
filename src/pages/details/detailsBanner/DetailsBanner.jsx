import React, { useState } from 'react'
import "./detailsBanner.scss"
import { useParams } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper';
import DummyPoster from "../../../assets/no-poster.png"
import { useSelector } from 'react-redux';
import Img from '../../../components/LazyLoadImg/Img';
import dayjs from 'dayjs';
import Genres from '../../../components/Genres/Genres';
import RatingCircle from '../../../components/RatingCircle/RatingCircle';
import { PlayBtn } from '../PlayBtn';
import VideoPopup from '../../../components/VideoPopUp/VideoPopup';

const DetailsBanner = ({trailer, crew}) => {
    const [show, setShow] = useState(false)
    const [videoId, setVideoId] = useState(null)
    const {mediaType, id} = useParams()
    const {data, loading} = useFetch(`/${mediaType}/${id}`);
    const {url} = useSelector((state)=>state.home)
    const detailGenres = data?.genres?.map((g)=>g.id)
    const toHoursAndMinutes = (totalMinutes)=>{
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h ${minutes >0 ? `${minutes}m` : ""}`
    }
    const director = crew?.filter((d)=>d.job === "Director");
    const writer = crew?.filter((w)=>w.job === "Screenplay" || w.job=== "Story" || w.job === "Writer");
    console.log(trailer)
    console.log(crew)
  return (
    <div className='detailsBanner'>
        {loading ? (
            <div className='detailsBannerSkeleton'>
                <ContentWrapper>
                    <div className='left skeleton'></div>
                    <div className='right'>
                        <div className='row skeleton'></div>
                        <div className='row skeleton'></div>
                        <div className='row skeleton'></div>
                        <div className='row skeleton'></div>
                        <div className='row skeleton'></div>
                    </div>
                </ContentWrapper>
            </div>
        ):(
            <>
                <div className='backdrop-img'>
                    <Img src={url.backdrop+data?.backdrop_path}/>
                </div>
                <div className='opacity-layer'></div>
                <ContentWrapper>
                    <div className='content'>
                        <div className='left'>
                            {data?.poster_path ? (
                                <Img className="posterImg" src={url?.backdrop + data?.poster_path} alt=""/>
                            ) : (
                                <Img className="posterImg" src={DummyPoster} alt=""/>
                            )}
                        </div>
                        <div className='right'>
                            <div className='title'>
                                {`${data?.name || data?.title} (${dayjs(data?.release_date).format("YYYY")})`}
                            </div>
                            <div className='subTitle'>
                                {data?.tagline}
                            </div>
                            <Genres data={detailGenres}/>
                            <div className='row'>
                                <RatingCircle rating={data?.vote_average.toFixed(1)}/>
                                <div className='playBtn' onClick={()=>{
                                    setShow(true)
                                    setVideoId(trailer?.key)
                                }}>
                                    <PlayBtn/>
                                    <span className='text'>Watch Trailer</span>
                                </div>
                            </div>
                            <div className='overview'>
                                <div className='heading'>
                                    Overview
                                </div>
                                <div className='description'>
                                    {data?.overview}
                                </div>
                            </div>
                            <div className='info'>
                                {data?.status && (
                                    <div className='infoItem'>
                                        <span className='text bold'>
                                            Status: {' '}
                                        </span>
                                        <span className='text'>
                                            {data?.status}
                                        </span>
                                    </div>
                                )}
                                {data?.release_date && (
                                    <div className='infoItem'>
                                        <span className='text bold'>
                                            Release Date: {' '}
                                        </span>
                                        <span className='text'>
                                            {dayjs(data?.release_date).format("MMM D, YYYY")}
                                        </span>
                                    </div>
                                )}
                                {data?.runtime && (
                                    <div className='infoItem'>
                                        <span className='text bold'>
                                            Runtime: {' '}
                                        </span>
                                        <span className='text'>
                                            {toHoursAndMinutes(data?.runtime)}
                                        </span>
                                    </div>
                                )}
                            </div>
                            {director?.length >0 && (
                                <div className='info'>
                                    <span className='text bold'>
                                        Director: {" "}
                                    </span>
                                    <span className='text'>
                                        {director?.map((d, index)=>(
                                            <span className='text' key={index}>
                                                {d.name}
                                                {director.length - 1 !== index && ", "}                                                                                                
                                            </span>
                                        ))}
                                    </span>
                                </div>
                            )}
                            {writer?.length >0 && (
                                <div className='info'>
                                    <span className='text bold'>
                                        Writer: {" "}
                                    </span>
                                    <span className='text'>
                                        {writer?.map((d, index)=>(
                                            <span className='text' key={index}>
                                                {d.name}
                                                {writer.length - 1 !== index && ", "}                                                                                                
                                            </span>
                                        ))}
                                    </span>
                                </div>
                            )}
                            {data?.created_by?.length >0 && (
                                <div className='info'>
                                    <span className='text bold'>
                                        Created By: {" "}
                                    </span>
                                    <span className='text'>
                                        {data?.created_by?.map((d, index)=>(
                                            <span className='text' key={index}>
                                                {d.name}
                                                {data?.created_by.length - 1 !== index && ", "}                                                                                                
                                            </span>
                                        ))}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId}/>
                </ContentWrapper>
            </>
        )}
    </div>
  )
}

export default DetailsBanner