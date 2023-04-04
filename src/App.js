import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

// components
import Start from "./components/start";
import Quiz from "./components/quiz";
import Restart from "./components/restart";
import Confetti from "./components/Confetti";


function App() {
  const [start, setStart] = useState(true);
  const [que, setQue] = useState([]);
  const [stats, setStat] = useState("");
  const [count, setCount] = useState(0);
  const [restarts, setRestart] = useState(false);

  useEffect(() => {
    async function getQuestions() {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple"
      );
      const { results } = await response.json();
      const questions = await Promise.all(
        results.map(async ({ question, correct_answer, incorrect_answers }) => {
          const options = [...incorrect_answers];
  
          // insert the correct answer at a random index
          const index = Math.floor(Math.random() * 4);
          options.splice(index, 0, correct_answer);
  
          const optionObjects = options
            .slice(0, 4)
            .map((option) => ({ id: nanoid(), isSelected: false, option }));
  
          return {
            id: nanoid(),
            question,
            options: optionObjects,
            answer: correct_answer,
            isSelected: false,
          };
        })
      );
      setQue(questions);
    }
    getQuestions();
  }, [restarts]);



  // handling user selection  of the options 
  const handleSelected = (id, resId) => {
    setQue((que) => {
      return que.map((res) => {
        if (res.id === resId) {
          const updatedOptions = res.options.map((option) =>
            option.id === id ? { ...option, isSelected: !option.isSelected } : { ...option, isSelected: false }
          );
          return { ...res, isSelected: true, options: updatedOptions };
        }
        return res;
      });
    });
  };

  // checking points of user  after checking the answer 
  const checkResult = () => {
    setStat("playagain");
    const correctCount = que.reduce((acc, result) => {
      const selectedOption = result.options.find((option) => option.isSelected);
      if (selectedOption && selectedOption.option === result.answer) {
        return acc + 1;
      }
      return acc;
    }, 0);
    setCount((count) => count + correctCount);
  };


  // starting a new game 
  const startGame = () => {
    setStart(false);
    setStat("started");
  };


  // play again 
  const restart = () => {
    setQue([]);
    setStat("started");
    setCount(0);
    setRestart((prev) => !prev);
  };

  return (
    <>
    {count === 5 && <Confetti/>}
    <div className="App">
      <div className="header">
        <div className="header-child"></div>
      </div>
      <div> 
        {start && <Start start={startGame} />}
        {stats == "started" && (
          <Quiz
            que={que}
            handleSelected={handleSelected}
            checkResult={checkResult}
          />
        )}
        {stats == "playagain" && (
          <Restart que={que} setQue={setQue} count={count} restart={restart} />
        )}
      </div>
      <div className="footer">
        <div className="footer-child"></div>
      </div>
    </div>
    </>
  );
   
}

export default App;
