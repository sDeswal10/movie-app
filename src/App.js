import { useEffect } from "react";
import "./App.css";
import { fetchTMDBApi } from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfig, getGenres } from "./store/homeSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.js";
import SearchResult from "./pages/searchResult/SearchResult.js"
import Explore from "./pages/explore/Explore.js"
import Error from "./pages/404/Error.js"
import Details from "./pages/details/Details.js"
import Header from "./components/Header/Header.js"
import Footer from "./components/Footer/Footer.js"

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = () => {
    fetchTMDBApi("/configuration")
      .then((res) => {
        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        }
      dispatch(getApiConfig(url));
    });
  };

  const genresCall = async ()=>{
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {}
    endPoints.forEach((url)=>{
      promises.push(fetchTMDBApi(`/genre/${url}/list`));
    })
    const data = await Promise.all(promises);
    data.map(({genres})=>{
      return genres.map((item)=>(allGenres[item.id] = item));
    })
    dispatch(getGenres(allGenres))
  }

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details/>}/>
        <Route path="/search/:query" element={<SearchResult/>}/>
        <Route path="/explore/:mediaType" element={<Explore/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
