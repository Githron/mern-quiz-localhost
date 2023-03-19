import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const QuizRules = () => {
    const quizRules = [
        "You Have Only 20 Seconds For Each Question.",
        "Once You Select Any Answer.It Can't Be Undone",
        "You'll Get Points On The Basic Of Your Correct Answers.",
    ];

    const inputStyle = {
        display: "block",
        margin: "auto",
        width: "90%",
        height: "40px",
    };

    const [name, setName] = useState("");
    const [existingNames, setExistingNames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        Axios.get("http://localhost:3001/getUsers")
            .then((response) => {
                setExistingNames(response.data.map((user) => user.name));
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, []);

    const handleNameChange = (event) => {
        setName(event.target.value);
        const inputElement = document.querySelector(".warn");
        inputElement.style.display = "none";
    };

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!existingNames.includes(name)) {
            if (name !== "") {
                setIsSubmitting(true);
                // navigate to quiz if the name is not in the database and input is not empty
                navigate(`/questions?name=${name}`);
                console.log(`User input: ${name}`);
            } else {
                alert("Please Enter Your Name");
                console.log("Name field is empty.");
            }
        } else {
            // alert(`${name} already exists.`);
            console.log(`${name} already exists`);

            const inputElement = document.querySelector(".warn");
            inputElement.style.display = "block";

            // clear input field if the name is in the database
            setName("");
        }
    };

    //
    if (isLoading) {
        return (
            <div>
                <div
                    aria-label="Orange and tan hamster running in a metal wheel"
                    role="img"
                    className="wheel-and-hamster"
                >
                    <div className="wheel"></div>
                    <div className="hamster">
                        <div className="hamster__body">
                            <div className="hamster__head">
                                <div className="hamster__ear"></div>
                                <div className="hamster__eye"></div>
                                <div className="hamster__nose"></div>
                            </div>
                            <div className="hamster__limb hamster__limb--fr"></div>
                            <div className="hamster__limb hamster__limb--fl"></div>
                            <div className="hamster__limb hamster__limb--br"></div>
                            <div className="hamster__limb hamster__limb--bl"></div>
                            <div className="hamster__tail"></div>
                        </div>
                    </div>
                    <div className="spoke"></div>
                </div>

                <div
                    style={{
                        marginTop: "2rem",
                        textAlign: "center",
                        color: "#ccdae7",
                    }}
                >
                    Loading...
                </div>
            </div>
        );
    }

    //
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div id="container">
            <div>
                <h2 className="header">Quiz Rules</h2>
                <ol style={{ marginBottom: "2rem" }}>
                    {quizRules.map((rule, index) => (
                        <li key={index}>{rule}</li>
                    ))}
                </ol>

                <form onSubmit={handleSubmit}>
                    <div className="warn">username already taken</div>
                    <input
                        style={inputStyle}
                        className="inpX"
                        type="text"
                        placeholder="Enter your Username"
                        value={name}
                        onChange={handleNameChange}
                    />
                    <div id="start-quiz-wrapper">
                        <button
                            id="start-quiz"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Start Quiz"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default QuizRules;
