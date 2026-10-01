export function cartReducer(state, action) {
    switch (action.type) {
        // 1. THÊM VÉ THÔNG MINH (Chống trùng lặp dòng):
        case "ADD_TO_CART": {
            const existingItem = state.find(item => item.id === action.payload.id);

            if (existingItem) {
                // Nếu đã có: Tăng số lượng của vé đó lên 1
                return state.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            // Nếu chưa có: Thêm vé mới vào giỏ với số lượng ban đầu là 1
            return [...state, { ...action.payload, quantity: 1 }];
        }

        // 2. TĂNG SỐ LƯỢNG:
        case "INCREASE_QTY":
            return state.map(item =>
                item.id === action.payload
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );

        // 3. GIẢM SỐ LƯỢNG (Chặn không cho giảm dưới 1):
        case "DECREASE_QTY":
            return state.map(item =>
                item.id === action.payload && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );

        // 4. XÓA MỘT VÉ:
        case "REMOVE_ITEM":
            return state.filter(item => item.id !== action.payload);

        // 5. XÓA SẠCH GIỎ HÀNG:
        case "CLEAR_CART":
            return [];

        default:
            return state;
    }
}
