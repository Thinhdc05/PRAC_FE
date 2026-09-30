const screenStart = document.getElementById('screen-start');
const screenQuiz = document.getElementById('screen-quiz');
const screenResult = document.getElementById('screen-result');
const btnStart = document.getElementById('btn-start');
const btnRestart = document.getElementById('btn-restart');
const questionTitle = document.getElementById('question-title');
const optionsContainer = document.getElementById('options-container');
const questionProgress = document.getElementById('question-progress');
const timeLeftDisplay = document.getElementById('time-left');
const timerBar = document.getElementById('timer-bar');
const scoreText = document.getElementById('score-text');
const feedbackText = document.getElementById('feedback-text');

let currentQuestions = []
let currentIndex = 0;
let timeLeft = 15;
let score = 0;
let timer = null;

// Dữ liệu câu hỏi
const questions = [
    {
        question: "Trong JavaScript, từ khóa 'let' dùng để làm gì?",
        options: ["Khai báo biến chỉ dùng trong scope hiện tại", "Khai báo hằng số", "Khai báo hàm", "Khai báo đối tượng"],
        answer: 0
    },
    {
        question: "Phép toán nào sau đây cho kết quả '50'?",
        options: ["25 * 2", "'25' + 2", "25 + '25'", "100 / 2"],
        answer: 0
    },
    {
        question: "Phương thức nào dùng để thêm phần tử vào cuối mảng trong JS?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        answer: 0
    },
    {
        question: "Giá trị của 'true === 1' là gì?",
        options: ["true", "false", "undefined", "Error"],
        answer: 1
    },
    {
        question: "'===' và '==' khác nhau như thế nào trong JavaScript?",
        options: ["=== kiểm tra cả giá trị và kiểu dữ liệu", "== kiểm tra giá trị và kiểu dữ liệu", "Không có sự khác biệt", "=== dùng cho chuỗi, == dùng cho số"],
        answer: 0
    },
    {
        question: "Toán tử so sánh nào kiểm tra cả GIÁ TRỊ lẫn KIỂU DỮ LIỆU?",
        options: ["==", "===", "!=", "="],
        answer: 1
    },
    {
        question: "Kết quả của phép tính: typeof null trong JavaScript là gì?",
        options: ["null", "undefined", "object", "number"],
        answer: 2
    },
    {
        question: "Từ khóa nào khai báo biến có phạm vi Block Scope và KHÔNG THỂ gán lại giá trị?",
        options: ["var", "let", "const", "static"],
        answer: 2
    },
    {
        question: "Hàm nào dùng để DỪNG một bộ đếm setInterval đang chạy?",
        options: ["stopInterval()", "clearInterval()", "clearTimeout()", "pauseTimer()"],
        answer: 1
    },
    {
        question: "Trong Event Loop, Promise.then() thuộc hàng đợi nào?",
        options: ["Macrotask Queue", "Microtask Queue", "Render Queue", "Call Stack"],
        answer: 1 
    },
    {
        question: "Phương thức mảng nào tạo ra một mảng MỚI bằng cách biến đổi từng phần tử?",
        options: ["forEach()", "filter()", "map()", "reduce()"],
        answer: 2 
    },
    {
        question: "Phương thức nào dùng để chuyển đổi chuỗi JSON thành Object trong JS?",
        options: ["JSON.stringify()", "JSON.parse()", "JSON.toObject()", "JSON.convert()"],
        answer: 1 
    },
    {
        question: "Bộ đôi Web API nào dùng để ngắt (cancel) một yêu cầu fetch() đang bay dở?",
        options: ["AbortController & signal", "StopFetch & abort", "CancelToken & promise", "Event & listener"],
        answer: 0 
    }
];
function startGame(){
    screenStart.style.display = 'none';
    screenQuiz.style.display = 'flex';
    screenResult.style.display = 'none';
    currentQuestions = [...questions].sort(() => Math.random() - 0.5).slice(0, 5);
    currentIndex = 0;
    score = 0;
    timeLeft = 15;
    loadQuestion();
    startTimer();
}
function loadQuestion(){
        if (currentIndex >= currentQuestions.length) {
        endGame();
        return;
    }
    const q = currentQuestions[currentIndex];
    questionTitle.textContent = q.question;
    questionProgress.textContent = `Câu hỏi ${currentIndex + 1} / ${currentQuestions.length}`;
    optionsContainer.innerHTML = '';
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.className = 'option-btn';
        btn.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(btn);
    });
}
function startTimer(){
    
    clearInterval(timer);
    timeLeft = 15;
    timeLeftDisplay.textContent = timeLeft;
    timerBar.style.width = '100%';
    
    timer = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;
        timerBar.style.width = `${(timeLeft / 15) * 100}%`;
        if (timeLeft <= 0) {
            selectAnswer(-1);
        }
    }, 1000);
}
function selectAnswer(index){
    clearInterval(timer);
    const q = currentQuestions[currentIndex];
    const buttons = optionsContainer.querySelectorAll('.option-btn');
    if (index === q.answer) {
        score++;
        buttons[index].classList.add('correct');
    }else{
        buttons[index].classList.add('wrong');
        buttons[q.answer].classList.add('correct');
    }
    currentIndex++;
    setTimeout(loadQuestion, 1000);
}
btnStart.addEventListener('click', startGame);
btnRestart.addEventListener('click', startGame);
function endGame(){
    screenQuiz.style.display = 'none';
    screenResult.style.display = 'flex';
    scoreText.textContent = `Bạn đạt ${score} / ${currentQuestions.length} điểm`;
    if (score >= 4) {
        feedbackText.textContent = "Xuất sắc!";
    } else if (score >= 2) {
        feedbackText.textContent = "Cố gắng hơn!";
    } else {
        feedbackText.textContent = "Xem lại kiến thức nhé!";
    }
    clearInterval(timer);
}