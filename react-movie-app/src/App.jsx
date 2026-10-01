import { useReducer } from 'react';
import { AVAILABLE_MOVIES } from './data/movie.js';
import { cartReducer } from './cartReducer.js';

function App() {
  // 1. Khởi tạo giỏ hàng rỗng với useReducer:
  const [cart, dispatch] = useReducer(cartReducer, []);

  // 2. Tính toán trực tiếp (Derived State):
  const totalTickets = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1rem" }}>
      <header style={{ marginBottom: "2rem", borderBottom: "1px solid #334155", paddingBottom: "1rem" }}>
        <h1>🎬 KKPhim Cinema - Đặt Vé & Quản Lý Giỏ Hàng</h1>
        <p style={{ color: "#94a3b8" }}>Hệ thống đặt vé xem phim sử dụng kiến trúc React useReducer</p>
      </header>

      {/* Bố cục 2 Cột: Bên trái là Phim, Bên phải là Giỏ Hàng */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "2rem", alignItems: "start" }}>
        
        {/* === CỘT 1: DANH SÁCH PHIM ĐANG CHIẾU === */}
        <section>
          <h2>🍿 Suất Chiếu Hôm Nay</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
            {AVAILABLE_MOVIES.map(movie => (
              <div 
                key={movie.id} 
                style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  padding: "1rem", 
                  background: "#1e293b", 
                  borderRadius: "8px",
                  border: "1px solid #334155"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span style={{ fontSize: "2.5rem" }}>{movie.poster}</span>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{movie.title}</h3>
                    <div style={{ color: "#94a3b8", fontSize: "0.85rem", marginTop: "4px" }}>{movie.time}</div>
                    <div style={{ color: "#38bdf8", fontWeight: "bold", marginTop: "4px" }}>
                      {movie.price.toLocaleString()} đ
                    </div>
                  </div>
                </div>

                {/* Bấm nút Đặt Vé: Bắn Action ADD_TO_CART kèm toàn bộ object phim */}
                <button 
                  onClick={() => dispatch({ type: "ADD_TO_CART", payload: movie })}
                  style={{ 
                    padding: "8px 16px", 
                    background: "#0284c7", 
                    color: "#fff", 
                    border: "none", 
                    borderRadius: "6px", 
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  🎟️ Đặt Vé
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* === CỘT 2: GIỎ VÉ XEM PHIM (useReducer) === */}
        <section style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "1.5rem" }}>
          <h2>🛒 Giỏ Vé Của Bạn ({totalTickets} vé)</h2>

          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem 1rem", color: "#64748b" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎟️</div>
              <p>Chưa có vé nào được chọn.</p>
              <p style={{ fontSize: "0.85rem", marginTop: "4px" }}>Hãy chọn một bộ phim bên trái để đặt vé!</p>
            </div>
          ) : (
            <div style={{ marginTop: "1rem" }}>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {cart.map(item => (
                  <li 
                    key={item.id} 
                    style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center", 
                      padding: "10px 0", 
                      borderBottom: "1px solid #1e293b" 
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: "bold" }}>{item.title}</div>
                      <div style={{ color: "#38bdf8", fontSize: "0.85rem" }}>
                        {item.price.toLocaleString()} đ × {item.quantity} = {(item.price * item.quantity).toLocaleString()} đ
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      {/* Nút Giảm */}
                      <button 
                        onClick={() => dispatch({ type: "DECREASE_QTY", payload: item.id })}
                        style={{ width: "28px", height: "28px", cursor: "pointer", background: "#334155", color: "#fff", border: "none", borderRadius: "4px" }}
                      >
                        -
                      </button>

                      <span style={{ minWidth: "24px", textAlign: "center", fontWeight: "bold" }}>
                        {item.quantity}
                      </span>

                      {/* Nút Tăng */}
                      <button 
                        onClick={() => dispatch({ type: "INCREASE_QTY", payload: item.id })}
                        style={{ width: "28px", height: "28px", cursor: "pointer", background: "#334155", color: "#fff", border: "none", borderRadius: "4px" }}
                      >
                        +
                      </button>

                      {/* Nút Xóa */}
                      <button 
                        onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
                        style={{ marginLeft: "8px", color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* TỔNG KẾT HÓA ĐƠN */}
              <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "2px dashed #334155" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ color: "#94a3b8" }}>Tổng số vé:</span>
                  <strong>{totalTickets} vé</strong>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.2rem", marginBottom: "1.5rem" }}>
                  <span>Tổng tiền thanh toán:</span>
                  <strong style={{ color: "#22c55e" }}>{totalPrice.toLocaleString()} đ</strong>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  {/* Nút Xóa sạch */}
                  <button 
                    onClick={() => dispatch({ type: "CLEAR_CART" })}
                    style={{ flex: 1, padding: "10px", background: "#334155", color: "#f8fafc", border: "none", borderRadius: "6px", cursor: "pointer" }}
                  >
                    Xóa Hết
                  </button>

                  {/* Nút Thanh toán */}
                  <button 
                    onClick={() => alert(`🎉 Thanh toán thành công ${totalTickets} vé với tổng tiền ${totalPrice.toLocaleString()} đ!`)}
                    style={{ flex: 2, padding: "10px", background: "#22c55e", color: "#000", fontWeight: "bold", border: "none", borderRadius: "6px", cursor: "pointer" }}
                  >
                    Thanh Toán Ngay
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

export default App;
