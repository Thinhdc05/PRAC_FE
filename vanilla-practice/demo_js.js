// ==========================================================================
// 🚀 BÀI TẬP THỰC CHIẾN 4.6: XÂY DỰNG ỨNG DỤNG TO-DO LIST PRO (JS THUẦN)
// ==========================================================================

// 1. TÓM CÁC PHẦN TỬ DOM CẦN THIẾT
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const itemsCount = document.querySelector("#items-count");
const clearCompletedBtn = document.querySelector("#clear-completed-btn");
const filterBtns = document.querySelectorAll(".filter-btn");

// 2. KHỞI TẠO STATE (DỮ LIỆU NGUỒN)
// Mảng chứa danh sách công việc. Mỗi công việc có dạng:
// { id: "1726300001", text: "Học JS DOM", completed: false }
// Dữ liệu mẫu để thử nghiệm:

let todos=loadTodos();
// Ra lệnh vẽ ra màn hình:


let currentFilter = "all"; // "all" | "active" | "completed"
renderTodos();
// --------------------------------------------------------------------------
// 🎯 BƯỚC 1: VIẾT 2 HÀM ĐỒNG BỘ LOCALSTORAGE
// --------------------------------------------------------------------------
// Hàm 1: saveTodos()
// -> Nhiệm vụ: Đóng gói mảng `todos` thành chuỗi JSON và lưu vào localStorage với key là "todos_data"
function saveTodos() {
    // TODO: Bạn hãy viết code lưu dữ liệu vào localStorage ở đây...
    localStorage.setItem("todos_data", JSON.stringify(todos));
}

// Hàm 2: loadTodos()
// -> Nhiệm vụ: Đọc chuỗi JSON từ localStorage với key "todos_data", 
//              dùng JSON.parse (nhớ bọc try...catch) để khôi phục lại mảng,
//              nếu chưa có gì thì trả về mảng rỗng []
function loadTodos() {
    // TODO: Bạn hãy viết code đọc dữ liệu từ localStorage ở đây...
    try {
        const storedTodos = localStorage.getItem("todos_data");
        return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (error) {
        console.error("Error loading todos from localStorage:", error);
        return [];
    }
}
function renderTodos() {
    todoList.innerHTML = "";
    let filteredTodos = todos;
    if (currentFilter === "active") {
        filteredTodos = todos.filter(t => !t.completed); // chỉ lấy việc chưa xong
    } else if (currentFilter === "completed") {
        filteredTodos = todos.filter(t => t.completed);  // chỉ lấy việc đã xong
    }
    // 2. Nếu sau khi lọc mà không có việc nào thì hiện chữ:
    if (filteredTodos.length === 0) {
        todoList.innerHTML = '<li class="empty-state">Không có công việc nào!</li>';
    }

    filteredTodos.forEach(todo => {
        const li = document.createElement("li");
        li.className = "todo-item";
        if (todo.completed) {
            li.classList.add("completed");
        }
        li.dataset.id = todo.id;
        li.innerHTML = `
        <div class="todo-left">
        <input type="checkbox" class="todo-checkbox" ${todo.completed ? "checked" : ""}>  
        <span class="todo-text">${todo.text}</span>
        </div>
        <button class="btn-delete" title="Xóa">&times;</button>
        `;
        todoList.appendChild(li);
    })
    // 3. Đếm số việc chưa xong và hiện lên màn hình
    const uncompletedCount = todos.filter(t => !t.completed).length;
    itemsCount.textContent = `${uncompletedCount} công việc còn lại`;


}
todoForm.addEventListener("submit", e => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text === "") return;
    const newTodo = {
        id: Date.now().toString(),
        text,
        completed: false
    }
    todos.unshift(newTodo);
    saveTodos();
    renderTodos();
    todoInput.value = "";
})

todoList.addEventListener("click", function(e) {
    const li = e.target.closest(".todo-item");
    if (!li) return; 
    const id = li.dataset.id;
    if (e.target.matches(".todo-checkbox")) {
        const todo = todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed; 
            saveTodos();
            renderTodos();
        }
        return;
    }
    if (e.target.closest(".btn-delete")) {
        todos = todos.filter(t => t.id !== id);
        saveTodos();
        renderTodos();
        return;
    }
});
const filtersContainer = document.querySelector("#filters");
filtersContainer.addEventListener("click", function(e) {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
 filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
 currentFilter = btn.dataset.filter;
renderTodos();
})
clearCompletedBtn.addEventListener("click", function() {
    todos = todos.filter(t => !t.completed);
    saveTodos();
    renderTodos();
});