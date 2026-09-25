const STORAGE_KEYS = {
    PRODUCTS: "SHOP_MINI_PRODUCTS",
    CART: "SHOP_MINI_CART",
    BALANCE: "SHOP_MINI_BALANCE"
}

const PRODUCTS = [
    {
        id: 1,
        name: "Tai nghe không dây Sony WH-1000XM5",
        category: "electronics",
        price: 6990000,
        originalPrice: 8490000,
        stock: 15,
        status: "active",
        rating: 4.9,
        image: "images/p1.jpg"
    },
    {
        id: 2,
        name: "Áo khoác Bomber Nam Minimalist",
        category: "clothing",
        price: 590000,
        originalPrice: 850000,
        stock: 20,
        status: "active",
        rating: 4.6,
        image: "images/p2.jpg"
    },
    {
        id: 3,
        name: "Robot hút bụi lau nhà thông minh",
        category: "home",
        price: 9990000,
        originalPrice: 12500000,
        stock: 8,
        status: "active",
        rating: 4.8,
        image: "images/p3.jpg"
    },
    {
        id: 4,
        name: "Điện thoại Smartphone Flagship 5G",
        category: "electronics",
        price: 24990000,
        originalPrice: 28990000,
        stock: 12,
        status: "active",
        rating: 4.9,
        image: "images/p4.jpg"
    },
    {
        id: 5,
        name: "Balo Chống Nước Đa Năng Workpack",
        category: "clothing",
        price: 680000,
        originalPrice: 950000,
        stock: 25,
        status: "active",
        rating: 4.5,
        image: "images/p5.jpg"
    },
    {
        id: 6,
        name: "Máy pha cà phê Espresso tự động",
        category: "home",
        price: 4500000,
        originalPrice: 5900000,
        stock: 0,
        status: "active",
        rating: 4.7,
        image: "images/p6.webp"
    },
    {
        id: 7,
        name: "Bàn phím cơ Bluetooth RGB Tenkeyless",
        category: "electronics",
        price: 1850000,
        originalPrice: 2400000,
        stock: 10,
        status: "active",
        rating: 4.8,
        image: "images/p7.webp"
    },
    {
        id: 8,
        name: "Quần Jeans Slimfit Co Giãn Cao Cấp",
        category: "clothing",
        price: 450000,
        originalPrice: 650000,
        stock: 18,
        status: "active",
        rating: 4.2,
        image: "images/p8.jpg"
    },
    {
        id: 9,
        name: "Nồi chiên không dầu điện tử 6.5L",
        category: "home",
        price: 1990000,
        originalPrice: 2790000,
        stock: 14,
        status: "active",
        rating: 4.7,
        image: "images/p9.jpg"
    },
    {
        id: 10,
        name: "Chuột Gaming Không Dây Siêu Nhẹ",
        category: "electronics",
        price: 1290000,
        originalPrice: 1690000,
        stock: 15,
        status: "pending",
        rating: 4.4,
        image: "images/p11.jpg"
    },
    {
        id: 11,
        name: "Giày Thể Thao Sneaker Streetwear",
        category: "clothing",
        price: 890000,
        originalPrice: 1200000,
        stock: 0,
        status: "pending",
        rating: 4.3,
        image: "images/p12.jpg"
    }
];

function saveProducts(data) {
    try {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(data));
    } catch (e) {
        console.error("Lỗi khi lưu sản phẩm vào Storage:", e);
    }
}

function getProducts() {
    try {
        const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
        if (raw) {
            const data = JSON.parse(raw);
            if (Array.isArray(data) && data.length > 0) {
                return data;
            }
        }
    } catch (e) {
        console.error("Lỗi khi đọc sản phẩm từ Storage:", e);
    }
    saveProducts(PRODUCTS);
    return PRODUCTS;
}

function resetDefaultProducts() {
    saveProducts(PRODUCTS);
    return PRODUCTS;
}
function splitPages(items, page = 1, pageSize = 6) {
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    const currentPage = Math.max(1, Math.min(page, totalPages));
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const splitPageItems = items.slice(startIndex, endIndex);
    return {
        currentPage,
        totalPages,
        totalItems,
        pageSize,
        items: splitPageItems
    };
}
