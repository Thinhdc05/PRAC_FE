import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

export function MovieDetailPage() {
    // ─── PHẦN 1: KHAI BÁO CÁC HOOK ĐỊNH TUYẾN ───
    const { slug } = useParams(); // 1. Lấy danh tính phim từ URL (/phim/:slug)
    const navigate = useNavigate(); // 2. Điều khiển chuyển trang bằng code
    const [searchParams, setSearchParams] = useSearchParams(); // 3. Đọc & Ghi tham số sau dấu ?
    const { toggleFavorite, isFavorite } = useFavorites();
    const isLiked = isFavorite(slug); // Phim này đã được thích chưa?

    // ─── PHẦN 2: BÓC TÁCH STATE TỪ QUERY PARAMS (KÈM GIÁ TRỊ MẶC ĐỊNH) ───
    const currentTap = searchParams.get('tap') || '1';
    const currentServer = searchParams.get('server') || 'vietsub';

    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // ─── PHẦN 3: GỌI API THEO SLUG CỦA PHIM ───
    useEffect(() => {
        setIsLoading(true);
        fetch(`https://phimapi.com/v1/api/phim/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                if (data?.data?.item) {
                    setMovie(data.data.item);
                }
            })
            .catch((err) => console.error('Lỗi lấy chi tiết phim:', err))
            .finally(() => setIsLoading(false));
    }, [slug]);

    // ─── PHẦN 4: HÀM CẬP NHẬT STATE LÊN URL (GIỮ NGUYÊN CÁC THAM SỐ KHÁC) ───
    function handleSelectTap(newTap) {
        setSearchParams({
            tap: newTap,
            server: currentServer, // Giữ nguyên server đang chọn
        },
            { replace: true });
    }

    function handleSelectServer(newServer) {
        setSearchParams({
            tap: currentTap, // Giữ nguyên tập đang chọn
            server: newServer,

        },
            { replace: true });
    }

    if (isLoading) return <p style={{ padding: '20px', color: '#0070f3' }}>⏳ Đang tải thông tin phim...</p>;
    if (!movie) return <p style={{ padding: '20px', color: 'red' }}>Không tìm thấy thông tin phim này!</p>;

    // ─── PHẦN 5: GIAO DIỆN HIỂN THỊ VÀ TƯƠNG TÁC ───
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Nút quay lại */}
            <button
                onClick={() => navigate(-1)}
                style={{
                    padding: '8px 16px',
                    marginBottom: '20px',
                    background: '#333',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                ⬅ Quay lại trang chủ
            </button>

            <h1>{movie.name} ({movie.year})
                <button
                    onClick={() => toggleFavorite(movie)}
                    style={{
                        marginLeft: '15px',
                        padding: '6px 12px',
                        background: isLiked ? '#e50914' : '#fff',
                        color: isLiked ? '#fff' : '#e50914',
                        border: '1px solid #e50914',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold',
                    }}
                >
                    {isLiked ? '❤️ Đã thích' : '🤍 Thêm vào yêu thích'}
                </button>
                <button
                    onClick={() => navigate(`/dat-ve/${slug}`)}
                    style={{
                        marginLeft: '10px',
                        padding: '6px 14px',
                        background: '#e50914',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold',
                    }}
                >
                    🎟️ Đặt vé xem phim
                </button>

            </h1>

            <p style={{ color: '#888' }}>Slug: <code>{slug}</code></p>

            {/* HỘP MÔ PHỎNG TRÌNH PHÁT VIDEO DỰA TRÊN QUERY PARAMS */}
            <div style={{
                margin: '20px 0',
                padding: '24px',
                background: '#111',
                border: '1px solid #333',
                borderRadius: '8px',
                color: '#fff',
                textAlign: 'center'
            }}>
                <h3 style={{ color: '#e50914', margin: 0 }}>
                    🎬 ĐANG CHIẾU: {movie.name.toUpperCase()}
                </h3>
                <p style={{ fontSize: '18px', margin: '12px 0' }}>
                    ▶ Bạn đang xem: <b style={{ color: '#00d2d3' }}>TẬP {currentTap}</b> | Phiên bản: <b style={{ color: '#ff9f43' }}>{currentServer.toUpperCase()}</b>
                </p>
            </div>

            {/* BỘ LỌC CHỌN TẬP PHIM */}
            <div style={{ marginBottom: '16px' }}>
                <b style={{ marginRight: '10px' }}>Chọn Tập:</b>
                {['1', '2', '3', '4', '5'].map((tap) => {
                    const isActive = currentTap === tap;
                    return (
                        <button
                            key={tap}
                            onClick={() => handleSelectTap(tap)}
                            style={{
                                padding: '6px 14px',
                                marginRight: '8px',
                                background: isActive ? '#e50914' : '#eee',
                                color: isActive ? '#fff' : '#333',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: isActive ? 'bold' : 'normal',
                            }}
                        >
                            Tập {tap}
                        </button>
                    );
                })}
            </div>

            {/* BỘ LỌC CHỌN SERVER */}
            <div style={{ marginBottom: '24px' }}>
                <b style={{ marginRight: '10px' }}>Chọn Server:</b>
                {[
                    { id: 'vietsub', label: 'Bản Vietsub' },
                    { id: 'thuyet-minh', label: 'Bản Thuyết Minh' },
                ].map((srv) => {
                    const isActive = currentServer === srv.id;
                    return (
                        <button
                            key={srv.id}
                            onClick={() => handleSelectServer(srv.id)}
                            style={{
                                padding: '6px 14px',
                                marginRight: '8px',
                                background: isActive ? '#0070f3' : '#eee',
                                color: isActive ? '#fff' : '#333',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: isActive ? 'bold' : 'normal',
                            }}
                        >
                            {srv.label}
                        </button>
                    );
                })}
            </div>

            <div style={{ margin: '20px 0', padding: '16px', background: '#f5f5f5', borderRadius: '8px', color: '#333' }}>
                <h3>Nội dung phim:</h3>
                <p>{movie.content?.replace(/<[^>]*>?/gm, '') || 'Đang cập nhật nội dung...'}</p>
            </div>
        </div>
    );
}
