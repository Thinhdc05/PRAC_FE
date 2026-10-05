import { useEffect, useState, useRef, useCallback } from 'react';
import { MovieBanner } from './components/MovieBanner';
import { SearchBar } from './components/SearchBar';
import {MovieList} from'./components/MovieList';
import{useMovieSearch} from './hooks/useMovieSearch'

function App() {
   const {
    movies,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    handleSearch,
    handleLoadMore,
  } = useMovieSearch();
  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <MovieBanner movies={movies} />
      <MovieList movies={movies} isLoading={isLoading} error={error} />
      {
        hasMore && !isLoading &&(
          <button
          onClick={handleLoadMore}
          disabled={isLoadingMore}
          >
            {isLoadingMore? 'Dang tai them phim':'tai thêm phim'}
          </button>
        )
      }
    </div>
  )
}

export default App;