import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import trophyImg from "./trophy.png";

import { Howl } from 'howler';

import wowMp3 from "../sound/anime wow.mp3"
// import { pauseSound } from "./sound";

const QuizResult = () => {

  // wow music
  useEffect(() => {
  const soundWow = new Howl({
    src: [wowMp3],
    volume: .5,
    autoplay: true,
    loop: false,
  });
});

  const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [totalquiz, setTotalquiz] = useState("");

  const [isNameExists, setIsNameExists] = useState(false);
  const [isNameSet, setIsNameSet] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setName(location.state.name);
    setScore(location.state.totalCorrectAnswers);
    setTotalquiz(location.state.totalQuestions);
  }, [location]);

  useEffect(() => {
    if (name && !isNameSet) {
      Axios.get("http://localhost:3001/getUsers")
        .then((response) => {
          const users = response.data;
          const nameExists = users.some((user) => user.name === name);
          setIsNameExists(nameExists);
          setIsNameSet(true);
          setListOfUsers(users);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [name, isNameSet]);

  useEffect(() => {
    if (name && score && totalquiz && isNameSet) {
      if (isNameExists) {
        Axios.get("http://localhost:3001/getUsers")
          .then((response) => {
            setListOfUsers(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        Axios.post("http://localhost:3001/createUser", {
          name,
          score,
          totalquiz,
        })
          .then(() => {
            Axios.get("http://localhost:3001/getUsers")
              .then((response) => {
                setListOfUsers(response.data);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [name, score, totalquiz, isNameExists, isNameSet]);

  const navigate = useNavigate();

    const handleClick = () => {
        // pauseSound();
        console.log("Div clicked!");
        navigate("/");
    };

 


    return (
        <div style={{ overflow: "scroll" }} id="container">
            <div className="header">RESULT DETAIL</div>
            <div className="content"></div>

            <img
                style={{ display:"block", margin: "auto", marginTop: "2rem" }}
                id="trophyImg"
                src={trophyImg}
                alt=""
            ></img>
            <h3 id="score" className="result-score">
                You Got <b>{location.state.totalCorrectAnswers}</b> Out Of <b>{location.state.totalQuestions}</b>
            </h3>
            <div id="result-footer">
                <button onClick={handleClick} id="start-again">Start Again</button>
                {/* <button id="view-result">View Result</button> */}
            </div>

            <div style={{ padding: "0 2rem" }}>

                <h1 style={{ margin: "1rem 0" }} className="headerNresult">
                    LEADERBOARD
                </h1>

                <div id="option-container">
                    {[...listOfUsers].sort((a, b) => b.score - a.score).map((user, index) => {
                        return (
                            <div key={index}>
                                <p
                                    style={{ fontSize: "16px" }}
                                    className="optionR"
                                >
                                    {" "}
                                    {user.name}{" "}
                                    <h4 id="scoreR">
                                        Score: {user.score} out of {user.totalquiz}
                                    </h4>
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default QuizResult;