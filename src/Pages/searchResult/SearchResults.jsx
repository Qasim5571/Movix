import React, {useState, useEffect} from 'react';
import "./styles.scss";
import { useParams } from 'react-router-dom';
import { FetchDataFromApi } from '../../Utils/api';
import ContentWrapper from '../../Components/contentWrapper/ContentWrapper';
import MovieCard from '../../Components/movieCard/MovieCard';
import infiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../../Components/spinner/Spinner';
import noResult from '../../assets/no-results.png';
import InfiniteScroll from 'react-infinite-scroll-component';

const SearchResults = () => {

  const [data ,setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => { 
    setLoading(true)
    FetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      setData(res)
      setPageNum((prevState) => prevState + 1);
      setLoading(false);
    })}
    const fetchNextPageData = () => {
      setLoading(true);
      FetchDataFromApi(`/search/multi?query=${query}&page=${pageNum + 1}`).then(
        (res) => {
          if (data?.results) {
            setData((prevData) => ({
              ...prevData,
              results: [...prevData.results, ...res.results],
            }));
          } else {
            setData(res);
          }
          setPageNum((prevState) => prevState + 1);
          setLoading(false);
        }
      );
    };
    
    useEffect (() => {
      setPageNum(1);
      fetchInitialData();
    },[query])

  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial = {true} />}
      {!loading &&(
        <ContentWrapper>
            {data?.results?.length > 0 ? (
              <>
                <div className="pageTitle">
                  {`Search ${data?.total_results > 1 ? "Results" : "Result"} of '${query}'`}
                </div>
                <InfiniteScroll className='content'
                  dataLength={data?.results?.length || []}
                  next = {fetchNextPageData}
                  hasMore={pageNum <= data?.total_pages}
                  loader={<Spinner />}
                >
                  {data?.results?.map((item, index) => {
                    if(item.media_type === "person") return;
                    return(
                      <MovieCard key={index} data={item} fromSearch={true} />
                    )
                  })}
                </InfiniteScroll>
              </>

            ) : (
              <span className='resultNotFound'>
              No Results for <span className='query'>{query}</span> 
          </span>
            )}
        </ContentWrapper>

      )}
    </div>
  )
}

export default SearchResults