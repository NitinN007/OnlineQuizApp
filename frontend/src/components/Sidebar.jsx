// Sidebar.jsx
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import quizApi from "../services/quizApi";
import { useNavigate } from "react-router-dom";
import {
  Code,
  Coffee,
  Cpu,
  Database,
  Globe,
  Layout,
  Star,
  Target,
  Terminal,
  Zap,
  LogIn,
  LogOut,
} from "lucide-react";

const API_BASE = "http://localhost:4000";
const QUIZ_DURATION = 60; // 1 minute in seconds

export default function Sidebar() {
  const navigate = useNavigate();

  const [selectedTech, setSelectedTech] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // ✅ Sidebar open/close
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(QUIZ_DURATION);
  const [isQuizActive, setIsQuizActive] = useState(false);

  // ✅ Login state
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("authToken"));

  const submittedRef = useRef(false);

  // ✅ RESPONSIVE SIDEBAR
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ keep auth state updated
  useEffect(() => {
    const syncAuth = () => setLoggedIn(!!localStorage.getItem("authToken"));

    window.addEventListener("storage", syncAuth);
    window.addEventListener("authchanged", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("authchanged", syncAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.clear();

    window.dispatchEvent(
      new CustomEvent("authchanged", { detail: { user: null } })
    );

    setLoggedIn(false);
    toast.success("Logged out!");

    setIsSidebarOpen(false);
    navigate("/login");
  };

  // ✅ TIMER
  useEffect(() => {
    let interval;

    if (isQuizActive && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0 && isQuizActive) {
      setShowResults(true);
      setIsQuizActive(false);
      toast.info("Time's up! Your quiz has been submitted.");
    }

    return () => clearInterval(interval);
  }, [isQuizActive, timer]);

  // TECHNOLOGIES
  const technologies = [
    { id: "html", name: "HTML", icon: <Globe size={18} /> },
    { id: "css", name: "CSS", icon: <Layout size={18} /> },
    { id: "js", name: "JavaScript", icon: <Code size={18} /> },
    { id: "react", name: "React", icon: <Cpu size={18} /> },
    { id: "node", name: "Node.js", icon: <Code size={18} /> },
    { id: "mongodb", name: "MongoDB", icon: <Database size={18} /> },
    { id: "java", name: "Java", icon: <Coffee size={18} /> },
    { id: "python", name: "Python", icon: <Terminal size={18} /> },
    { id: "cpp", name: "C++", icon: <Code size={18} /> },
  ];

  const levels = [
    { id: "basic", name: "Basic", icon: <Star size={18} /> },
    { id: "intermediate", name: "Intermediate", icon: <Zap size={18} /> },
    { id: "advanced", name: "Advanced", icon: <Target size={18} /> },
  ];

  // HELPERS
  const getQuestions = () => questions;

  const calculateScore = () => {
    const currentQuestions = getQuestions();
    let correct = 0;

    currentQuestions.forEach((q, i) => {
      if (userAnswers[i] === q.correctAnswer) correct++;
    });

    return {
      correct,
      total: currentQuestions.length,
      percentage: currentQuestions.length
        ? Math.round((correct / currentQuestions.length) * 100)
        : 0,
    };
  };

  // Fetch questions when tech and level selected
  useEffect(() => {
    if (selectedTech && selectedLevel) fetchQuestions();
    // eslint-disable-next-line
  }, [selectedTech, selectedLevel]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await quizApi.getQuestions(selectedTech, selectedLevel);

      if (response.success) {
        setQuestions(response.questions);
        setCurrentQuestion(0);
        setUserAnswers({});
        setShowResults(false);
        setTimer(QUIZ_DURATION);
        setIsQuizActive(true);

        toast.success(`Loaded ${response.questions.length} questions`);
      } else {
        toast.error("Failed to load questions: " + response.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Error: " + (error.message || "Failed to load questions"));
    } finally {
      setLoading(false);
    }
  };

  const score = calculateScore();
  const currentQuestions = getQuestions();
  const currentQ = currentQuestions[currentQuestion];

  const handleAnswerSelect = (index) => {
    setUserAnswers({ ...userAnswers, [currentQuestion]: index });

    setTimeout(() => {
      if (currentQuestion < currentQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setShowResults(true);
      }
    }, 400);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    submittedRef.current = false;
    setIsQuizActive(false);
    setTimer(QUIZ_DURATION);
  };

  // SUBMIT RESULT
  const getAuthHeader = () => {
    const token = localStorage.getItem("authToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const submitResult = async () => {
    if (submittedRef.current) return;
    submittedRef.current = true;

    try {
      await axios.post(
        `${API_BASE}/api/result`,
        {
          title: `${selectedTech}-${selectedLevel}`,
          technology: selectedTech,
          level: selectedLevel,
          totalQuestions: score.total,
          correct: score.correct,
          wrong: score.total - score.correct,
        },
        { headers: getAuthHeader() }
      );
      toast.success("Result saved successfully!");
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Failed to save result");
      submittedRef.current = false;
    }

    setIsQuizActive(false);
  };

  useEffect(() => {
    if (showResults) submitResult();
    // eslint-disable-next-line
  }, [showResults]);

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* ✅ MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-[60] bg-white/90 backdrop-blur-md shadow px-3 py-3 flex items-center justify-between gap-2">
        <p className="font-bold text-gray-800 truncate">
          {selectedTech ? `Quiz - ${selectedTech.toUpperCase()}` : "Quiz"}
        </p>

        <div className="flex items-center gap-2">
          {/* ✅ login/logout in topbar */}
          {!loggedIn ? (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-1 bg-blue-600 text-white px-3 py-2 rounded-lg shadow text-sm"
            >
              <LogIn size={16} /> Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 bg-red-500 text-white px-3 py-2 rounded-lg shadow text-sm"
            >
              <LogOut size={16} /> Logout
            </button>
          )}

          <button
            onClick={() => setIsSidebarOpen(true)}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg shadow text-sm"
          >
            ☰ Menu
          </button>
        </div>
      </div>

      {/* ✅ Overlay for mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* ✅ SIDEBAR DRAWER */}
      <aside
        className={`fixed md:static top-0 left-0 z-50 h-full md:h-auto w-72 md:w-64 bg-white shadow-lg p-4 transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-4 md:hidden">
          <h2 className="font-bold text-lg">Menu</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-2xl font-bold text-gray-700"
          >
            ✖
          </button>
        </div>

        <h2 className="font-bold mb-4 hidden md:block">Technologies</h2>

        {/* Technologies */}
        {technologies.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setSelectedTech(t.id);
              setSelectedLevel(null);
              resetQuiz();
              if (window.innerWidth < 768) setIsSidebarOpen(false);
            }}
            className={`flex items-center gap-2 w-full mb-2 p-2 rounded transition-all duration-200 ${
              selectedTech === t.id
                ? "bg-blue-600 text-white shadow-md"
                : "hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            {t.icon} {t.name}
          </button>
        ))}

        {/* Levels */}
        {selectedTech && (
          <>
            <h3 className="mt-6 font-semibold">Levels</h3>

            {levels.map((l) => (
              <button
                key={l.id}
                onClick={() => {
                  setSelectedLevel(l.id);
                  resetQuiz();
                  if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
                className={`flex items-center gap-2 w-full mt-2 p-2 rounded transition-all duration-200 ${
                  selectedLevel === l.id
                    ? "bg-green-600 text-white shadow-md"
                    : "hover:bg-green-50 hover:text-green-600"
                }`}
              >
                {l.icon} {l.name}
              </button>
            ))}
          </>
        )}

        {/* ✅ Login/Logout inside drawer bottom (extra good UX) */}
        <div className="mt-8 border-t pt-4 md:hidden">
          {!loggedIn ? (
            <button
              onClick={() => {
                setIsSidebarOpen(false);
                navigate("/login");
              }}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              <LogIn size={18} /> Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              <LogOut size={18} /> Logout
            </button>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 sm:p-6 pt-24 md:pt-6">
        {!selectedTech || !selectedLevel ? (
          <div className="h-full flex items-center justify-center">
            <div className="max-w-2xl w-full text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 leading-tight">
                Start the Quiz
              </h1>

              <p className="text-base sm:text-xl text-gray-600 mb-2">
                Challenge yourself with our comprehensive quiz
              </p>

              <p className="text-sm sm:text-lg text-gray-500">
                Select a technology and difficulty level to begin
              </p>

              <div className="mt-10">
                <p className="text-gray-600 text-base sm:text-lg">
                  📱 On mobile tap <b>Menu</b> to choose technology
                </p>
              </div>
            </div>
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg">Loading questions...</p>
          </div>
        ) : showResults ? (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
            <div className="max-w-2xl w-full">
              <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12">
                <div className="text-center mb-8">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    Quiz Completed!
                  </h1>
                  <p className="text-gray-500 text-base sm:text-lg">
                    Great job finishing the quiz
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-green-50 rounded-xl p-5 border-2 border-green-200">
                    <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">
                      Correct
                    </p>
                    <p className="text-3xl sm:text-4xl font-bold text-green-600 mt-2">
                      {score.correct}
                    </p>
                  </div>

                  <div className="bg-red-50 rounded-xl p-5 border-2 border-red-200">
                    <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">
                      Wrong
                    </p>
                    <p className="text-3xl sm:text-4xl font-bold text-red-600 mt-2">
                      {score.total - score.correct}
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white mb-8 shadow-lg text-center">
                  <p className="text-blue-100 text-sm font-semibold uppercase tracking-wide mb-3">
                    Total Score
                  </p>
                  <p className="text-5xl font-bold">
                    {score.correct}/{score.total}
                  </p>
                  <p className="text-3xl font-bold mt-3">{score.percentage}%</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={resetQuiz}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Try Again
                  </button>

                  <button
                    onClick={() => {
                      setSelectedTech(null);
                      setSelectedLevel(null);
                      resetQuiz();
                    }}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 hover:shadow-lg transition-all duration-300"
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          currentQ && (
            <div className="bg-white p-5 sm:p-6 rounded-xl shadow">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                <h3 className="font-semibold text-base sm:text-lg">
                  Q{currentQuestion + 1}. {currentQ.question}
                </h3>

                <div className="text-base sm:text-lg font-semibold">
                  Time: {Math.floor(timer / 60)}:{("0" + (timer % 60)).slice(-2)}
                </div>
              </div>

              {currentQ.options.map((opt, i) => {
                const isSelected = userAnswers[currentQuestion] === i;
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswerSelect(i)}
                    className={`block w-full text-left p-4 mb-3 rounded-lg border transition-all duration-300 ${
                      isSelected
                        ? "bg-blue-100 border-blue-500 shadow"
                        : "bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-400 hover:shadow-md active:scale-[0.98]"
                    }`}
                  >
                    <span className="font-semibold mr-3">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          )
        )}
      </main>
    </div>
  );
}
