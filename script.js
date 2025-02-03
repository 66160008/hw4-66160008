const quizData = [
    { id: 1, text: "ประเทศไทยมีจังหวัดทั้งหมดกี่จังหวัด?", choices: ["76", "77", "78", "79"], correct: "77" },
    { id: 2, text: "แม่น้ำที่ยาวที่สุดในประเทศไทยคือ?", choices: ["เจ้าพระยา", "โขง", "ชี", "ปิง"], correct: "ชี" },
    { id: 3, text: "สัตว์ชนิดใดเป็นสัญลักษณ์ของประเทศไทย?", choices: ["ช้าง", "เสือ", "สิงโต", "นกเงือก"], correct: "ช้าง" },
    { id: 4, text: "ปี พ.ศ. 2566 ตรงกับปี ค.ศ. ใด?", choices: ["2020", "2021", "2022", "2023"], correct: "2023" },
    { id: 5, text: "เมืองหลวงของประเทศไทยคือ?", choices: ["เชียงใหม่", "นครราชสีมา", "กรุงเทพมหานคร", "ภูเก็ต"], correct: "กรุงเทพมหานคร" }
];

const timeLimit = 60; // กำหนดเวลา 60 วินาที
let timeLeft = timeLimit;
let score = 0;
let timerInterval;
let userAnswers = {};

// ฟังก์ชันเริ่มต้นควิซ
function startQuiz() {
    document.getElementById("startQuiz").classList.add("hidden");
    document.getElementById("quizContainer").classList.remove("hidden");

    timeLeft = timeLimit;
    document.getElementById("timeLeft").textContent = timeLeft;
    timerInterval = setInterval(updateTimer, 1000);

    displayQuestions();
}

// ฟังก์ชันแสดงคำถาม
function displayQuestions() {
    const questionContainer = document.getElementById("questionContainer");
    questionContainer.innerHTML = "";

    quizData.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.innerHTML = `<p>${index + 1}. ${q.text}</p>`;
        
        q.choices.forEach(choice => {
            questionDiv.innerHTML += `
                <input type="radio" name="q${q.id}" value="${choice}" onclick="selectAnswer(${q.id}, '${choice}')">
                <label>${choice}</label><br>
            `;
        });

        questionContainer.appendChild(questionDiv);
    });
}

// ฟังก์ชันเลือกคำตอบ
function selectAnswer(questionId, answer) {
    userAnswers[questionId] = answer;
}

// ฟังก์ชันนับถอยหลังเวลา
function updateTimer() {
    timeLeft--;
    document.getElementById("timeLeft").textContent = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        submitQuiz();
    }
}

// ฟังก์ชันส่งคำตอบและคำนวณคะแนน
function submitQuiz() {
    clearInterval(timerInterval);
    let correctAnswers = 0;

    quizData.forEach(q => {
        if (userAnswers[q.id] === q.correct) {
            correctAnswers++;
        }
    });

    score = (correctAnswers / quizData.length) * 100;
    document.getElementById("score").textContent = `คุณได้คะแนน ${score}%`;

    document.getElementById("quizContainer").classList.add("hidden");
    document.getElementById("resultContainer").classList.remove("hidden");
}

// ฟังก์ชันเริ่มทำแบบทดสอบใหม่
function restartQuiz() {
    document.getElementById("resultContainer").classList.add("hidden");
    document.getElementById("startQuiz").classList.remove("hidden");
    userAnswers = {};
    score = 0;
}

document.getElementById("startQuiz").addEventListener("click", startQuiz);
document.getElementById("submitQuiz").addEventListener("click", submitQuiz);
document.getElementById("restartQuiz").addEventListener("click", restartQuiz);
