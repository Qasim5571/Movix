import { useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import { FetchDataFromApi } from './Utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { getApiConfigration, getGenres} from './Store/HomeSlice';
import Home from './Pages/Home/Home';
import Explore from './Pages/Explore/Explore';
import SearchResult from './Pages/searchResult/SearchResults';
import PageNotFound from './Pages/404/PageNotFound';
import Details from './Pages/Details/Details';
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'



function App() {
  const dispatch = useDispatch()
  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = async () => {
    try {
      const res = await FetchDataFromApi("/configuration");
      console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",

      }
      dispatch(getApiConfigration(url))
    } catch (error) {
      console.error(error);
    }
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv" , "movie"];
    let allGenres = {};

    endPoints.forEach((url) => { 
      promises.push(FetchDataFromApi(`/genre/${url}/list`));
  });

  const data = await Promise.all(promises);
  data.map(({genres}) => {
    return  genres.map((item) => 
      (allGenres[item.id] = item))
  });

  dispatch(getGenres(allGenres));     

}

  return (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element = {<Home />}/>
      <Route path='/:mediaType/:id' element = {<Details />}/>
      <Route path='/search/:query' element = {<SearchResult />}/>
      <Route path='/explore/:mediaType' element = {<Explore />}/>
      <Route path='*' element = {<PageNotFound />}/>
    </Routes>
    <Footer />
  </BrowserRouter>
  );
}

export default App;