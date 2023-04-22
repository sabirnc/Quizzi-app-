import { useContext } from "react";
import { useNavigate  } from "react-router-dom";
import { Heading  , Text , Select  , Stack } from '@chakra-ui/react'

// context
import { GlobalContext } from "../ context/globalConext";

const Start = () => {
  
  // consuming the Context
  const { categories , handleChange , handleDiffuculty  } = useContext(GlobalContext);
  const navigate = useNavigate()

  const startGame = () => {
    navigate('quizz')
  }

  return (
    <div className="main">
      <Heading>Quizzical</Heading>
      <Stack spacing={'5'}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text fontSize={'2xl'}>Categories: </Text>
            <Select 
              placeholder="Any Category"
              onChange={(e) => handleChange(e.target.value )}
            >
              {categories &&
                categories.map((category) => (
                  <option key={category.name} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </Select>
        </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text fontSize={'2xl'}>difficulty: </Text>
        <Select
          onChange={(e) => handleDiffuculty(e.target.value)}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </Select>
      </div>
       </Stack> 
      <button className="start-btn" onClick={() => startGame()}>
        Start
      </button>
    </div>
  );
};

export default Start;
