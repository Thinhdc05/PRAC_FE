
import { Link } from 'react-router-dom';

export function MovieList({ movies, isLoading, error }) {
    if (isLoading) {
        return <p style={{ color: 'red', fontWeight: 'bold' }}>Đang tìm kiếm phim.....</p>
    }
    if (error) {
        return (
            <p style={{ color: '#e50914', background: '#ffebe6', padding: '12px', borderRadius: '6px' }}>
                {error}
            </p>
        )
    }
    if (!movies || movies.length === 0) {
        return <p> Không có phim để hiển thị</p>
    }
    return (
        <ul>
            {movies.map(movie => (
                <li
                    key={movie._id}
                    style={{
                        padding: '12px',
                        marginBottom: '8px',
                        borderBottom: '1px solid #eee',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Link to={`/phim/${movie.slug}`}>
                        <b>{movie.name}</b> ({movie.year})
                         <span style={{ color: '#666' }}>{movie.origin_name}</span>
                    </Link>
                   
                </li>
            ))}
        </ul>

    )
}