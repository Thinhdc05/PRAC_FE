import { useParams, useNavigate } from 'react-router-dom';
import { bookingSchema, SEAT_PRICES } from '../schemas/bookingSchema';
import { useMovieDetail } from '../hooks/useMovieDetail';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';


export function BookingPage() {
  const navigate = useNavigate();

  const { slug } = useParams();
const { movie, isLoading, isError, error } = useMovieDetail(slug);


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      showtime: '19:30',
      seatType: 'standard',
      ticketQuantity: 1,
      agreeTerms: false,
    },
  });
  const selectedSeat = watch('seatType');
  const quantity = watch('ticketQuantity');
  const totalPrice = (SEAT_PRICES[selectedSeat] || 80000) * (Number(quantity) || 1);
  function onSubmitBooking(data) {
    console.log('Dữ liệu vé hợp lệ:', data);
    alert(` Đặt vé thành công cho phim ${movie.name}!\nTổng tiền: ${totalPrice.toLocaleString('vi-VN')} VNĐ`);
  }

  if (isLoading) {
    return <p style={{ padding: '40px', color: '#0070f3', textAlign: 'center' }}> Đang tải thông tin phim...</p>;
  }
  if (isError) {
    return <p style={{ padding: '40px', color: '#e50914', textAlign: 'center' }}>Lỗi: {error.message}</p>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', color: '#fff' }}>
      <button
        onClick={() => navigate(-1)}
        style={
          {
            padding: '8px 16px',
            marginBottom: '20px',
            background: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }
          
        }>
          Quay lại
      </button>
      <div
        style={{
          display: 'flex', gap: '20px', background: '#252525', padding: '16px', borderRadius: '8px', marginBottom: '30px', alignItems: 'center'
        }}
      >
        <img src={movie?.poster_url}
          alt={movie?.name}
          style={{ width: '90px', height: '130px', objectFit: 'cover', borderRadius: '6px' }} />
        <div>
          <h2 style={{ margin: '0 0 8px 0', color: '#e50914' }}>{movie?.name} ({movie?.year})</h2>
          <p style={{ margin: '4px 0', color: '#aaa' }}>⏱ Thời lượng: <strong>{movie?.time || 'Đang cập nhật'}</strong></p>
          <p style={{ margin: '4px 0', color: '#aaa' }}>🎬 Chất lượng: <strong>{movie?.quality || 'HD'}</strong></p>
        </div>
      </div>
      <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>🎟️ Điền Thông Tin Đặt Vé</h2>
      <form onSubmit={handleSubmit(onSubmitBooking)}
        style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}
      >
        <div>
          <label htmlFor="inputName"
            style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}
          >Họ và Tên*</label>
          <input type="text"
            {...register('fullName')}
            style={{ width: '100%', border: errors.fullName ? '1px solid #e50914' : '1px solid #444', background: '#2a2a2a', color: '#fff', boxSizing: 'border-box' }}
          />
          {errors.fullName && <p style={{ color: '#e50914', margin: '4px 0 0 0', fontSize: '13px' }}>⚠️ {errors.fullName.message}</p>}
        </div>
        <div>
          <label htmlFor="inputEmail"
            style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}
          >Thư điện tử-email*</label>
          <input type="text"
            {...register('email')}
            style={{ width: '100%', border: errors.email ? '1px solid #e50914' : '1px solid #444', background: '#2a2a2a', color: '#fff', boxSizing: 'border-box' }}
          />
          {errors.email && <p style={{ color: '#e50914', margin: '4px 0 0 0', fontSize: '13px' }}>⚠️ {errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phone"
            style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}
          >Số điện thoại *</label>
          <input type="text"
            {...register('phone')}
            style={{ width: '100%', border: errors.phone ? '1px solid #e50914' : '1px solid #444', background: '#2a2a2a', color: '#fff', boxSizing: 'border-box' }}
          />
          {errors.phone && <p style={{ color: '#e50914', margin: '4px 0 0 0', fontSize: '13px' }}>⚠️ {errors.phone.message}</p>}
        </div>
        <div>
          <label htmlFor="showtime"
            style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}
          >Suất chiếu*</label>
          <select
            {...register('showtime')}
            style={{ width: '100%', background: '#2a2a2a', color: '#fff', boxSizing: 'border-box' }}
          >
            <option value="10:00">10:00 - Sáng (Suất sớm)</option>
            <option value="14:30">14:30 - Chiều</option>
            <option value="19:30">19:30 - Tối (Giờ vàng)</option>
            <option value="22:15">22:15 - Đêm (Suất khuya)</option>
          </select>
          {errors.showtime && <p style={{ color: '#e50914', margin: '4px 0 0 0', fontSize: '13px' }}>⚠️ {errors.showtime.message}</p>}
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Loại ghế *</label>
          <div style={{ display: 'flex', gap: '20px' }}>
            <label style={{ cursor: 'pointer' }}>
              <input type="radio" value="standard" {...register('seatType')} /> Ghế thường (80k)
            </label>
            <label style={{ cursor: 'pointer' }}>
              <input type="radio" value="vip" {...register('seatType')} /> Ghế VIP (120k)
            </label>
            <label style={{ cursor: 'pointer' }}>
              <input type="radio" value="sweetbox" {...register('seatType')} /> Đôi Sweetbox (200k)
            </label>
          </div>
          {errors.seatType && <p style={{ color: '#e50914', margin: '4px 0 0 0', fontSize: '13px' }}>⚠️ {errors.seatType.message}</p>}
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Số lượng vé (1 - 8 vé) *</label>
          <input
            type="number"
            min="1"
            max="8"
            {...register('ticketQuantity')}
            style={{ width: '120px', padding: '10px', borderRadius: '6px', border: errors.ticketQuantity ? '1px solid #e50914' : '1px solid #444', background: '#2a2a2a', color: '#fff' }}
          />
          {errors.ticketQuantity && <p style={{ color: '#e50914', margin: '4px 0 0 0', fontSize: '13px' }}>⚠️ {errors.ticketQuantity.message}</p>}
        </div>
        <div style={{ background: '#222', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #46d369', marginTop: '10px' }}>
          <span style={{ fontSize: '16px', color: '#aaa' }}>Tổng tiền tạm tính: </span>
          <strong style={{ fontSize: '24px', color: '#46d369', marginLeft: '10px' }}>
            {totalPrice.toLocaleString('vi-VN')} VNĐ
          </strong>
        </div>
        <div style={{ marginTop: '10px' }}>
          <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" {...register('agreeTerms')} />
            <span>Tôi đồng ý với quy định và điều khoản đặt vé rạp chiếu phim</span>
          </label>
          {errors.agreeTerms && <p style={{ color: '#e50914', margin: '4px 0 0 0', fontSize: '13px' }}>⚠️ {errors.agreeTerms.message}</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            marginTop: '20px',
            padding: '14px',
            background: isSubmitting ? '#666' : '#e50914',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s',
          }}
        >
          {isSubmitting ? '⏳ Đang xử lý...' : '🎟️ Xác Nhận Đặt Vé'}
        </button>

      </form>
    </div>
  );
}
