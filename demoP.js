const Form = document.getElementById("todo-form")
const Input = document.getElementById("todo-input")
const List = document.getElementById("todo-list")
const ItemCount = document.getElementById("items-count")
const ClearBtn = document.getElementById("clear-completed-btn")
const filterBtns = document.querySelectorAll(".filter-btn")
let todos = load()
let currentFilter = "all"

function save(){
    localStorage.setItem("todos_data",JSON.stringify(todos))
}
function load(){
    try{
        const data=localStorage.getItem("todos_data")
        return data ? JSON.parse(data) : []
    }catch{
        console.error("Error loading todos")
        return []
    }
}
function handleSubmit(e){
    e.preventDefault()
    const text = Input.value.trim()
    if(text==="") return;
    addTodo(text)
    Input.value=""
    Input.focus()
}
function addTodo(text){
    const newTodo={
        id:Date.now().toString(),
        text:text,
        completed:false
    }
    todos.unshift(newTodo);
    save();
    render();
}
Form.addEventListener("submit",handleSubmit)
filterBtns.forEach(btn =>{
    btn.addEventListener("click",()=>{
        const oldBtn=document.querySelector(".filter-btn.active")
        oldBtn.classList.remove("active")
        btn.classList.add("active")
        currentFilter=btn.getAttribute("data-filter")
        // currentFilter=btn.dataset.filter
        render()
    })
})
function render(){
    List.innerHTML = ""
    let display= todos
    if(currentFilter === "active"){
        display=todos.filter(t=> t.completed===false)
    
    } else if (currentFilter=== "completed"){
        display=todos.filter(t=> t.completed===true)
    }
    if(display.length===0){
        List.innerHTML = "<li class='empty-state'>chưa có công việc</li>"
    }else{
        List.innerHTML = display.map(t=>
        `<li class="todo-item ${t.completed ? "completed" : "" }" data-id="${t.id}">
            <div class="todo-left">
            <input type="checkbox" class="todo-checkbox" ${t.completed ? "checked" : "" }>
            <span class="todo-text">${t.text}</span>
            </div>
            <button class="btn-delete">✕</button>
        </li>
        `).join("")
    }
    const activeCount = todos.filter(t=> t.completed===false).length
    ItemCount.textContent = `${activeCount} việc còn lại`
}
render()
List.addEventListener("click",(e)=>{
    const item=e.target.closest(".todo-item")
    if(!item) return
    const id=item.dataset.id
    if(e.target.classList.contains("btn-delete")){
        deleteTodo(id)
    }
    if(e.target.classList.contains("todo-checkbox") || e.target.classList.contains("todo-text")){
        toggleTodo(id)
    }
})
function deleteTodo(id){
    todos=todos.filter(t=> t.id !==id)
    save()
    render()
}
function toggleTodo(id){
    todos=todos.map(t=> t.id ===id ? {...t, completed:!t.completed} : t)
    save()
    render()
}
ClearBtn.addEventListener("click", () => {
    todos = todos.filter(t => !t.completed)
});
