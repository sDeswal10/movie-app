import React from 'react'
import Carousel from "../../../components/Carousel/Carousel"
import useFetch from '../../../hooks/useFetch'

const Similar = ({mediaType, id}) => {
    const {data, loading, error} = useFetch(`/${mediaType}/${id}/similar`)
    const title = mediaType === "tv" ? "Similar Tv Shows" : "Similar Movies"
  return (
    <Carousel
        title={title}
        data={data?.results}
        loading={loading}
        endPoint={mediaType}
    />    
  )
}

export default Similar