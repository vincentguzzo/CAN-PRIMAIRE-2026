import React, { useEffect, useMemo, useRef, useState } from "react";

const QUIZ_DURATION_SECONDS = 10 * 60;
const SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbw7PSm4sB4nj-u6N6pAz_JeCBNdyLyWC4CTTKpL5scKP0_UrQmqrMwjHA0D_Gyrbqa5/exec";

function driveImage(fileId) {
  return `https://lh3.googleusercontent.com/d/${fileId}=w1200`;
}


const QUESTIONS_CE1 = [
  { id: "ce1-1", imageUrl: "/questions/CE1_01.png", correctAnswer: "65" },
  { id: "ce1-2", imageUrl: "/questions/CE1_02.png", correctAnswer: "70" },
  { id: "ce1-3", imageUrl: "/questions/CE1_03.png", correctAnswer: "293" },
  { id: "ce1-4", imageUrl: "/questions/CE1_04.png", correctAnswer: "47" },
  { id: "ce1-5", imageUrl: "/questions/CE1_05.png", correctAnswer: "158" },
  { id: "ce1-6", imageUrl: "/questions/CE1_06.png", correctAnswer: "39" },
  { id: "ce1-7", imageUrl: "/questions/CE1_07.png", correctAnswer: "243" },
  { id: "ce1-8", imageUrl: "/questions/CE1_08.png", correctAnswer: "57" },
  { id: "ce1-9", imageUrl: "/questions/CE1_09.png", correctAnswer: "48" },
  { id: "ce1-10", imageUrl: "/questions/CE1_10.png", correctAnswer: "18" },
  { id: "ce1-11", imageUrl: "/questions/CE1_11.png", correctAnswer: "50" },
  { id: "ce1-12", imageUrl: "/questions/CE1_12.png", correctAnswer: "710" },
  { id: "ce1-13", imageUrl: "/questions/CE1_13.png", correctAnswer: "99" },
  { id: "ce1-14", imageUrl: "/questions/CE1_14.png", correctAnswer: "B" },
  { id: "ce1-15", imageUrl: "/questions/CE1_15.png", correctAnswer: "7" },
  { id: "ce1-16", imageUrl: "/questions/CE1_16.png", correctAnswer: "A" },
  { id: "ce1-17", imageUrl: "/questions/CE1_17.png", correctAnswer: "10h45" },
  { id: "ce1-18", imageUrl: "/questions/CE1_18.png", correctAnswer: "21" },
  { id: "ce1-19", imageUrl: "/questions/CE1_19.png", correctAnswer: "24" },
  { id: "ce1-20", imageUrl: "/questions/CE1_20.png", correctAnswer: "92" },
];

const QUESTIONS_CE2 = [
  { id: "ce2-1", imageUrl: "/questions/CE2_01.png", correctAnswer: "32" },
  { id: "ce2-2", imageUrl: "/questions/CE2_02.png", correctAnswer: "205" },
  { id: "ce2-3", imageUrl: "/questions/CE2_03.png", correctAnswer: "230" },
  { id: "ce2-4", imageUrl: "/questions/CE2_04.png", correctAnswer: "mai" },
  { id: "ce2-5", imageUrl: "/questions/CE2_05.png", correctAnswer: "29" },
  { id: "ce2-6", imageUrl: "/questions/CE2_06.png", correctAnswer: "75" },
  { id: "ce2-7", imageUrl: "/questions/CE2_07.png", correctAnswer: "A" },
  { id: "ce2-8", imageUrl: "/questions/CE2_08.png", correctAnswer: "110" },
  { id: "ce2-9", imageUrl: "/questions/CE2_09.png", correctAnswer: { anyOf: ["2048", "2 048"] } },
  { id: "ce2-10", imageUrl: "/questions/CE2_10.png", correctAnswer: "22" },
  { id: "ce2-11", imageUrl: "/questions/CE2_11.png", correctAnswer: "9" },
  { id: "ce2-12", imageUrl: "/questions/CE2_12.png", correctAnswer: "13" },
  { id: "ce2-13", imageUrl: "/questions/CE2_13.png", correctAnswer: "456" },
  { id: "ce2-14", imageUrl: "/questions/CE2_14.png", correctAnswer: "9" },
  { id: "ce2-15", imageUrl: "/questions/CE2_15.png", correctAnswer: "430" },
  { id: "ce2-16", imageUrl: "/questions/CE2_16.png", correctAnswer: "1200" },
  { id: "ce2-17", imageUrl: "/questions/CE2_17.png", correctAnswer: "520" },
  { id: "ce2-18", imageUrl: "/questions/CE2_18.png", correctAnswer: "121" },
  { id: "ce2-19", imageUrl: "/questions/CE2_19.png", correctAnswer: "22" },
  { id: "ce2-20", imageUrl: "/questions/CE2_20.png", correctAnswer: "27" },
];


const QUESTIONS_CM1 = [
  { id: "cm1-1", imageUrl: "/questions/CM1_01.png", correctAnswer: "56" },
  { id: "cm1-2", imageUrl: "/questions/CM1_02.png", correctAnswer: "28" },
  { id: "cm1-3", imageUrl: "/questions/CM1_03.png", correctAnswer: "127" },
  { id: "cm1-4", imageUrl: "/questions/CM1_04.png", correctAnswer: "386" },
  { id: "cm1-5", imageUrl: "/questions/CM1_05.png", correctAnswer: "4800" },
  { id: "cm1-6", imageUrl: "/questions/CM1_06.png", correctAnswer: "460" },
  { id: "cm1-7", imageUrl: "/questions/CM1_07.png", correctAnswer: "3075" },
  { id: "cm1-8", imageUrl: "/questions/CM1_08.png", correctAnswer: "14" },
  { id: "cm1-9", imageUrl: "/questions/CM1_09.png", correctAnswer: "10" },
  { id: "cm1-10", imageUrl: "/questions/CM1_10.png", correctAnswer: "8" },
  { id: "cm1-11", imageUrl: "/questions/CM1_11.png", correctAnswer: "6" },

  // formats multiples (temps)
  { id: "cm1-12", imageUrl: "/questions/CM1_12.png", correctAnswer: { anyOf: ["1h40", "1h40min"] } },

  { id: "cm1-13", imageUrl: "/questions/CM1_13.png", correctAnswer: "13h25" },
  { id: "cm1-14", imageUrl: "/questions/CM1_14.png", correctAnswer: "13" },
  { id: "cm1-15", imageUrl: "/questions/CM1_15.png", correctAnswer: "3/5" },
  { id: "cm1-16", imageUrl: "/questions/CM1_16.png", correctAnswer: "13.7" },
  { id: "cm1-17", imageUrl: "/questions/CM1_17.png", correctAnswer: "16" },
  { id: "cm1-18", imageUrl: "/questions/CM1_18.png", correctAnswer: "4" },
  { id: "cm1-19", imageUrl: "/questions/CM1_19.png", correctAnswer: "8" },
  { id: "cm1-20", imageUrl: "/questions/CM1_20.png", correctAnswer: "203" },
  { id: "cm1-21", imageUrl: "/questions/CM1_21.png", correctAnswer: "1/2" },
  { id: "cm1-22", imageUrl: "/questions/CM1_22.png", correctAnswer: "3.5" },
  { id: "cm1-23", imageUrl: "/questions/CM1_23.png", correctAnswer: "210" },
  { id: "cm1-24", imageUrl: "/questions/CM1_24.png", correctAnswer: "1.75" },
  { id: "cm1-25", imageUrl: "/questions/CM1_25.png", correctAnswer: "7000" },
  { id: "cm1-26", imageUrl: "/questions/CM1_26.png", correctAnswer: "A" },
  { id: "cm1-27", imageUrl: "/questions/CM1_27.png", correctAnswer: "15" },
  { id: "cm1-28", imageUrl: "/questions/CM1_28.png", correctAnswer: "18" },
  { id: "cm1-29", imageUrl: "/questions/CM1_29.png", correctAnswer: "30" },

  // ordre libre (7 et 3 ou 3 et 7)
  { id: "cm1-30", imageUrl: "/questions/CM1_30.png", correctAnswer: { anyOf: ["7 et 3", "3 et 7"] } },
];


const QUESTIONS_CM2 = [
  { id: "cm2-1", imageUrl: "/questions/CM2_01.png", correctAnswer: "85" },
  { id: "cm2-2", imageUrl: "/questions/CM2_02.png", correctAnswer: "63" },
  { id: "cm2-3", imageUrl: "/questions/CM2_03.png", correctAnswer: "7" },
  { id: "cm2-4", imageUrl: "/questions/CM2_04.png", correctAnswer: "74" },
  { id: "cm2-5", imageUrl: "/questions/CM2_05.png", correctAnswer: "23" },
  { id: "cm2-6", imageUrl: "/questions/CM2_06.png", correctAnswer: "60" },
  { id: "cm2-7", imageUrl: "/questions/CM2_07.png", correctAnswer: "49" },
  { id: "cm2-8", imageUrl: "/questions/CM2_08.png", correctAnswer: "8" },
  { id: "cm2-9", imageUrl: "/questions/CM2_09.png", correctAnswer: "96" },
  { id: "cm2-10", imageUrl: "/questions/CM2_10.png", correctAnswer: "9" },
  { id: "cm2-11", imageUrl: "/questions/CM2_11.png", correctAnswer: "40" },
  { id: "cm2-12", imageUrl: "/questions/CM2_12.png", correctAnswer: "125" },
  { id: "cm2-13", imageUrl: "/questions/CM2_13.png", correctAnswer: "1/7" },
  { id: "cm2-14", imageUrl: "/questions/CM2_14.png", correctAnswer: "6030" },
  { id: "cm2-15", imageUrl: "/questions/CM2_15.png", correctAnswer: "6.04" },
  { id: "cm2-16", imageUrl: "/questions/CM2_16.png", correctAnswer: "3.5" },
  { id: "cm2-17", imageUrl: "/questions/CM2_17.png", correctAnswer: "12" },
  { id: "cm2-18", imageUrl: "/questions/CM2_18.png", correctAnswer: "9" },

  // ordre libre
  { id: "cm2-19", imageUrl: "/questions/CM2_19.png", correctAnswer: { anyOf: ["19 et 20", "20 et 19"] } },

  { id: "cm2-20", imageUrl: "/questions/CM2_20.png", correctAnswer: "B" },
  { id: "cm2-21", imageUrl: "/questions/CM2_21.png", correctAnswer: "7" },

  // formats multiples temps
  { id: "cm2-22", imageUrl: "/questions/CM2_22.png", correctAnswer: { anyOf: ["3h38", "3h38min"] } },

  { id: "cm2-23", imageUrl: "/questions/CM2_23.png", correctAnswer: "800" },
  { id: "cm2-24", imageUrl: "/questions/CM2_24.png", correctAnswer: "180" },
  { id: "cm2-25", imageUrl: "/questions/CM2_25.png", correctAnswer: "12" },
  { id: "cm2-26", imageUrl: "/questions/CM2_26.png", correctAnswer: "8" },
  { id: "cm2-27", imageUrl: "/questions/CM2_27.png", correctAnswer: "4" },
  { id: "cm2-28", imageUrl: "/questions/CM2_28.png", correctAnswer: "162" },

  { id: "cm2-29", imageUrl: "/questions/CM2_29.png", correctAnswer: { anyOf: ["4h25", "4h25min"] } },

  { id: "cm2-30", imageUrl: "/questions/CM2_30.png", correctAnswer: "2.8" },
];


const QUESTION_BANK = {
  "ce1": QUESTIONS_CE1,
  "ce2": QUESTIONS_CE2,
  "cm1": QUESTIONS_CM1,
  "cm2": QUESTIONS_CM2,
};

function normalizeAnswer(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/,/g, ".")
    .replace(/−/g, "-")
    .replace(/\s+/g, " ");
}

function extractNumbers(value) {
  const matches = normalizeAnswer(value).match(/-?\d+(?:\.\d+)?/g);
  return matches || [];
}

function answerContainsExpectedNumber(userAnswer, expectedAnswer) {
  const normalizedUser = normalizeAnswer(userAnswer);
  const expectedNumbers = extractNumbers(expectedAnswer);

  if (expectedNumbers.length === 0) {
    return false;
  }

  return expectedNumbers.every((number) => normalizedUser.includes(number));
}

function isCorrectSingle(userAnswer, expectedAnswer) {
  const normalizedUser = normalizeAnswer(userAnswer);
  const normalizedExpected = normalizeAnswer(expectedAnswer);
  const expectedHasNumber = extractNumbers(expectedAnswer).length > 0;

  if (expectedHasNumber) {
    return answerContainsExpectedNumber(userAnswer, expectedAnswer);
  }

  return normalizedUser === normalizedExpected;
}

function isCorrectAnswer(userAnswer, expectedAnswer) {
  if (typeof expectedAnswer === "string") {
    return isCorrectSingle(userAnswer, expectedAnswer);
  }

  if (expectedAnswer?.anyOf) {
    return expectedAnswer.anyOf.some((answer) => isCorrectSingle(userAnswer, answer));
  }

  if (expectedAnswer?.allOf) {
    return expectedAnswer.allOf.every((answer) => isCorrectSingle(userAnswer, answer));
  }

  return false;
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function computeScore(questions, lockedAnswers) {
  let score = 0;

  for (const question of questions) {
    const answer = lockedAnswers[question.id];
    if (!answer) continue;

    if (isCorrectAnswer(answer, question.correctAnswer)) {
      score += 1;
    }
  }

  return score;
}

async function saveResultToSheet(result) {
  try {
    const response = await fetch(SHEET_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(result),
    });

    const text = await response.text();
    console.log("Réponse Apps Script :", text);

    // succès → on supprime la sauvegarde locale
    localStorage.removeItem("pendingResult");

    return true;

  } catch (error) {
    console.error("Erreur envoi Sheet :", error);

    // sauvegarde locale
    localStorage.setItem("pendingResult", JSON.stringify(result));

    return false;
  }
}

function preloadImages(questions) {
  return Promise.all(
    questions.map(
      (question) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = question.imageUrl;
        })
    )
  );
}

export default function App() {
  const [step, setStep] = useState("setup");
  const [school, setSchool] = useState("");
  const [customSchool, setCustomSchool] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [level, setLevel] = useState("ce1");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [draftAnswers, setDraftAnswers] = useState({});
  const [lockedAnswers, setLockedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION_SECONDS);
  const [submittedAt, setSubmittedAt] = useState(null);

  const questions = useMemo(() => QUESTION_BANK[level] || [], [level]);
  const [isFinishing, setIsFinishing] = useState(false);
  const hasFinishedRef = useRef(false);
  const [sendSuccess, setSendSuccess] = useState(null);

  const [endTime, setEndTime] = useState(null);


useEffect(() => {
  if (step !== "quiz" || isFinishing) return;

  const interval = setInterval(() => {
    setTimeLeft((prev) => Math.max(prev - 1, 0));
  }, 1000);

  return () => clearInterval(interval);
}, [step, isFinishing]);


useEffect(() => {
  if (step === "quiz" && timeLeft === 0 && !isFinishing) {
    handleFinish(true, lockedAnswers);
  }
}, [timeLeft, step, isFinishing]);



useEffect(() => {
  if (step !== "quiz" || isFinishing || !endTime) return;

  const updateTimer = () => {
    const secondsRemaining = Math.max(
      0,
      Math.ceil((endTime - Date.now()) / 1000)
    );

    setTimeLeft(secondsRemaining);

    if (secondsRemaining === 0) {
      handleFinish(true, lockedAnswers);
    }
  };

  updateTimer(); // mise à jour immédiate

  const interval = setInterval(updateTimer, 250);

  return () => clearInterval(interval);
}, [step, endTime, isFinishing, lockedAnswers]);


  const currentQuestion = questions[currentIndex];
  const currentQuestionId = currentQuestion?.id;
  const isCurrentLocked = currentQuestionId ? Boolean(lockedAnswers[currentQuestionId]) : false;
  const score = useMemo(() => computeScore(questions, lockedAnswers), [questions, lockedAnswers]);
  const answeredCount = Object.keys(lockedAnswers).length;

async function startQuiz() {
  const finalSchool = school === "Autre" ? customSchool.trim() : school;

  if (!school) {
    alert("Veuillez choisir un établissement.");
    return;
  }

  if (school === "Autre" && !customSchool.trim()) {
    alert("Veuillez écrire le nom de l'établissement.");
    return;
  }

  if (!lastName.trim()) {
    alert("Veuillez écrire le nom de l'élève.");
    return;
  }

  if (!firstName.trim()) {
    alert("Veuillez écrire le prénom de l'élève.");
    return;
  }

try {
  await preloadImages(questions);
} catch (error) {
  alert("Certaines images n'ont pas pu être chargées. Vérifiez la connexion internet avant de commencer.");
  return;
}

  setDraftAnswers({});
  setLockedAnswers({});
  setCurrentIndex(0);
  setTimeLeft(QUIZ_DURATION_SECONDS);
  setSubmittedAt(null);
  setEndTime(Date.now() + QUIZ_DURATION_SECONDS * 1000);
  setSendSuccess(null);
  setStep("quiz");
}

  function lockCurrentAnswer() {
  if (!currentQuestionId) return;
  if (lockedAnswers[currentQuestionId]) return;

  const value = (draftAnswers[currentQuestionId] || "").trim();

  if (!value) {
    alert("Veuillez écrire une réponse avant de valider.");
    return;
  }

  const updatedLockedAnswers = {
    ...lockedAnswers,
    [currentQuestionId]: value,
  };

  setLockedAnswers(updatedLockedAnswers);

  // Si toutes les questions sont validées, on termine le quiz
  if (Object.keys(updatedLockedAnswers).length === questions.length) {
    handleFinish(false, updatedLockedAnswers);
    return;
  }

  // Chercher la prochaine question non validée après la question actuelle
  for (let i = currentIndex + 1; i < questions.length; i++) {
    if (!updatedLockedAnswers[questions[i].id]) {
      setCurrentIndex(i);
      return;
    }
  }

  // Si aucune question non validée après, chercher avant
  for (let i = 0; i < currentIndex; i++) {
    if (!updatedLockedAnswers[questions[i].id]) {
      setCurrentIndex(i);
      return;
    }
  }
}

  function handleDraftChange(questionId, value) {
    if (lockedAnswers[questionId]) return;

    setDraftAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  }

async function handleFinish(isAutomatic = false, answersToUse = lockedAnswers) {
  if (hasFinishedRef.current) return;

  hasFinishedRef.current = true;
  setIsFinishing(true);

const secondsUsed = isAutomatic
  ? QUIZ_DURATION_SECONDS
  : QUIZ_DURATION_SECONDS - timeLeft;

const resultData = {
  school: school === "Autre" ? customSchool.trim() : school,
  lastName,
  firstName,
  level,
  score: computeScore(questions, answersToUse),
  timeUsed: formatTime(secondsUsed),
};

  setSubmittedAt(new Date().toISOString());
  setSendSuccess(null);
  setStep("result");

  const success = await saveResultToSheet(resultData);
  setSendSuccess(success);

  console.log("Résultat élève", resultData);
}

function resetAll() {
  setSchool("");
  setCustomSchool("");
  setLastName("");
  setFirstName("");
  setLevel("ce1");
  setCurrentIndex(0);
  setDraftAnswers({});
  setLockedAnswers({});
  setTimeLeft(QUIZ_DURATION_SECONDS);
  setSubmittedAt(null);
  setStep("setup");
  hasFinishedRef.current = false;
  setIsFinishing(false);
  setSendSuccess(null);
}

  return (
   <div className="min-h-screen bg-slate-100 text-slate-900 p-4 md:p-8">

<div
  style={{
    position: "relative",
    width: "100%",
    background: "#dbeafe",
    borderBottom: "1px solid #e2e8f0",
    padding: "12px 16px",
    minHeight: "70px",
    display: "flex",
    alignItems: "center",
  }}
>
  {/* Logo */}
  <img
    src="/questions/logoCanP.png"
    alt="Logo CAN Primaire"
    style={{
      width: "120px",
      height: "auto",
      objectFit: "contain",
      display: "block",
    }}
  />

  {/* Titre centré */}
  <div
    style={{
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      fontWeight: "bold",
      fontSize: "28px",
      whiteSpace: "nowrap",
    }}
  >
    CAN Primaire 2026
  </div>

  {/* Chrono à droite */}
  <div
    style={{
      marginLeft: "auto",
      fontWeight: "900",
      fontSize: "24px",
    }}
  >
    {step === "quiz" ? formatTime(timeLeft) : ""}
  </div>
</div>


      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
         
          <div className="p-6 md:p-8 border-b border-slate-200 bg-slate-50">
           <h1 className="text-2xl md:text-3xl font-bold">
              {step === "quiz" || step === "result"
              ? `Questionnaire ${level.toUpperCase()}`
              : "CAN Primaire 2026"}
            </h1> 
            
            <p className="text-slate-600 mt-2">
              Finales CAN ZPO
            </p>

            
          </div>

{step === "setup" && (
  <div className="p-6 md:p-8 grid gap-6 max-w-2xl">
        
    <div>
      <label className="block text-sm font-semibold mb-2">Établissement</label>
      <select
        value={school}
        onChange={(e) => setSchool(e.target.value)}
        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400"
      >
        <option value="">Choisir un établissement</option>
        <option value="Antonine International School - Ajaltoun">Antonine International School - Ajaltoun</option>
        <option value="Antonine International school - Dekwaneh">Antonine International school - Dekwaneh</option>
        <option value="Collège Carmel Saint Joseph - Mechref">Collège Carmel Saint Joseph - Mechref</option>
        <option value="Collège Central des Moines Libanais - Jounieh">Collège Central des Moines Libanais - Jounieh</option>
        <option value="Collège de la Sagesse – Achrafieh">Collège de la Sagesse – Achrafieh</option>
        <option value="Collège de la Sagesse – Brasilia - Brasilia">Collège de la Sagesse – Brasilia - Brasilia</option>
        <option value="Collège des Apôtres - Jounieh">Collège des Apôtres - Jounieh</option>
        <option value="Collège des Filles de la Charité Dar En Nour - Btouratije">Collège des Filles de la Charité Dar En Nour - Btouratije</option>
        <option value="Collège des Pères Antonins – Baabda">Collège des Pères Antonins – Baabda</option>
        <option value="Collège des Saints Cœurs – Ain Najm">Collège des Saints Cœurs – Ain Najm</option>
        <option value="Collège des Saints Cœurs – Bet Chabab">Collège des Saints Cœurs – Bet Chabab</option>
        <option value="Collège des Saints Cœurs – Kfardebiane">Collège des Saints Cœurs – Kfardebiane</option>
        <option value="Collège des Saints Cœurs – Kfarhbab">Collège des Saints Cœurs – Kfarhbab</option>
        <option value="Collège des Saints Cœurs – Rassié - Zahlé">Collège des Saints Cœurs – Rassié - Zahlé</option>
        <option value="Collège des Saints Cœurs – Sioufi - Achrafieh">Collège des Saints Cœurs – Sioufi - Achrafieh</option>
        <option value="Collège des Sœurs Antonines - Mar Doumith">Collège des Sœurs Antonines - Mar Doumith</option>
        <option value="Collège des Sœurs Antonines - Nabatieh">Collège des Sœurs Antonines - Nabatieh</option>
        <option value="Collège du Sacré Cœur - Gemmayzé">Collège du Sacré Cœur - Gemmayzé</option>
        <option value="Collège Elysée - Hazmieh">Collège Elysée - Hazmieh</option>
        <option value="Collège Louise Wegmann - Badaro">Collège Louise Wegmann - Badaro</option>
        <option value="Collège Mar Antonios des Sœurs Antonines - Zgharta">Collège Mar Antonios des Sœurs Antonines - Zgharta</option>
        <option value="Collège Mariste – Champville - Aoukar">Collège Mariste – Champville - Aoukar</option>
        <option value="Collège Melkart - Louaizé">Collège Melkart - Louaizé</option>
        <option value="Collège Mesrobian - Bourj Hammoud">Collège Mesrobian - Bourj Hammoud</option>
        <option value="Collège Mont La Salle - Ain Saadé">Collège Mont La Salle - Ain Saadé</option>
        <option value="Collège Notre Dame de Jamhour">Collège Notre Dame de Jamhour</option>
        <option value="Collège Notre Dame de Louaizé">Collège Notre Dame de Louaizé</option>
        <option value="Collège Notre Dame de Lourdes – Jbeil">Collège Notre Dame de Lourdes – Jbeil</option>
        <option value="Collège Notre Dame de Nazareth - Achrafieh">Collège Notre Dame de Nazareth - Achrafieh</option>
        <option value="Collège Notre Dame des Frères - Furn Chebbak">Collège Notre Dame des Frères - Furn Chebbak</option>
        <option value="Collège Notre Dame des Sœurs Antonines - Hazmieh">Collège Notre Dame des Sœurs Antonines - Hazmieh</option>
        <option value="Collège Patriarcal Raboueh">Collège Patriarcal Raboueh</option>
        <option value="Collège Protestant Français - Beyrouth">Collège Protestant Français - Beyrouth</option>
        <option value="Collège Protestant Français Montana - Deek el Mehdi">Collège Protestant Français Montana - Deek el Mehdi</option>
        <option value="Collège Sainte Famille des Frères des Ecoles Chrétiennes - Deddeh">Collège Sainte Famille des Frères des Ecoles Chrétiennes - Deddeh</option>
        <option value="Collège Sainte Famille Française - Fanar">Collège Sainte Famille Française - Fanar</option>
        <option value="Collège Sainte Famille Française - Jounieh">Collège Sainte Famille Française - Jounieh</option>
        <option value="Collège Saint-Grégoire - Gemmayzé">Collège Saint-Grégoire - Gemmayzé</option>
        <option value="Collège St Joseph – Antoura">Collège St Joseph – Antoura</option>
        <option value="Dominicaines de Notre Dame de la Délivrande - Araya">Dominicaines de Notre Dame de la Délivrande - Araya</option>
        <option value="École AZM - Tripoli">École AZM - Tripoli</option>
        <option value="École des Sœurs de la Croix-Val Père Jacques - Jal El Dib">École des Sœurs de la Croix-Val Père Jacques - Jal El Dib</option>
        <option value="École du Saint Enfant Jésus, Besançon - Baabdate">École du Saint Enfant Jésus, Besançon - Baabdate</option>
        <option value="Ecole Sainte Anne des Soeurs de Besançon - Beyrouth">Ecole Sainte Anne des Soeurs de Besançon - Beyrouth</option>
        <option value="Ecole Zahret El Ihsan - Achrafieh">Ecole Zahret El Ihsan - Achrafieh</option>
        <option value="Grand Lycée Franco-Libanais - Achrafieh">Grand Lycée Franco-Libanais - Achrafieh</option>
        <option value="Institut Moderne du Liban - Fanar">Institut Moderne du Liban - Fanar</option>
        <option value="International Collège - Beyrouth">International Collège - Beyrouth</option>
        <option value="L’Athénée de Beyrouth - Bsalim">L’Athénée de Beyrouth - Bsalim</option>
        <option value="Lycée Abdallah Rassi - Halba">Lycée Abdallah Rassi - Halba</option>
        <option value="Lycée Abdel Kader - Beyrouth">Lycée Abdel Kader - Beyrouth</option>
        <option value="Lycée Alphonse de Lamartine – Tripoli">Lycée Alphonse de Lamartine – Tripoli</option>
        <option value="Lycée Célestin Freinet - Saida">Lycée Célestin Freinet - Saida</option>
        <option value="Lycée Charlemagne - Roumieh">Lycée Charlemagne - Roumieh</option>
        <option value="Lycée Charles de Gaulle – Damas">Lycée Charles de Gaulle – Damas</option>
        <option value="Lycée des Pères Antonins - Baabda">Lycée des Pères Antonins - Baabda</option>
        <option value="Lycée Français International Elite – Beyrouth - Beyrouth">Lycée Français International Elite – Beyrouth - Beyrouth</option>
        <option value="Lycée Français International Elite – Tyr">Lycée Français International Elite – Tyr</option>
        <option value="Lycée Français International Marcel Pagnol - Adonis">Lycée Français International Marcel Pagnol - Adonis</option>
        <option value="Lycée Franco-Libanais – Habbouche - Nabatieh">Lycée Franco-Libanais – Habbouche - Nabatieh</option>
        <option value="Lycée Franco-Libanais – Nahr Ibrahim">Lycée Franco-Libanais – Nahr Ibrahim</option>
        <option value="Lycée Franco-Libanais – Verdun - Beyrouth">Lycée Franco-Libanais – Verdun - Beyrouth</option>
        <option value="Lycée Makassed Khadija El Kobra - Beyrouth">Lycée Makassed Khadija El Kobra - Beyrouth</option>
        <option value="Lycée Montaigne - Bet Chabab">Lycée Montaigne - Bet Chabab</option>
        <option value="Makassed Houssam Eddine Hariri - Saida">Makassed Houssam Eddine Hariri - Saida</option>
        <option value="Paradis d'enfants - Haret Sakher">Paradis d'enfants - Haret Sakher</option>
        <option value="Paradis d'enfants - Adma">Paradis d'enfants - Adma</option>
        <option value="Saint François Xavier des Sœurs des Saints-Cœurs - Hadat">Saint François Xavier des Sœurs des Saints-Cœurs - Hadat</option>
        <option value="Shouf National Collège – Chouf">Shouf National Collège – Chouf</option>
        <option value="Autre">Autre</option>
      </select>
    </div>

    {school === "Autre" && (
      <div>
        <label className="block text-sm font-semibold mb-2">Nom de l'établissement</label>
        <input
          type="text"
          value={customSchool}
          onChange={(e) => setCustomSchool(e.target.value)}
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400"
          placeholder="Écrire le nom de l'établissement"
        />
      </div>
    )}

    <div>
      <label className="block text-sm font-semibold mb-2">Nom</label>
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400"
        placeholder="Nom de l'élève"
      />
    </div>

    <div>
      <label className="block text-sm font-semibold mb-2">Prénom</label>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400"
        placeholder="Prénom de l'élève"
      />
    </div>

    <div>
      <label className="block text-sm font-semibold mb-2">Niveau</label>
      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400"
      >
      <option value="ce1">CE1</option>
      <option value="ce2">CE2</option>
      <option value="cm1">CM1</option>
      <option value="cm2">CM2</option>
      </select>
    </div>

    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-900">
      <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
        <li>20 questions pour les CE1 et CE2.</li>
        <li>30 questions pour les CM1 et CM2.</li>
        <li>Temps maximum autorisé : 10 minutes.</li>
        <li>Pour les fractions, utilisez la barre "/" comme par exemple 1/2.</li>
        <li> </li>
        <li>Vous pouvez passer une question et y revenir plus tard.</li>
        <li>Dès qu'une réponse est validée, la question est verrouillée.</li>
        <li>Chaque bonne réponse vaut 1 point.</li>
      </ul>
    </div>

    <div>
      <button
        onClick={startQuiz}
        className="rounded-2xl px-5 py-3 bg-slate-900 text-white font-semibold hover:bg-slate-700 transition"
      >
        Commencer
      </button>
    </div>
  </div>
)}

      
{step === "quiz" && currentQuestion && (
  <div className="p-5 md:p-8">
    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-4 md:p-6">
  <div
    style={{
      textAlign: "center",
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: timeLeft <= 30 ? "#dc2626" : "#0f172a"
    }}
>
  
</div>
      <div className="mb-5">

        <div
  className="grid grid-cols-5 gap-2 max-w-sm mx-auto"
  style={{ marginBottom: "30px" }}
>
  
          {questions.map((question, index) => {
            const locked = Boolean(lockedAnswers[question.id]);
            const active = index === currentIndex;

            return (
          <button
            key={question.id}
            onClick={() => setCurrentIndex(index)}
            className="h-11 rounded-xl border text-sm font-semibold transition"
            style={{
              backgroundColor: locked ? "#22c55e" : active ? "#0f172a" : "white",
              color: locked || active ? "white" : "#1f2937",
              borderColor: locked ? "#16a34a" : active ? "#0f172a" : "#cbd5e1",
              }}
          >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <img
          src={currentQuestion.imageUrl}
          alt={`Question ${currentIndex + 1}`}
          style={{
            maxWidth: "600px",
            width: "100%",
            height: "auto",
            display: "block",
            margin: "0 auto"
          }}
        />
      </div>

      <div className="mt-5">
        <label className="block text-sm font-semibold mb-2">Votre réponse</label>
        <div className="flex flex-col md:flex-row gap-3">
    <input
        type="text"
        value={lockedAnswers[currentQuestion.id] ?? draftAnswers[currentQuestion.id] ?? ""}
        onChange={(e) => handleDraftChange(currentQuestion.id, e.target.value)}
        disabled={isCurrentLocked}
        style={{
            width: "100%",
            padding: "20px",
            fontSize: "28px",
            fontWeight: "bold",
            textAlign: "center",
            borderRadius: "16px",
            border: "2px solid #94a3b8"
          }}
    />
          <button
            onClick={lockCurrentAnswer}
            disabled={isCurrentLocked}
            className="rounded-2xl px-5 py-3 bg-emerald-600 text-white font-semibold"
          >
            {isCurrentLocked ? "Réponse verrouillée" : "Valider"}
          </button>
        </div>
      </div>

      <div className="mt-5 flex gap-3 justify-center">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          className="rounded-2xl px-4 py-2 border"
        >
          ←
        </button>

        <button
          onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
          className="rounded-2xl px-4 py-2 border"
        >
          →
        </button>
      </div>

    </div>
  </div>
)}
          {step === "result" && (
            <div className="p-6 md:p-8 max-w-3xl">
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6">
                <h2 className="text-2xl font-bold">Résultat</h2>

{sendSuccess === null && (
  <p className="text-slate-600 font-semibold text-lg mt-2">
    Enregistrement du résultat en cours...
  </p>
)}

{sendSuccess === true && (
  <p className="text-green-600 font-semibold text-lg mt-2">
    Vos réponses ont bien été enregistrées ✅
  </p>
)}

{sendSuccess === false && (
  <p className="text-red-600 font-semibold text-lg mt-2">
    ⚠️ Problème de connexion. Résultat non envoyé.
  </p>
)}



                {sendSuccess === false && (
                  <div className="mt-4">
                    <p className="text-red-600 font-semibold">
                      ⚠️ Problème de connexion. Résultat non envoyé.
                    </p>

                  <button
                    onClick={async () => {
                    const stored = localStorage.getItem("pendingResult");
                    if (!stored) return;

                    const parsed = JSON.parse(stored);
                    const success = await saveResultToSheet(parsed);

                    if (success) setSendSuccess(true);
                  }}

      className="mt-2 px-4 py-2 bg-red-600 text-white rounded-xl"
    >
      Renvoyer le résultat
    </button>
  </div>
)}
                <div className="grid sm:grid-cols-2 gap-4 mt-5">
                  <div className="bg-white rounded-2xl border border-slate-200 p-4">
                    <div className="text-sm text-slate-500">Élève</div>
                    <div className="font-semibold text-lg">{firstName} {lastName}</div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 p-4">
                    <div className="text-sm text-slate-500">Niveau</div>
                    <div className="font-semibold text-lg">{level.toUpperCase()}</div>
                  </div>


                  

                  <div className="bg-white rounded-2xl border border-slate-200 p-4">
                    <div className="text-sm text-slate-500">Réponses validées</div>
                    <div className="font-semibold text-lg">
                      {answeredCount} / {questions.length}
                    </div>
                  </div>
                </div>

                <div className="text-sm text-slate-500 mt-5">
                  Heure de fin : {submittedAt ? new Date(submittedAt).toLocaleString() : "-"}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={resetAll}
                    className="rounded-2xl px-5 py-3 bg-slate-900 text-white font-semibold hover:bg-slate-700 transition"
                  >
                    Recommencer pour un autre élève
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}