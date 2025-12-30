# Quiz App - API Integration Guide

## Overview
The Quiz App has been successfully converted from using static dummy data to a dynamic API-driven architecture. This enables real-time question fetching and better data management.

## Changes Made

### Backend Changes

#### 1. New Quiz Controller (`backend/controller/quizController.js`)
- **getQuestions(req, res)**: Fetches questions based on technology and level parameters
  - Query params: `technology`, `level`
  - Returns: Array of questions with options and correct answers
  
- **getTechnologies(req, res)**: Returns list of available technologies
  - Returns: Array of technology objects with id and name
  
- **getLevels(req, res)**: Returns list of available difficulty levels
  - Returns: Array of level objects (basic, intermediate, advanced)

#### 2. New Quiz Routes (`backend/routes/quizRoutes.js`)
```
GET /api/quiz/questions?technology=html&level=basic
GET /api/quiz/technologies
GET /api/quiz/levels
```

#### 3. Updated Server (`backend/server.js`)
- Added quiz router import
- Registered new quiz routes at `/api/quiz`

### Frontend Changes

#### 1. New Quiz API Service (`frontend/src/services/quizApi.js`)
Centralized API calls for quiz-related operations:
- `getTechnologies()`: Fetch all available technologies
- `getLevels()`: Fetch all available difficulty levels
- `getQuestions(technology, level)`: Fetch questions for selected tech and level
- `submitResult(resultData, token)`: Submit quiz results
- `getUserResults(token)`: Fetch user's previous results

#### 2. Updated Sidebar Component (`frontend/src/components/Sidebar.jsx`)
- Removed dependency on `dummydata.js`
- Added API integration using the new `quizApi` service
- Added loading state for better UX
- Questions are now fetched dynamically when technology and level are selected
- useEffect hook triggers API call when selectedTech or selectedLevel changes

## API Endpoints

### Quiz Endpoints

**Get Questions**
```
GET /api/quiz/questions?technology=html&level=basic

Response:
{
  success: true,
  questions: [
    {
      id: 1,
      question: "What does HTML stand for?",
      options: ["...", "...", "...", "..."],
      correctAnswer: 0
    },
    ...
  ],
  total: 5
}
```

**Get Technologies**
```
GET /api/quiz/technologies

Response:
{
  success: true,
  technologies: [
    { id: "html", name: "HTML" },
    { id: "css", name: "CSS" },
    ...
  ]
}
```

**Get Levels**
```
GET /api/quiz/levels

Response:
{
  success: true,
  levels: [
    { id: "basic", name: "Basic" },
    { id: "intermediate", name: "Intermediate" },
    { id: "advanced", name: "Advanced" }
  ]
}
```

## How to Use

### Running the Application

1. **Start the Backend Server**
```bash
cd backend
npm install
npm start
# Server runs on http://localhost:4000
```

2. **Start the Frontend**
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

### Using the Quiz

1. Select a technology from the sidebar (HTML, CSS, JavaScript, React, etc.)
2. Select a difficulty level (Basic, Intermediate, Advanced)
3. The questions will be fetched from the API automatically
4. Answer all questions
5. Submit your result
6. View your score and percentage

## Features

✅ Dynamic question fetching from API
✅ Multiple technologies and difficulty levels
✅ Loading states for better UX
✅ Error handling with toast notifications
✅ Result submission and tracking
✅ Responsive design
✅ Real-time score calculation

## Error Handling

The application includes error handling for:
- Missing query parameters
- Invalid technology/level combinations
- Network failures
- Server errors

All errors are caught and displayed to the user via toast notifications.

## Future Enhancements

- Add question caching to reduce API calls
- Implement pagination for large question sets
- Add question filtering and search
- Create admin panel to manage questions via API
- Add user analytics dashboard
- Implement question difficulty ratings
- Add timer-based quizzes
