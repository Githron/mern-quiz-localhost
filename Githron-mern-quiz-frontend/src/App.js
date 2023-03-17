import "./App.css";
import "./loading.css";
import { Routes, Route } from "react-router-dom";
import QuizRules from "./components/QuizRules";
import Questions from "./components/Questions";
import QuizResult from "./components/QuizResult";

function App() {
    return (
        <Routes>
            <Route path="/" element={<QuizRules />}></Route>
            <Route path="/questions" element={<Questions />}></Route>
            <Route path="/quiz-result" element={<QuizResult />}></Route>
        </Routes>
    );
}

export default App;
