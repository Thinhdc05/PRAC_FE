import { useQuery } from '@tanstack/react-query';

async function fetchMovieBySlug(slug) {
  const res = await fetch(`https://phimapi.com/v1/api/phim/${slug}`);
  if (!res.ok) throw new Error(`Lỗi tải dữ liệu phim: ${res.status}`);
  const json = await res.json();
  return json?.data?.item;
}


export function useMovieDetail(slug) {
  const { data: movie, isLoading, isError, error } = useQuery({
    queryKey: ['movie', slug],
    queryFn: () => fetchMovieBySlug(slug),
    staleTime: 5 * 60 * 1000, 
    enabled: Boolean(slug),   
  });

  return {
    movie,
    isLoading,
    isError,
    error,
  };
}
