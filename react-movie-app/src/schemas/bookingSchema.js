import { z } from 'zod';

export const bookingSchema = z.object({
  fullName: z.string().min(3, 'Họ và tên ít nhất 3 ký tư'),
  email: z.string().email('Email không đúng định dạng (vd: user@gmail.com)'),
  phone: z.string().regex(/^(0[35789])[0-9]{8}$/, 'Số điện thoại không hợp lệ (10 số Việt Nam)'),
  showtime: z.string().min(1, 'Vui lòng chọn suất chiếu'),
  seatType: z.enum(['standard', 'vip', 'sweetbox'], {
    errorMap: () => ({ message: 'Vui lòng chọn loại ghế' }),
  }),
  ticketQuantity: z.coerce.number().min(1, 'Tối thiểu 1 vé').max(8, 'Tối đa 8 vé một lần đặt'),
  agreeTerms: z.boolean().refine((val) => val === true, 'Bạn bắt buộc phải đồng ý với điều khoản'),
})
export const SEAT_PRICES = {
  standard: 80000,
  vip: 120000,
  sweetbox: 200000,
};