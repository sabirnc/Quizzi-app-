import { useNavigate  } from "react-router-dom";
import { decode } from 'html-entities'
import { Spinner, Stack } from '@chakra-ui/react'

//context
import { useContext } from "react";
import { GlobalContext } from "../ context/globalConext";



const Quiz = () => {
 
  //consuming the context
  const { handleSelected , que  , setCount } = useContext(GlobalContext)
  const navigate = useNavigate()

    // setting points of user  after checking the answer
    const checkResult = () => {
      const correctCount = que.reduce((acc, result) => {
        const selectedOption = result.options.find((option) => option.isSelected);
        if (selectedOption && selectedOption.option === result.answer) {
          return acc + 1;
        }
        return acc;
      }, 0);
      setCount((count) => count + correctCount);
      navigate('/submit-quizz')
      
    };

    let loading = false;
    if(que.length === 0){
      loading = true
    }

  return (
    <>
      <div className="main">
        {loading && (
          <Stack direction={'row'}>
              <Spinner 
              size={'xl'} 
              thickness="4px"
              emptyColor="gray.200"
              speed="0.65s"
              />
          </Stack>
        )}
        {que && que.map((result) => {
          return (
            <div className="container" key={result.id}>
              <h2>{decode(result.question)}</h2>
              <div className="option-container">
                {result.options.map((option) => (
                  <span
                    className="option"
                    onClick={() => handleSelected(option.id, result.id)}
                    style={{ background: option.isSelected ? "lightblue" : "" }}
                    key={option.id}
                  >
                    {decode(option.option)}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
        {
            que.every((Que) =>  Que.isSelected === true) ? ( !loading ? <button className="start-btn" onClick={checkResult}>check answers</button> : '') : ''
        }
       </div>
    </>
  );
};

export default Quiz;
