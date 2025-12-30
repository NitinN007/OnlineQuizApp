# API Usage Examples

## Complete Reference for Quiz API

### 1. Fetch Technologies

**Request:**
```javascript
import quizApi from './services/quizApi';

const getTechs = async () => {
  try {
    const response = await quizApi.getTechnologies();
    console.log(response.technologies);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

**Response:**
```json
{
  "success": true,
  "technologies": [
    { "id": "html", "name": "HTML" },
    { "id": "css", "name": "CSS" },
    { "id": "js", "name": "JavaScript" },
    { "id": "react", "name": "React" },
    { "id": "node", "name": "Node.js" },
    { "id": "mongodb", "name": "MongoDB" },
    { "id": "java", "name": "Java" },
    { "id": "python", "name": "Python" },
    { "id": "cpp", "name": "C++" }
  ]
}
```

---

### 2. Fetch Difficulty Levels

**Request:**
```javascript
const getLevels = async () => {
  try {
    const response = await quizApi.getLevels();
    console.log(response.levels);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

**Response:**
```json
{
  "success": true,
  "levels": [
    { "id": "basic", "name": "Basic" },
    { "id": "intermediate", "name": "Intermediate" },
    { "id": "advanced", "name": "Advanced" }
  ]
}
```

---

### 3. Fetch Questions

**Request:**
```javascript
const getQuestions = async (technology, level) => {
  try {
    const response = await quizApi.getQuestions('html', 'basic');
    console.log(response.questions);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Usage
getQuestions('html', 'basic');
getQuestions('react', 'intermediate');
getQuestions('javascript', 'advanced');
```

**Response:**
```json
{
  "success": true,
  "questions": [
    {
      "id": 1,
      "question": "What does HTML stand for?",
      "options": [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Hyper Transfer Markup Language",
        "Home Tool Markup Language"
      ],
      "correctAnswer": 0
    },
    {
      "id": 2,
      "question": "Which tag is used to create a hyperlink?",
      "options": ["<link>", "<a>", "<href>", "<hyper>"],
      "correctAnswer": 1
    }
  ],
  "total": 5
}
```

---

### 4. Submit Quiz Results

**Request:**
```javascript
const submitQuizResult = async (resultData) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await quizApi.submitResult(
      {
        title: 'HTML Quiz',
        technology: 'html',
        level: 'basic',
        totalQuestions: 5,
        correct: 4,
        wrong: 1
      },
      token
    );
    console.log(response);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Usage
submitQuizResult({
  title: 'JavaScript Advanced Test',
  technology: 'js',
  level: 'advanced',
  totalQuestions: 10,
  correct: 8,
  wrong: 2
});
```

**Response:**
```json
{
  "success": true,
  "message": "Result created",
  "result": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "HTML Quiz",
    "technology": "html",
    "level": "basic",
    "totalQuestions": 5,
    "correct": 4,
    "wrong": 1,
    "percentage": 80,
    "user": "user_id_here",
    "createdAt": "2025-12-30T10:30:00.000Z"
  }
}
```

---

### 5. Get User's Quiz Results

**Request:**
```javascript
const getUserQuizResults = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await quizApi.getUserResults(token);
    console.log(response.results);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Usage
getUserQuizResults();
```

**Response:**
```json
{
  "success": true,
  "results": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "HTML Quiz",
      "technology": "html",
      "level": "basic",
      "totalQuestions": 5,
      "correct": 4,
      "wrong": 1,
      "percentage": 80,
      "createdAt": "2025-12-30T10:30:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "JavaScript Intermediate",
      "technology": "js",
      "level": "intermediate",
      "totalQuestions": 10,
      "correct": 7,
      "wrong": 3,
      "percentage": 70,
      "createdAt": "2025-12-30T11:15:00.000Z"
    }
  ]
}
```

---

## Real-World Usage in React Component

```javascript
import { useEffect, useState } from 'react';
import quizApi from '../services/quizApi';
import { toast } from 'react-toastify';

export default function QuizComponent() {
  const [technologies, setTechnologies] = useState([]);
  const [levels, setLevels] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedTech, setSelectedTech] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load technologies and levels on mount
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const techResponse = await quizApi.getTechnologies();
        const levelResponse = await quizApi.getLevels();
        
        setTechnologies(techResponse.technologies);
        setLevels(levelResponse.levels);
      } catch (error) {
        toast.error('Failed to load quiz data');
      }
    };
    
    loadInitialData();
  }, []);

  // Load questions when tech and level are selected
  useEffect(() => {
    if (selectedTech && selectedLevel) {
      loadQuestions();
    }
  }, [selectedTech, selectedLevel]);

  const loadQuestions = async () => {
    setLoading(true);
    try {
      const response = await quizApi.getQuestions(selectedTech, selectedLevel);
      if (response.success) {
        setQuestions(response.questions);
        toast.success(`Loaded ${response.total} questions`);
      }
    } catch (error) {
      toast.error('Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitQuiz = async (answers) => {
    try {
      const correct = answers.filter(
        (ans, idx) => ans === questions[idx].correctAnswer
      ).length;

      const response = await quizApi.submitResult(
        {
          title: `${selectedTech} - ${selectedLevel}`,
          technology: selectedTech,
          level: selectedLevel,
          totalQuestions: questions.length,
          correct: correct,
          wrong: questions.length - correct
        },
        localStorage.getItem('authToken')
      );

      if (response.success) {
        toast.success('Result saved successfully!');
      }
    } catch (error) {
      toast.error('Failed to save result');
    }
  };

  return (
    <div>
      {/* Technology Selection */}
      <select onChange={(e) => setSelectedTech(e.target.value)}>
        <option value="">Select Technology</option>
        {technologies.map(tech => (
          <option key={tech.id} value={tech.id}>
            {tech.name}
          </option>
        ))}
      </select>

      {/* Level Selection */}
      {selectedTech && (
        <select onChange={(e) => setSelectedLevel(e.target.value)}>
          <option value="">Select Level</option>
          {levels.map(level => (
            <option key={level.id} value={level.id}>
              {level.name}
            </option>
          ))}
        </select>
      )}

      {/* Questions Display */}
      {loading && <p>Loading questions...</p>}
      {questions.length > 0 && (
        <div>
          <h2>Quiz: {selectedTech} - {selectedLevel}</h2>
          <p>Total Questions: {questions.length}</p>
          {questions.map((question, idx) => (
            <div key={question.id}>
              <h3>Q{idx + 1}: {question.question}</h3>
              {question.options.map((option, optIdx) => (
                <label key={optIdx}>
                  <input type="radio" name={`q${question.id}`} />
                  {option}
                </label>
              ))}
            </div>
          ))}
          <button onClick={() => handleSubmitQuiz([])}>
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
}
```

---

## Available Technologies & Levels

Each technology has questions across all three levels:

- **HTML** - 5 questions per level
- **CSS** - 5 questions per level  
- **JavaScript** - 5 questions per level
- **React** - 5 questions per level
- **Node.js** - 5 questions per level
- **MongoDB** - 5 questions per level
- **Java** - 5 questions per level
- **Python** - 5 questions per level
- **C++** - 5 questions per level

Total: 135 questions (9 technologies × 3 levels × 5 questions)

---

## Error Handling

All API calls include error handling:

```javascript
try {
  const response = await quizApi.getQuestions(tech, level);
  if (!response.success) {
    console.error('API Error:', response.message);
  }
} catch (error) {
  console.error('Network Error:', error.message);
}
```

Common error responses:

**400 Bad Request** - Missing required parameters
```json
{
  "success": false,
  "message": "Technology and level are required"
}
```

**404 Not Found** - Invalid technology or level
```json
{
  "success": false,
  "message": "Questions not found for the given technology and level"
}
```

**500 Server Error** - Server-side issue
```json
{
  "success": false,
  "message": "Server Error"
}
```
