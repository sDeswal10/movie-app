import React from 'react'
import "./cast.scss"
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper'
import { useSelector } from 'react-redux'
import DummyImage from "../../../assets/avatar.png"
import Img from '../../../components/LazyLoadImg/Img'

const Cast = ({data, loading}) => {
    const {url} = useSelector((state)=>state.home)
    const skeleton = ()=>{
        return(
            <div className='skItem'>
                <div className='circle skeleton'></div>
                <div className='row skeleton'></div>
                <div className='row2 skeleton'></div>
            </div>
        )
    }
  return (
    <div className='castSection'>
        <ContentWrapper>
            <div className='sectionHeading'>Top Cast</div>
            {!loading ? (
            <div className='listItems'>
                {data?.map((item)=>{
                    const ProfileImgUrl = item?.profile_path ? url?.profile+item?.profile_path : DummyImage;
                    return(
                        <div key={item.id} className='listItem'>
                            <div className='profileImg'>
                                <Img src={ProfileImgUrl} alt=""/>
                            </div>
                            <div className='name'>
                                {item.name}
                            </div>
                            <div className='character'>
                                {item.character}
                            </div>
                        </div>
                    )
                })}
            </div>
            ) : (
                <div className="castSkeleton">
                    {skeleton()}
                    {skeleton()}               
                    {skeleton()}
                    {skeleton()}
                    {skeleton()}
                    {skeleton()}
                    {skeleton()}
                </div>
            )}

        </ContentWrapper>
    </div>
  )
}

export default Cast