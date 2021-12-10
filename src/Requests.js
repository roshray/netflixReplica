const API_KEY = 'cf32edf0c4d529cc15ab70f5711ea14f';

const requests = {
    fetchTrending: `/trending/all/week?apikey=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`, 
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&with_genres=en-US`, 
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`, 
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

export default requests;