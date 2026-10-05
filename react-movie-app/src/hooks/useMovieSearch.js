import { useState, useRef, useCallback } from 'react';

export function useMovieSearch() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const abortControllerRef = useRef(null);
  const handleSearch = useCallback((keyw) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      console.log('Đã hủy request cũ!');
    }

    if (!keyw) {
      setMovies([]);
      setError(null);
      setKeyword('');
      setPage(1);
      setHasMore(false);
      return;
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    setError(null);

    fetch(`https://phimapi.com/v1/api/tim-kiem?keyword=${encodeURIComponent(keyw)}&limit=6`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        const items = data?.data?.items || [];
        setMovies(items);
        setKeyword(keyw);
        setPage(1);
        setHasMore(items.length === 6);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('Request bị hủy an toàn.');
          return;
        }
        setError(err.message || 'Lỗi kết nối API!');
      })
      .finally(() => {
        if (abortControllerRef.current === controller) {
          setIsLoading(false);
        }
      });
  }, []);
  const handleLoadMore = () => {
    if (isLoadingMore || !hasMore) return;
    const nextPage = page + 1;
    setIsLoadingMore(true);
    fetch(`https://phimapi.com/v1/api/tim-kiem?keyword=${encodeURIComponent(keyword)}&limit=6&page=${nextPage}`)
      .then((res) => res.json())
      .then((data) => {
        const newItems = data?.data?.items || [];
        setMovies((prevMovies) => [...prevMovies, ...newItems]);
        setPage(nextPage);
        setHasMore(newItems.length === 6);
      })
      .catch((err) => console.error('Lỗi tải phim', err))
      .finally(() => {
        setIsLoadingMore(false);
      });
  };
  return {
    movies,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    handleSearch,
    handleLoadMore,
  };
}
