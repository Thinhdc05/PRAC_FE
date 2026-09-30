import { useState } from 'react';

function App() {
  const [likes, setLikes] = useState(0);

  // Cách 1: Bị dính bẫy Snapshot (Chỉ tăng 1)
  function tangTruyenThong() {
    setLikes(likes + 1);
    setLikes(likes + 1);
    setLikes(likes + 1);
  }

  // Cách 2: Dùng Updater Function (Tăng chuẩn 3)
  function tangChuan3() {
    setLikes(prev => prev + 1);
    setLikes(prev => prev + 1);
    setLikes(prev => prev + 1);
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>❤️ Lượt thích: {likes}</h1>
      <button onClick={tangTruyenThong} style={{ marginRight: "10px", padding: "8px 16px" }}>
        Tăng 3 lần (Truyền thống - Chỉ tăng 1)
      </button>
      <button onClick={tangChuan3} style={{ padding: "8px 16px", background: "#22c55e", color: "#fff", border: "none" }}>
        Tăng 3 lần (Dùng prev ={">"} prev + 1)
      </button>
    </div>
  );
}

export default App;
