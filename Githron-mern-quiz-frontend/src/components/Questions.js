import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import quiz_questions from "./quizQuestions";

import { playSound } from "./sound";

const Questions = () => {




  useEffect(() => {
    playSound();

    // Clean up function to stop the sound when the component unmounts
    // return () => {
    //   pauseSound();
    // };
  }, []);

  const location = useLocation();
  const name = new URLSearchParams(location.search).get("name");

  const [totalQuestions] = useState(quiz_questions.length);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [disableDiv, setDisableDiv] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const navigate = useNavigate();

  const handleAnswerOptionClick = (option, optionNumber, event) => {
    if (!disableDiv && !hasAnswered) {
      setSelectedAnswer({ text: option, number: optionNumber });
      setDisableDiv(true);
      setHasAnswered(true);
      const nextDiv = document.getElementById("next-question");
      nextDiv.style.display = "block";

      const correctAnswer = quiz_questions[currentQuestion].answer;
      console.log(
        `${name} Question ${currentQuestion + 1}: Answer Selected: ${
          optionNumber + 1
        }. ${option}, Correct Answer: ${correctAnswer}`
      );

      if (optionNumber + 1 === correctAnswer) {
        setTotalCorrectAnswers(totalCorrectAnswers + 1);
        console.log(`Selected answer is correct!`);
        // Style the selected answer as green if it is correct
        event.target.style.backgroundColor = "#13C471";
      } else {
        console.log(`Selected answer is incorrect!`);
        // Style the selected answer as red if it is incorrect
        event.target.style.backgroundColor = "#F84A5C";

        // Style the correct answer as green
        const options = event.target.parentElement.children;
        for (let i = 0; i < options.length; i++) {
          const optionElem = options[i];
          const optionNumber = i + 1;
          if (optionNumber === correctAnswer) {
            optionElem.style.backgroundColor = "#13C471";
            break;
          }
        }
      }

      clearInterval(countdownId); // Stop the countdown timer
    }
  };

  const handleNextQuestionClick = () => {
    setCount(20);
    if (currentQuestion === quiz_questions.length - 1) {
      // Last question, redirect to quiz-result page
      navigate("/quiz-result", {
        state: {
          totalQuestions: totalQuestions,
          totalCorrectAnswers: totalCorrectAnswers,
          name: name,
        },
      });
      return;
    }

    // Reset the background color of all the options
    const options = document.querySelectorAll(".option");
    options.forEach((option) => {
      option.style.backgroundColor = "";
    });

    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
    setDisableDiv(false);
    setHasAnswered(false);
    const nextDiv = document.getElementById("next-question");
    nextDiv.style.display = "none";
  };

  const [count, setCount] = useState(20);
  const [countdownId, setCountdownId] = useState(null);

 useEffect(() => {
    const countdown = setInterval(() => {
        if (count > 0) {
            setCount(count - 1);
        } else {
            clearInterval(countdown);
            console.log("Time's up!");
            setDisableDiv(true);
            const nextDiv = document.getElementById("next-question");
            nextDiv.style.display = "block";
        }
    }, 1000);

    // Store the countdown ID in a state variable
    setCountdownId(countdown);

    return () => clearInterval(countdown);
}, [count, currentQuestion]);


    return (
        <div id="container">
            <div className="header">QUIZ APP</div>

            <div className="content">
                <div className="content-wrapper">
                    <span className="question-number">
                        Question {currentQuestion + 1}.
                    </span>
                    <h2 className="question">
                        {quiz_questions[currentQuestion].question}
                    </h2>
                    <div id="option-container">
                        {quiz_questions[currentQuestion].options.map(
                            (option, index) => (
                                <p
                                    className={`option ${
                                        selectedAnswer &&
                                        selectedAnswer.text === option
                                            ? "selected"
                                            : ""
                                    }`}
                                    style={{
                                        pointerEvents: disableDiv
                                            ? "none"
                                            : "auto",
                                    }}
                                    key={index}
                                    onClick={(event) =>
                                        handleAnswerOptionClick(
                                            option,
                                            index,
                                            event
                                        )
                                    }
                                >
                                    {`${option}`}
                                </p>
                            )
                        )}
                    </div>
                </div>

                <div className="footer" id="footer">
                    <p id="timer">Time Left: {count} Sec</p>
                    <button
                        style={{ display: "none" }}
                        id="next-question"
                        onClick={handleNextQuestionClick}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Questions;
