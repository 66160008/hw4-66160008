const quizData = [
    { "id": 1, "text": "ประเทศไทยมีกี่จังหวัด?", "choices": ["76", "77", "78", "79"], "correct": "77" },
  { "id": 2, "text": "สัตว์ชนิดใดเป็นสัญลักษณ์ของประเทศไทย?", "choices": ["ช้าง", "เสือ", "สิงโต", "นกเงือก"], "correct": "ช้าง" },
  { "id": 3, "text": "แม่น้ำที่ยาวที่สุดในประเทศไทยคือ?", "choices": ["เจ้าพระยา", "โขง", "ชี", "ปิง"], "correct": "ชี" },
  { "id": 4, "text": "เมืองหลวงของประเทศไทยคือ?", "choices": ["เชียงใหม่", "นครราชสีมา", "กรุงเทพมหานคร", "ภูเก็ต"], "correct": "กรุงเทพมหานคร" },
  { "id": 5, "text": "ปี พ.ศ. 2566 ตรงกับปี ค.ศ. ใด?", "choices": ["2020", "2021", "2022", "2023"], "correct": "2023" },
  { "id": 6, "text": "ธงชาติไทยมีทั้งหมดกี่สี?", "choices": ["2", "3", "4", "5"], "correct": "3" },
  { "id": 7, "text": "อุทยานแห่งชาติแห่งแรกของไทยคือที่ไหน?", "choices": ["ดอยอินทนนท์", "เขาใหญ่", "เอราวัณ", "แก่งกระจาน"], "correct": "เขาใหญ่" },
  { "id": 8, "text": "จังหวัดใดใหญ่ที่สุดในประเทศไทย?", "choices": ["เชียงใหม่", "นครราชสีมา", "ขอนแก่น", "กาญจนบุรี"], "correct": "นครราชสีมา" },
  { "id": 9, "text": "ประเทศไทยใช้เงินสกุลอะไร?", "choices": ["บาท", "ดอลลาร์", "หยวน", "เยน"], "correct": "บาท" },
  { "id": 10, "text": "วันแม่แห่งชาติในประเทศไทยตรงกับวันใด?", "choices": ["1 ม.ค.", "12 ส.ค.", "5 ธ.ค.", "14 ก.พ."], "correct": "12 ส.ค." },
  { "id": 11, "text": "องค์ประกอบหลักของแก๊สในอากาศคืออะไร?", "choices": ["ออกซิเจน", "ไนโตรเจน", "คาร์บอนไดออกไซด์", "ฮีเลียม"], "correct": "ไนโตรเจน" },
  { "id": 12, "text": "สมองของมนุษย์มีซีกสมองกี่ซีก?", "choices": ["1", "2", "3", "4"], "correct": "2" },
  { "id": 13, "text": "ดาวเคราะห์ดวงใดอยู่ใกล้ดวงอาทิตย์มากที่สุด?", "choices": ["โลก", "ศุกร์", "พุธ", "อังคาร"], "correct": "พุธ" },
  { "id": 14, "text": "สัตว์ชนิดใดถือเป็นสัตว์เลี้ยงลูกด้วยนม?", "choices": ["จระเข้", "เต่า", "วาฬ", "นกกระจอก"], "correct": "วาฬ" },
  { "id": 15, "text": "ธาตุใดเป็นองค์ประกอบหลักของเหล็ก?", "choices": ["Fe", "Cu", "Al", "Zn"], "correct": "Fe" },
  { "id": 16, "text": "รหัสธาตุของน้ำคืออะไร?", "choices": ["O2", "H2O", "CO2", "N2"], "correct": "H2O" },
  { "id": 17, "text": "จังหวัดใดมีคำขวัญว่า 'หลวงพ่อโตใหญ่ วังน้ำเขียวสดใส'?", "choices": ["นครราชสีมา", "เชียงใหม่", "อุบลราชธานี", "นครปฐม"], "correct": "นครราชสีมา" },
  { "id": 18, "text": "พระมหากษัตริย์องค์ใดเป็นผู้ริเริ่มโครงการหลวง?", "choices": ["รัชกาลที่ 5", "รัชกาลที่ 7", "รัชกาลที่ 9", "รัชกาลที่ 10"], "correct": "รัชกาลที่ 9" },
  { "id": 19, "text": "ธงชาติสหรัฐอเมริกามีกี่แถบ?", "choices": ["10", "11", "13", "15"], "correct": "13" },
  { "id": 20, "text": "ใครคือผู้ประดิษฐ์หลอดไฟ?", "choices": ["นิโคลา เทสลา", "โธมัส เอดิสัน", "ไอน์สไตน์", "ไอแซก นิวตัน"], "correct": "โธมัส เอดิสัน" }
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
