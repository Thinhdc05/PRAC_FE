import { Outlet, Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext';

export function RootLayout() {
const { totalFavorites } = useFavorites(); 

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e50914', paddingBottom: '16px', marginBottom: '24px' }}>
                <h1 style={{ margin: 0 }}>
                    <Link to="/" style={{ textDecoration: 'none', color: '#e50914' }}>
                        🎬 KKPHIM STUDIO
                    </Link>
                </h1>
                <nav>
                    <Link to="/" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
                        Trang Chủ
                    </Link>
                    <span style={{ color: '#e50914', fontWeight: 'bold' }}>
                        ❤️ Yêu thích: ({totalFavorites})
                    </span>
                    
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
            <footer style={{ marginTop: '50px', borderTop: '1px solid #ddd', paddingTop: '20px', textAlign: 'center', color: '#888' }}>
                <p>FOOTER-PAGE...................</p>
            </footer>
        </div>
    )
}