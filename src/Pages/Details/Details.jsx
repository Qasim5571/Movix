// import React from 'react'
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import "./styles.scss";
import DetailsBanner from "./details banner/DetailsBanner";
import Cast from "./cast/Cast";
import VideoFetch from "./videoFetch/VideoFetch";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recomendation";
const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);

  if (loading || creditsLoading) {
    // Loading state, you might show a loading spinner or message here
    return <p>Loading...</p>;
  }

  if (!data || data.results.length === 0) {
    // Handle the case where data is null or results are empty
    return <p>No data available</p>;
  }

  return (
    <div>
      <DetailsBanner video={data.results?.[0]} crew={credits.crew} />
      <Cast data={credits.cast} loading={creditsLoading} />
      <VideoFetch data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
}

export default Details;