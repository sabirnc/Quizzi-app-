import { createContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";


// creating and exporting  context for categories of the quizz
export const GlobalContext = createContext();

function GloabalContextProvider({ children }) {
  
  const [categories, setCategory] = useState();
  const [select, setSelect] = useState(0);
  const [difficulty, setDiffuculty] = useState("easy");
  const [count, setCount] = useState(0);
  const [que, setQue] = useState([]);
  const [restarts, setRestart] = useState(0);
  
  // updating category of the quizz to the  state
  const handleChange = (select) => {
    setSelect(select);
  };

  //updating the difficulty
  const handleDiffuculty = (diff) => {
    setDiffuculty(diff);
  };

  // handling  selectin option 
  const handleSelected = (id, resId) => {
    setQue((que) => {
      return que.map((res) => {
        if (res.id === resId) {
          const updatedOptions = res.options.map((option) =>
            option.id === id
              ? { ...option, isSelected: !option.isSelected }
              : { ...option, isSelected: false }
          );
          return { ...res, isSelected: true, options: updatedOptions };
        }
        return res;
      });
    });
  };


  useEffect(() => {
    // fetching question from open trivia api endpoint
    async function getCategory() {
      const response = await fetch("https://opentdb.com/api_category.php");
      const data = await response.json();
      setCategory(data.trivia_categories);
    }

    getCategory();
  }, []);

  console.log(categories)

  useEffect(() => {

    // fetching question from the open trivia endpoint
    async function getQuestions() {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=5&category=${select}&difficulty=${difficulty}&type=multiple`
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
  },[restarts]);

  return (
    //providing value for the CategoryContext
    <GlobalContext.Provider
      value={{
        categories,
        handleChange,
        handleDiffuculty,
        que,
        setQue,
        handleSelected,
        count,
        restarts,
        setCount,
        setRestart
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GloabalContextProvider;
