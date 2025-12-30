const questionData = {
  // HTML
  html: {
    basic: [
      { id: 1, question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], correctAnswer: 0 },
      { id: 2, question: "Which tag is used to create a hyperlink?", options: ["<link>", "<a>", "<href>", "<hyper>"], correctAnswer: 1 },
      { id: 3, question: "Which tag represents a paragraph?", options: ["<p>", "<para>", "<text>", "<paragraph>"], correctAnswer: 0 },
      { id: 4, question: "What is the correct doctype for HTML5?", options: ["<!DOCTYPE HTML5>", "<!DOCTYPE html>", "<HTML5>", "<doctype html5>"], correctAnswer: 1 },
      { id: 5, question: "Which attribute provides alternative text for images?", options: ["title", "src", "alt", "caption"], correctAnswer: 2 },
    ],
    intermediate: [
      { id: 1, question: "Which element is used for self-contained composition in a document?", options: ["<section>", "<article>", "<div>", "<aside>"], correctAnswer: 1 },
      { id: 2, question: "Which input type shows a date picker in supporting browsers?", options: ["date", "datetime", "calendar", "time"], correctAnswer: 0 },
      { id: 3, question: "Which attribute on <a> opens the link in a new tab?", options: ["target='_blank'", "rel='new'", "href='_blank'", "open='new'"], correctAnswer: 0 },
      { id: 4, question: "Which element is used to play audio?", options: ["<sound>", "<audio>", "<mp3>", "<media>"], correctAnswer: 1 },
      { id: 5, question: "Which tag should contain the page title?", options: ["<title>", "<h1>", "<header>", "<headtitle>"], correctAnswer: 0 },
    ],
    advanced: [
      { id: 1, question: "Which API lets pages store small amounts of key/value data in the browser persistently?", options: ["SessionStorage", "LocalStorage", "IndexedDB", "Cookies"], correctAnswer: 1 },
      { id: 2, question: "Which HTML5 API supports drag-and-drop operations?", options: ["Drag and Drop API", "DnD API", "DragDrop", "All of the above"], correctAnswer: 0 },
      { id: 3, question: "Which element supports srcset for responsive images?", options: ["<img>", "<picture>", "<figure>", "Both <img> and <picture>"], correctAnswer: 3 },
      { id: 4, question: "Which attribute on <link> is used to apply stylesheets conditionally by media?", options: ["media", "conditional", "type", "rel"], correctAnswer: 0 },
      { id: 5, question: "Which interface provides programmatic control of audio/video elements?", options: ["MediaController", "HTMLMediaElement", "MediaStream", "AudioAPI"], correctAnswer: 1 },
    ]
  },
  // CSS
  css: {
    basic: [
      { id: 1, question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"], correctAnswer: 0 },
      { id: 2, question: "Which CSS property is used to change text color?", options: ["text-color", "color", "font-color", "text-style"], correctAnswer: 1 },
      { id: 3, question: "Which CSS property controls the size of text?", options: ["text-size", "font-size", "size", "text-style"], correctAnswer: 1 },
      { id: 4, question: "Which CSS property is used to change the background color?", options: ["bg-color", "background-color", "color", "back-color"], correctAnswer: 1 },
      { id: 5, question: "What is the correct CSS syntax for setting a margin?", options: ["margin: 10px 20px;", "margin = 10px 20px;", "margin: 10, 20;", "margin: 10px; margin: 20px;"], correctAnswer: 0 },
    ],
    intermediate: [
      { id: 1, question: "Which CSS property is used to change the space inside an element?", options: ["margin", "padding", "spacing", "border"], correctAnswer: 1 },
      { id: 2, question: "What does the 'float' property do in CSS?", options: ["Makes text float", "Positions elements to the left or right", "Moves an element up", "Rotates an element"], correctAnswer: 1 },
      { id: 3, question: "Which CSS property is used to create rounded corners?", options: ["corner-radius", "border-radius", "round-corners", "edge-radius"], correctAnswer: 1 },
      { id: 4, question: "What is flexbox used for?", options: ["Styling text", "Creating layouts", "Animating elements", "Adding borders"], correctAnswer: 1 },
      { id: 5, question: "Which CSS property controls the stacking order of elements?", options: ["depth", "stack", "z-index", "layer"], correctAnswer: 2 },
    ],
    advanced: [
      { id: 1, question: "What is CSS Grid used for?", options: ["Creating linear layouts", "Creating 2D grid layouts", "Styling tables", "Creating animations"], correctAnswer: 1 },
      { id: 2, question: "What does the 'calc()' function allow you to do?", options: ["Calculate colors", "Perform mathematical operations in CSS", "Calculate element size", "Calculate animation duration"], correctAnswer: 1 },
      { id: 3, question: "What are CSS variables?", options: ["JavaScript variables", "Custom properties that can be reused", "HTML attributes", "SVG elements"], correctAnswer: 1 },
      { id: 4, question: "What does 'position: sticky' do?", options: ["Fixes element to viewport", "Makes element sticky to scroll", "Positions relative to scroll", "Creates a floating element"], correctAnswer: 2 },
      { id: 5, question: "What is a CSS preprocessor?", options: ["A tool for minifying CSS", "A language that extends CSS with variables and functions", "A browser feature", "A CSS validator"], correctAnswer: 1 },
    ]
  },
  // JavaScript
  js: {
    basic: [
      { id: 1, question: "What does JavaScript stand for?", options: ["Java Source", "Java Script", "JavaScript is a programming language", "Just a Script"], correctAnswer: 2 },
      { id: 2, question: "Which keyword is used to declare a variable?", options: ["var", "let", "const", "All of the above"], correctAnswer: 3 },
      { id: 3, question: "What is the output of 2 + '2' in JavaScript?", options: ["4", "22", "undefined", "NaN"], correctAnswer: 1 },
      { id: 4, question: "Which function is used to print to console?", options: ["print()", "console.log()", "output()", "log()"], correctAnswer: 1 },
      { id: 5, question: "What is a callback function?", options: ["A function that calls another function", "A function passed as an argument to another function", "A function that returns a value", "A function that repeats"], correctAnswer: 1 },
    ],
    intermediate: [
      { id: 1, question: "What are closures in JavaScript?", options: ["Functions that close", "Functions with access to outer scope", "Loops that close", "Methods of objects"], correctAnswer: 1 },
      { id: 2, question: "What is the difference between '==' and '==='?", options: ["No difference", "== does type coercion, === doesn't", "=== does type coercion", "One is for objects, one for primitives"], correctAnswer: 1 },
      { id: 3, question: "What is 'this' in JavaScript?", options: ["Current object context", "A variable", "A keyword for conditionals", "A loop statement"], correctAnswer: 0 },
      { id: 4, question: "What is async/await?", options: ["HTML attributes", "Syntax for handling promises", "CSS properties", "Variable declarations"], correctAnswer: 1 },
      { id: 5, question: "What are arrow functions?", options: ["Functions with special syntax", "Concise function syntax using =>", "Functions that return values", "Methods of strings"], correctAnswer: 1 },
    ],
    advanced: [
      { id: 1, question: "What is a Promise in JavaScript?", options: ["A commitment to return value", "Object for async operations", "A function that returns immediately", "A variable holder"], correctAnswer: 1 },
      { id: 2, question: "What is event delegation?", options: ["Delegating events to functions", "Handling events on parent instead of children", "Creating custom events", "Removing event listeners"], correctAnswer: 1 },
      { id: 3, question: "What is the spread operator?", options: ["... for spreading values", "A comparison operator", "A loop statement", "A string method"], correctAnswer: 0 },
      { id: 4, question: "What is destructuring?", options: ["Breaking objects apart", "Extracting values from objects/arrays into variables", "Deleting properties", "Creating new objects"], correctAnswer: 1 },
      { id: 5, question: "What is hoisting?", options: ["Lifting elements", "Variables/functions being accessible before declaration", "Moving code around", "Optimizing code"], correctAnswer: 1 },
    ]
  },
  // React
  react: {
    basic: [
      { id: 1, question: "What is React?", options: ["A server", "A JavaScript library for building UIs", "A database", "A styling tool"], correctAnswer: 1 },
      { id: 2, question: "What are props in React?", options: ["Properties passed from parent to child", "Local state variables", "Methods of components", "CSS classes"], correctAnswer: 0 },
      { id: 3, question: "What is state in React?", options: ["The status of the app", "Data that can change and trigger re-renders", "Props passed down", "Static data"], correctAnswer: 1 },
      { id: 4, question: "What is a functional component?", options: ["A component that returns functions", "A JavaScript function that returns JSX", "A component class", "A React hook"], correctAnswer: 1 },
      { id: 5, question: "What is JSX?", options: ["JavaScript XML syntax", "Java XML", "JavaScript extension", "JSON extension"], correctAnswer: 0 },
    ],
    intermediate: [
      { id: 1, question: "What is the useState hook?", options: ["For URL state", "For managing state in functional components", "For navigation", "For styling"], correctAnswer: 1 },
      { id: 2, question: "What is the useEffect hook?", options: ["For styling effects", "For handling side effects in components", "For animations", "For events"], correctAnswer: 1 },
      { id: 3, question: "What is prop drilling?", options: ["Drilling holes in code", "Passing props through many levels", "Removing props", "Creating new props"], correctAnswer: 1 },
      { id: 4, question: "What is a controlled component?", options: ["A component that controls others", "Form input controlled by React state", "A parent component", "A component with lifecycle"], correctAnswer: 1 },
      { id: 5, question: "What is conditional rendering?", options: ["Rendering based on conditions", "Rendering conditionally", "Removing renders", "All of the above"], correctAnswer: 0 },
    ],
    advanced: [
      { id: 1, question: "What is the Context API?", options: ["API for APIs", "For managing global state without prop drilling", "For HTTP requests", "For styling"], correctAnswer: 1 },
      { id: 2, question: "What is React.memo?", options: ["For memoizing state", "Higher-order component for performance optimization", "For storing data", "For events"], correctAnswer: 1 },
      { id: 3, question: "What is useCallback?", options: ["For callbacks", "For memoizing callback functions", "For error handling", "For animations"], correctAnswer: 1 },
      { id: 4, question: "What is useMemo?", options: ["For memory", "For memoizing expensive computations", "For storing variables", "For callbacks"], correctAnswer: 1 },
      { id: 5, question: "What are custom hooks?", options: ["Hooks for customization", "Custom functions that use React hooks", "Special React methods", "Props"], correctAnswer: 1 },
    ]
  },
  // Node.js
  node: {
    basic: [
      { id: 1, question: "What is Node.js?", options: ["A frontend framework", "A JavaScript runtime for server-side development", "A database", "A CSS framework"], correctAnswer: 1 },
      { id: 2, question: "What is npm?", options: ["Node Package Manager", "A programming language", "A server", "A browser"], correctAnswer: 0 },
      { id: 3, question: "What is Express?", options: ["Fast delivery", "A Node.js web framework", "A database", "A testing tool"], correctAnswer: 1 },
      { id: 4, question: "What is middleware in Express?", options: ["Ware in the middle", "Functions that handle requests/responses", "Database layer", "Front-end code"], correctAnswer: 1 },
      { id: 5, question: "What is a route?", options: ["Navigation path", "Path and method for handling requests", "A file", "A variable"], correctAnswer: 1 },
    ],
    intermediate: [
      { id: 1, question: "What is a RESTful API?", options: ["An API using REST principles", "A fast API", "An old API", "A database API"], correctAnswer: 0 },
      { id: 2, question: "What HTTP methods are used in REST?", options: ["GET, POST, PUT, DELETE", "GET, POST", "GET, PUSH, PULL", "ALL"], correctAnswer: 0 },
      { id: 3, question: "What is authentication?", options: ["Authorization", "Verifying user identity", "Creating users", "Managing permissions"], correctAnswer: 1 },
      { id: 4, question: "What is CORS?", options: ["A disease", "Cross-Origin Resource Sharing", "A programming language", "A database"], correctAnswer: 1 },
      { id: 5, question: "What is a callback?", options: ["A return call", "A function passed as argument", "A REST method", "A database operation"], correctAnswer: 1 },
    ],
    advanced: [
      { id: 1, question: "What are Promises?", options: ["Commitments", "Objects for async operations", "Variables", "Functions"], correctAnswer: 1 },
      { id: 2, question: "What is async/await?", options: ["HTML attributes", "Syntax for promises", "Server methods", "Middleware"], correctAnswer: 1 },
      { id: 3, question: "What is JWT?", options: ["Java Web Token", "JSON Web Token", "JavaScript Web Token", "Java XML Token"], correctAnswer: 1 },
      { id: 4, question: "What is bcryptjs?", options: ["A server", "Password hashing library", "A database", "A testing tool"], correctAnswer: 1 },
      { id: 5, question: "What is MongoDB?", options: ["A SQL database", "A NoSQL database", "A framework", "An API"], correctAnswer: 1 },
    ]
  },
  // MongoDB
  mongodb: {
    basic: [
      { id: 1, question: "What is MongoDB?", options: ["A SQL database", "A NoSQL document database", "A server", "A framework"], correctAnswer: 1 },
      { id: 2, question: "What is a document in MongoDB?", options: ["A file", "A JSON-like data structure", "A table", "A collection"], correctAnswer: 1 },
      { id: 3, question: "What is a collection?", options: ["A group of items", "A set of documents", "A database", "A table"], correctAnswer: 1 },
      { id: 4, question: "What is _id in MongoDB?", options: ["An identifier", "Unique identifier for each document", "A field name", "A property"], correctAnswer: 1 },
      { id: 5, question: "What is BSON?", options: ["Basic JSON", "Binary JSON", "Backup JSON", "Base JSON"], correctAnswer: 1 },
    ],
    intermediate: [
      { id: 1, question: "What is schema validation in MongoDB?", options: ["Validating tables", "Validating document structure", "Validating queries", "Validating servers"], correctAnswer: 1 },
      { id: 2, question: "What is an index in MongoDB?", options: ["A list", "Data structure for faster queries", "A document", "A collection"], correctAnswer: 1 },
      { id: 3, question: "What is aggregation?", options: ["Collection of data", "Processing pipeline for data transformation", "Joining tables", "Sorting data"], correctAnswer: 1 },
      { id: 4, question: "What is a transaction in MongoDB?", options: ["A transfer", "Multi-document ACID transaction", "A query", "An update"], correctAnswer: 1 },
      { id: 5, question: "What is sharding?", options: ["Sharing data", "Horizontal partitioning of data", "Backing up", "Creating copies"], correctAnswer: 1 },
    ],
    advanced: [
      { id: 1, question: "What is replication?", options: ["Copying data", "Creating redundant database copies", "Backing up", "Synchronizing"], correctAnswer: 1 },
      { id: 2, question: "What is the aggregate pipeline?", options: ["Data processing flow", "Multiple stages of data transformation", "A query builder", "A server"], correctAnswer: 1 },
      { id: 3, question: "What is geospatial indexing?", options: ["Indexing locations", "Creating indexes for location-based queries", "Indexing data", "Creating maps"], correctAnswer: 1 },
      { id: 4, question: "What is change streams?", options: ["Stream of changes", "Real-time notifications of data changes", "Data flow", "Updating data"], correctAnswer: 1 },
      { id: 5, question: "What is bulk operations?", options: ["Large operations", "Multiple operations in single request", "Batch processing", "All of the above"], correctAnswer: 1 },
    ]
  },
  // Java
  java: {
    basic: [
      { id: 1, question: "What does JVM stand for?", options: ["Java Virtual Machine", "JavaScript Virtual Method", "Java Verification Module", "Java Visual Method"], correctAnswer: 0 },
      { id: 2, question: "What is OOP?", options: ["Object Oriented Programming", "Output Optimization Program", "Object Operation Protocol", "Output Object Program"], correctAnswer: 0 },
      { id: 3, question: "What are the 4 main OOP concepts?", options: ["Encapsulation, Inheritance, Polymorphism, Abstraction", "Variables, Methods, Classes, Objects", "Import, Export, Variables, Methods", "Data, Functions, Variables, Methods"], correctAnswer: 0 },
      { id: 4, question: "What is a class?", options: ["A classroom", "A blueprint for creating objects", "A method", "A variable type"], correctAnswer: 1 },
      { id: 5, question: "What is an object?", options: ["A thing", "An instance of a class", "A method", "A data type"], correctAnswer: 1 },
    ],
    intermediate: [
      { id: 1, question: "What is inheritance?", options: ["Getting money", "One class inheriting from another", "Creating new classes", "Copying code"], correctAnswer: 1 },
      { id: 2, question: "What is polymorphism?", options: ["Multiple forms", "Methods with same name different behavior", "Different classes", "Multiple objects"], correctAnswer: 1 },
      { id: 3, question: "What is encapsulation?", options: ["Wrapping code", "Bundling data and methods into a class", "Hiding code", "Protecting variables"], correctAnswer: 1 },
      { id: 4, question: "What is abstraction?", options: ["Abstract thinking", "Hiding complex implementation details", "Creating abstract classes", "Using interfaces"], correctAnswer: 1 },
      { id: 5, question: "What is an interface?", options: ["UI elements", "Contract for classes to implement methods", "A class", "A variable type"], correctAnswer: 1 },
    ],
    advanced: [
      { id: 1, question: "What are generics?", options: ["General classes", "Type-safe parameterized types", "Generic methods", "Variable types"], correctAnswer: 1 },
      { id: 2, question: "What is multithreading?", options: ["Multiple threads of code", "Running multiple threads concurrently", "Parallel processing", "All of the above"], correctAnswer: 1 },
      { id: 3, question: "What is exception handling?", options: ["Handling mistakes", "Managing errors gracefully with try-catch", "Throwing errors", "Debugging code"], correctAnswer: 1 },
      { id: 4, question: "What is a lambda expression?", options: ["A Greek letter", "Concise anonymous function syntax", "A method", "A class"], correctAnswer: 1 },
      { id: 5, question: "What are streams?", options: ["Data flow", "Functional API for processing collections", "File I/O", "Network connections"], correctAnswer: 1 },
    ]
  },
  // Python
  python: {
    basic: [
      { id: 1, question: "What is Python?", options: ["A snake", "A high-level programming language", "A framework", "A library"], correctAnswer: 1 },
      { id: 2, question: "What symbol is used for comments in Python?", options: ["//", "#", "/*", "<!--"], correctAnswer: 1 },
      { id: 3, question: "How do you create a function in Python?", options: ["function name(){}", "def name():", "func name(){}", "function(name){}"], correctAnswer: 1 },
      { id: 4, question: "What is a list in Python?", options: ["A single item", "An ordered collection of items", "A set", "A dictionary"], correctAnswer: 1 },
      { id: 5, question: "What is a dictionary in Python?", options: ["A book", "Key-value pair collection", "A list", "A set"], correctAnswer: 1 },
    ],
    intermediate: [
      { id: 1, question: "What is a lambda function?", options: ["A Greek function", "Anonymous function with lambda keyword", "A regular function", "A method"], correctAnswer: 1 },
      { id: 2, question: "What is list comprehension?", options: ["Understanding lists", "Concise way to create lists", "Merging lists", "Sorting lists"], correctAnswer: 1 },
      { id: 3, question: "What is a decorator?", options: ["Decoration", "Function that modifies another function", "A class method", "A variable"], correctAnswer: 1 },
      { id: 4, question: "What are *args and **kwargs?", options: ["Arguments", "Variable-length arguments and keyword arguments", "Methods", "Variables"], correctAnswer: 1 },
      { id: 5, question: "What is a generator?", options: ["Something that generates", "Function that yields values lazily", "A loop", "A method"], correctAnswer: 1 },
    ],
    advanced: [
      { id: 1, question: "What is asyncio?", options: ["Async I/O", "Library for asynchronous programming", "A function", "A variable"], correctAnswer: 1 },
      { id: 2, question: "What is metaclass?", options: ["A class", "Class of a class", "A method", "A property"], correctAnswer: 1 },
      { id: 3, question: "What is context manager?", options: ["Managing context", "With statement for resource management", "A loop", "A decorator"], correctAnswer: 1 },
      { id: 4, question: "What is abstract base class?", options: ["Base abstract", "Interface-like class that cannot be instantiated", "Regular class", "A method"], correctAnswer: 1 },
      { id: 5, question: "What is monkey patching?", options: ["Patching monkeys", "Modifying existing code at runtime", "Debugging", "Testing"], correctAnswer: 1 },
    ]
  },
  // C++
  cpp: {
    basic: [
      { id: 1, question: "What does C++ stand for?", options: ["C Plus Plus", "C Programming", "Central Processing", "Code Plus"], correctAnswer: 0 },
      { id: 2, question: "What is OOP in C++?", options: ["Output Object Program", "Object Oriented Programming", "Operator Overloading Program", "Object Operation Protocol"], correctAnswer: 1 },
      { id: 3, question: "What is cout used for?", options: ["Input", "Output", "Configuration", "Counting"], correctAnswer: 1 },
      { id: 4, question: "What is cin used for?", options: ["Input", "Output", "Configuration", "Counting"], correctAnswer: 0 },
      { id: 5, question: "What are pointers?", options: ["Arrows", "Variables storing memory addresses", "Methods", "Functions"], correctAnswer: 1 },
    ],
    intermediate: [
      { id: 1, question: "What is inheritance in C++?", options: ["Getting money", "One class deriving from another", "Creating objects", "Copying code"], correctAnswer: 1 },
      { id: 2, question: "What is virtual functions?", options: ["Imaginary functions", "Functions that can be overridden", "Abstract functions", "Special functions"], correctAnswer: 1 },
      { id: 3, question: "What is templates?", options: ["Patterns", "Generic programming with parameterized types", "Classes", "Methods"], correctAnswer: 1 },
      { id: 4, question: "What is exception handling?", options: ["Handling mistakes", "Try-catch for error management", "Throwing errors", "Debugging"], correctAnswer: 1 },
      { id: 5, question: "What is STL?", options: ["Standard Template Library", "String Template Language", "Storage Template Language", "System Template Library"], correctAnswer: 0 },
    ],
    advanced: [
      { id: 1, question: "What are smart pointers?", options: ["Intelligent pointers", "Pointers with automatic memory management", "Regular pointers", "Memory pointers"], correctAnswer: 1 },
      { id: 2, question: "What is move semantics?", options: ["Moving objects", "Efficient transfer of resources", "Pointer movement", "Memory movement"], correctAnswer: 1 },
      { id: 3, question: "What are lambda functions?", options: ["Greek functions", "Anonymous functions in C++", "Regular functions", "Methods"], correctAnswer: 1 },
      { id: 4, question: "What is RAII?", options: ["Railroad", "Resource Acquisition Is Initialization", "Random Access", "Rapid Application"], correctAnswer: 1 },
      { id: 5, question: "What are variadic templates?", options: ["Variable templates", "Templates with variable arguments", "Regular templates", "Generic templates"], correctAnswer: 1 },
    ]
  }
};

export const getQuestions = (req, res) => {
  try {
    const { technology, level } = req.query;

    if (!technology || !level) {
      return res.status(400).json({
        success: false,
        message: "Technology and level are required"
      });
    }

    if (!questionData[technology] || !questionData[technology][level]) {
      return res.status(404).json({
        success: false,
        message: "Questions not found for the given technology and level"
      });
    }

    const questions = questionData[technology][level];
    
    return res.status(200).json({
      success: true,
      questions: questions,
      total: questions.length
    });
  } catch (error) {
    console.error("Get Questions Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

export const getTechnologies = (req, res) => {
  try {
    const technologies = Object.keys(questionData).map(tech => ({
      id: tech,
      name: tech.charAt(0).toUpperCase() + tech.slice(1)
    }));

    return res.status(200).json({
      success: true,
      technologies: technologies
    });
  } catch (error) {
    console.error("Get Technologies Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

export const getLevels = (req, res) => {
  try {
    const levels = [
      { id: "basic", name: "Basic" },
      { id: "intermediate", name: "Intermediate" },
      { id: "advanced", name: "Advanced" }
    ];

    return res.status(200).json({
      success: true,
      levels: levels
    });
  } catch (error) {
    console.error("Get Levels Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};
