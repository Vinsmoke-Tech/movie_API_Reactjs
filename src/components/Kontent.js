import { useEffect, useState } from "react";
import { getMovieList, searchMovie } from "./Api";
import '../App.css'


const Kontent = () => {

    const [popularMovies, setPopularMovies] = useState([])

    useEffect(() => {
        getMovieList().then((result) => {
            setPopularMovies(result)
        })   
    }, [])

    const PopularMoviesList = () => {
        return popularMovies.map((movie, i) => {
            return (
           
                    <div className="Movie-wrapper mt-8" key={i}>
                        <div className="Movie-title">{movie.title}</div>
                        <img className="Movie-image" src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} />
                        <div className="Movie-date">{movie.release_date}</div>
                        <div className="Movie-rate">{movie.vote_average}</div>
                    </div>
            
            )
        })
    }

    const search = async (q) => {
        if (q.length > 3){
            const query = await searchMovie(q)
                    setPopularMovies(query.results)
    
                
        }
    }

    
    return(
        
        <nav className="flex flex-col text-xl font-bold mt-10 md: shrink-0">
            <span className="flex justify-center text-[28px] text-slate-700">Movies API</span>
            
            <div className="flex justify-center mt-10 sm: shrink-0">
                    <label className="relative block">
                        <input
                            className=" placeholder:italic placeholder:text-slate-400 bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                            placeholder="Search for anything..." type="text" onChange={({ target }) => search(target.value) } />
                    </label>
            </div>
            
            <div className="Movie-container mt-12 bg-gray-300">
                
                    <PopularMoviesList />
            
            </div>
        </nav>
        
    )
}

export default Kontent