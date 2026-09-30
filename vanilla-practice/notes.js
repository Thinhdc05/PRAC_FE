const noteForm=document.querySelector("#note-form");
const titleInput=document.querySelector("#note-title");
const contentInput=document.querySelector("#note-content");
const colorInput=document.querySelector("#note-color");
const notesGrid=document.querySelector("#notes-grid");
let notes = [
    {
        id: "1",
        title: "Học JavaScript DOM",
        content: "Thực hành làm bài tập Sticky Notes Pro",
        color: "#fef08a", // Màu vàng chanh
        isPinned: true    // Được ghim lên đầu
    },
    {
        id: "2",
        title: "Uống nước",
        content: "Uống đủ 2 lít nước mỗi ngày",
        color: "#bbf7d0", // Màu xanh bạc hà
        isPinned: false   // Không ghim
    }
];
function loadNotes(){
    const saved=localStorage.getItem("notes_data")
    if(saved){
        notes=JSON.parse(saved)
    }
}
  renderNotes();
function saveNotes(){
    localStorage.setItem("notes_data",JSON.stringify(notes));
}
function renderNotes(){
    notesGrid.innerHTML=""
    if(notes.length===0){
        notesGrid.innerHTML='<p style="text-align: center; color: #94a3b8;">Không có ghi chú nào. Hãy thêm một ghi chú mới!</p>'
        return
    }
    const sortedNotes = [...notes].sort((a, b) => b.isPinned - a.isPinned);
    sortedNotes.forEach(note=>{
        const noteCard = document.createElement("div")
        noteCard.className="note-card"
        noteCard.dataset.id=note.id
        if(note.isPinned){
            noteCard.classList.add("pinned")
        }
        noteCard.style.backgroundColor =note.color
        noteCard.innerHTML=`
        <div class="note-header">
        <h3 class="note-title">${note.title}</h3>
        <button class="btn-pin" data-id="${note.id}">${note.isPinned ?' 📌 Bỏ ghim':'📍Ghim'}</button>

        </div>
        <div class="note-body">${note.content}</div>
        <div class="note-actions">
        <button class="btn-edit" data-id="${note.id}">Sửa</button>
        <button class="btn-delete" data-id="${note.id}">Xóa</button>
        </div>
        `
        notesGrid.appendChild(noteCard)
    })
}
renderNotes()
function addNote(e){
    e.preventDefault();
    const title=titleInput.value.trim()
    const content=contentInput.value.trim()
    const color=colorInput.value;
    if(title==""||content==""){
        alert("Vui lòng nhập tiêu đề và nội dung")
        return;
    }
    const editingId = noteForm.dataset.editingId
    if(editingId){
        const note=notes.find(note=>note.id===editingId)
        note.title=title
        note.content=content
        note.color=color
        delete noteForm.dataset.editingId
        document.querySelector(".btn-submit").textContent = "Dán Ghi Chú Mới 📌";

    }else{
        const newNote={
        id:Date.now().toString(),
        title,
        content,
        color,
        isPinned:false,
        }   
        notes.unshift(newNote)
    }
    saveNotes()
    renderNotes()
    titleInput.value=""
    contentInput.value=""
    colorInput.value="#fef08a"
}
noteForm.addEventListener("submit",addNote)

function deleteNote(id){
    notes=notes.filter(note=>note.id!==id)
    saveNotes()
    renderNotes()
}
function editNote(id){
    const note=notes.find(note=>note.id===id)
    titleInput.value=note.title
    contentInput.value=note.content
    colorInput.value=note.color
    noteForm.dataset.editingId=id
    document.querySelector(".btn-submit").textContent = "Cập nhật Ghi Chú 💾";
}
function pinNote(id){
    const note=notes.find(note=>note.id===id)
    note.isPinned=!note.isPinned
    saveNotes()
    renderNotes()
}
notesGrid.addEventListener("click",(e)=>{
    if(e.target.classList.contains("btn-delete")){
        deleteNote(e.target.dataset.id)
    }
    if(e.target.classList.contains("btn-edit")){
        editNote(e.target.dataset.id)
    }
    if(e.target.classList.contains("btn-pin")){
        pinNote(e.target.dataset.id)
    }
})  