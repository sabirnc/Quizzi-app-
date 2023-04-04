const Quiz = ({ que, handleSelected , checkResult  ,setCount}) => {
  return (
    <>
      <div className="main">
        {que.map((result) => {
          return (
            <div className="container" key={result.id}>
              <h2>{result.question}</h2>
              <div className="option-container">
                {result.options.map((option) => (
                  <span
                    className="option"
                    onClick={() => handleSelected(option.id, result.id)}
                    style={{ background: option.isSelected ? "lightblue" : "" }}
                    key={option.id}
                  >
                    {option.option}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
        {
            que.every((Que) =>  Que.isSelected === true) ? <button className="start-btn" onClick={checkResult}>check answers</button> : ''
        }
       </div>
    </>
  );
};

export default Quiz;
