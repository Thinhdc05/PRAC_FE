import { ErrorBoundary } from 'react-error-boundary';
import { MovieBanner } from '../components/MovieBanner';
import { SearchBar } from '../components/SearchBar';
import { MovieList } from '../components/MovieList';
import { useMovieSearch } from '../hooks/useMovieSearch';

function MovieListFallback({ error, resetErrorBoundary }) {
  return (
    <div style={{ padding: '20px', background: '#fff1f0', border: '1px solid #ffa39e', borderRadius: '8px', margin: '20px 0', textAlign: 'center' }}>
      <p style={{ color: '#cf1322', fontWeight: 'bold', margin: '0 0 10px 0' }}>
        Khu vực danh sách phim gặp sự cố: {error?.message || 'Lỗi không xác định'}
      </p>
      <button
        onClick={resetErrorBoundary}
        style={{
          padding: '8px 16px',
          background: '#cf1322',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Thử tải lại danh sách
      </button>
    </div>
  );
}

export function HomePage() {
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

      {/* Rào chắn ErrorBoundary cấp Component bảo vệ riêng MovieList */}
      <ErrorBoundary FallbackComponent={MovieListFallback} onReset={() => handleSearch('')}>
        <MovieList movies={movies} isLoading={isLoading} error={error} />
      </ErrorBoundary>

      {hasMore && !isLoading && (
        <button onClick={handleLoadMore} disabled={isLoadingMore}>
          {isLoadingMore ? 'Đang tải thêm phim...' : 'Tải thêm phim'}
        </button>
      )}
    </div>
  );
}