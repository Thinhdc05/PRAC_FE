import { useRouteError, Link } from 'react-router-dom';

export function ErrorPage() {
  const error = useRouteError(); 

  return (
    <div style={{ textAlign: 'center', padding: '50px 20px' }}>
      <h2 style={{ color: '#e50914', fontSize: '32px' }}>⚠️ Đã có lỗi xảy ra!</h2>
      <p style={{ color: '#666', margin: '16px 0' }}>
        {error?.statusText || error?.message || 'Trang bạn tìm kiếm không tồn tại hoặc đã bị xóa.'}
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          padding: '10px 20px',
          background: '#e50914',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '4px',
          fontWeight: 'bold',
        }}
      >
        ⬅ Quay về Trang Chủ
      </Link>
    </div>
  );
}
