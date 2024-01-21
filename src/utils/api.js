import axios from "axios";


const BASE_URL = "https://api.themoviedb.org/3"
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzYxNGQ3MmRiZDhhZGM5OTVlNzk2ZTlhYzkyNGE5NSIsInN1YiI6IjY1MDk3YjkyMzk0YTg3MDBjNWJmMmY3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lxF9GrshF6BsSg0rvtmQ3_0rpzd6q2bToQByzE3TCiQ";
const headers = {
    Authorization: `Bearer ${TMDB_TOKEN}`,
    // "Access-Control-Allow-Origin": "*",
    // accept: 'application/json',    
};

export const fetchTMDBApi = async (url, params)=>{
    try {
        const {data} = await axios.get(BASE_URL+url, {
            headers,
            params
        });
        return data;
    } catch (error) {
        console.log(error)
        return error;
    }        
}

