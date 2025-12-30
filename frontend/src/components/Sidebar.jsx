// Sidebar.jsx
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import quizApi from "../services/quizApi";
import {
  Award,
  BookOpen,
  Code,
  Coffee,
  Cpu,
  Database,
  Globe,
  Layout,
  Sparkles,
  Star,
  Target,
  Terminal,
  Trophy,
  Zap,
} from "lucide-react";

const API_BASE = "http://localhost:4000";

export default function Sidebar() {
  const [selectedTech, setSelectedTech] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const submittedRef = useRef(false);

  // RESPONSIVE SIDEBAR
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // TECHNOLOGIES
  const technologies = [
    { id: "html", name: "HTML", icon: <Globe /> },
    { id: "css", name: "CSS", icon: <Layout /> },
    { id: "js", name: "JavaScript", icon: <Code /> },
    { id: "react", name: "React", icon: <Cpu /> },
    { id: "node", name: "Node.js", icon: <Code /> },
    { id: "mongodb", name: "MongoDB", icon: <Database /> },
    { id: "java", name: "Java", icon: <Coffee /> },
    { id: "python", name: "Python", icon: <Terminal /> },
    { id: "cpp", name: "C++", icon: <Code /> },
  ];

  const levels = [
    { id: "basic", name: "Basic", icon: <Star /> },
    { id: "intermediate", name: "Intermediate", icon: <Zap /> },
    { id: "advanced", name: "Advanced", icon: <Target /> },
  ];

  // HELPERS
  const getQuestions = () => {
    return questions;
  };

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

  // Fetch questions when tech and level are selected
  useEffect(() => {
    if (selectedTech && selectedLevel) {
      fetchQuestions();
    }
  }, [selectedTech, selectedLevel]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      console.log("Fetching questions for:", selectedTech, selectedLevel);
      const response = await quizApi.getQuestions(selectedTech, selectedLevel);
      console.log("Response:", response);
      if (response.success) {
        setQuestions(response.questions);
        setCurrentQuestion(0);
        setUserAnswers({});
        setShowResults(false);
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

  // EVENTS
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
        `${API_BASE}/api/results`,
        {
          technology: selectedTech,
          level: selectedLevel,
          total: score.total,
          correct: score.correct,
          percentage: score.percentage,
        },
        { headers: getAuthHeader() }
      );
      toast.success("Result saved");
    } catch (err) {
      toast.error("Result not saved");
      submittedRef.current = false;
    }
  };

  useEffect(() => {
    if (showResults) submitResult();
  }, [showResults]);

  // UI
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      {isSidebarOpen && (
        <aside className="w-64 bg-white shadow-lg p-4">
          <h2 className="font-bold mb-4">Technologies</h2>
          {technologies.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setSelectedTech(t.id);
                setSelectedLevel(null);
                resetQuiz();
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

          {selectedTech && (
            <>
              <h3 className="mt-6 font-semibold">Levels</h3>
              {levels.map((l) => (
                <button
                  key={l.id}
                  onClick={() => {
                    setSelectedLevel(l.id);
                    resetQuiz();
                  }}
                  className={`block w-full mt-2 p-2 rounded transition-all duration-200 ${
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
        </aside>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">
        {!selectedTech || !selectedLevel ? (
          <div className="h-full flex items-center justify-center">
            <div className="max-w-2xl w-full text-center">
              {/* Welcome Section */}
              <div className="mb-12">
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 leading-tight">
                  Start the Quiz
                </h1>
                <p className="text-xl text-gray-600 mb-2">Challenge yourself with our comprehensive quiz</p>
                <p className="text-lg text-gray-500">Select a technology and difficulty level to begin</p>
              </div>

              {/* Steps Guide */}
              <div className="grid grid-cols-2 gap-6 md:gap-8 mb-12">
                {/* Step 1 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-blue-100">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full mx-auto mb-4 text-xl font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Select Technology</h3>
                  <p className="text-gray-600">Choose from 9 different programming languages and technologies</p>
                  <div className="mt-4 flex justify-center">
                    <span className="text-3xl">💻</span>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-green-100">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded-full mx-auto mb-4 text-xl font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Select Level</h3>
                  <p className="text-gray-600">Pick your difficulty: Basic, Intermediate, or Advanced</p>
                  <div className="mt-4 flex justify-center">
                    <span className="text-3xl">📚</span>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-purple-100 col-span-2 md:col-span-1">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-600 text-white rounded-full mx-auto mb-4 text-xl font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Answer Questions</h3>
                  <p className="text-gray-600">Test your knowledge with curated questions</p>
                  <div className="mt-4 flex justify-center">
                    <span className="text-3xl">🎯</span>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-pink-100 col-span-2 md:col-span-1">
                  <div className="flex items-center justify-center w-12 h-12 bg-pink-600 text-white rounded-full mx-auto mb-4 text-xl font-bold">
                    4
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">View Results</h3>
                  <p className="text-gray-600">See your score and performance analysis</p>
                  <div className="mt-4 flex justify-center">
                    <span className="text-3xl">📊</span>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Take Our Quizzes?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✨</span>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">Wide Range</p>
                      <p className="text-sm text-gray-600">135+ questions across 9 technologies</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📈</span>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">Progressive Difficulty</p>
                      <p className="text-sm text-gray-600">3 levels: Basic, Intermediate, Advanced</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🏆</span>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">Track Progress</p>
                      <p className="text-sm text-gray-600">View detailed results and analytics</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-12 text-center">
                <p className="text-gray-600 text-lg mb-4">👈 Select a technology from the sidebar to get started!</p>
              </div>
            </div>
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg">Loading questions...</p>
          </div>
        ) : showResults ? (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-2xl w-full">
              {/* Main Results Card */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 animate-fade-in">
                {/* Header with Icon */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mb-4 shadow-lg transform hover:scale-110 transition-transform duration-300">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    Quiz Completed!
                  </h1>
                  <p className="text-gray-500 text-lg">Great job finishing the quiz</p>
                </div>

                {/* Score Display */}
                <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
                  {/* Correct Answers */}
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Correct</p>
                        <p className="text-3xl md:text-4xl font-bold text-green-600 mt-2">{score.correct}</p>
                      </div>
                      <div className="text-4xl">✓</div>
                    </div>
                  </div>

                  {/* Wrong Answers */}
                  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border-2 border-red-200 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Wrong</p>
                        <p className="text-3xl md:text-4xl font-bold text-red-600 mt-2">{score.total - score.correct}</p>
                      </div>
                      <div className="text-4xl">✗</div>
                    </div>
                  </div>
                </div>

                {/* Total Score Card */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-8 text-white mb-8 shadow-lg">
                  <div className="text-center">
                    <p className="text-blue-100 text-sm font-semibold uppercase tracking-wide mb-3">Total Score</p>
                    <div className="flex items-center justify-center gap-6">
                      <div>
                        <p className="text-5xl md:text-6xl font-bold">{score.correct}/{score.total}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-blue-100 text-sm mb-2">Percentage</p>
                        <p className="text-4xl md:text-5xl font-bold">{score.percentage}%</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                  <p className="text-gray-600 text-sm font-semibold mb-3">Performance</p>
                  <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-1000 ease-out"
                      style={{ width: `${score.percentage}%` }}
                    />
                  </div>
                  <p className="text-right text-gray-500 text-xs mt-2">{score.percentage}% complete</p>
                </div>

                {/* Performance Message */}
                <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-8">
                  <p className="text-blue-900 font-semibold">
                    {score.percentage === 100
                      ? "🌟 Perfect Score! You're a master!"
                      : score.percentage >= 80
                      ? "🎉 Excellent! You did great!"
                      : score.percentage >= 60
                      ? "👍 Good job! Keep practicing!"
                      : "💪 Keep practicing to improve!"}
                  </p>
                </div>

                {/* Quiz Details */}
                <div className="bg-gray-50 rounded-lg p-4 mb-8">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-gray-600 text-sm font-semibold">Technology</p>
                      <p className="text-lg font-bold text-gray-900 mt-1 capitalize">{selectedTech}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm font-semibold">Level</p>
                      <p className="text-lg font-bold text-gray-900 mt-1 capitalize">{selectedLevel}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm font-semibold">Questions</p>
                      <p className="text-lg font-bold text-gray-900 mt-1">{score.total}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={resetQuiz}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Try Again
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTech(null);
                      setSelectedLevel(null);
                      resetQuiz();
                    }}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          currentQ && (
            <div className="bg-white p-6 rounded shadow">
              <h3 className="font-semibold mb-4">
                Q{currentQuestion + 1}. {currentQ.question}
              </h3>
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
