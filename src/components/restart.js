
const Restart = ({que , count , restart }) => {
    return (
        <div className="main">
            {
                que.map( (result) => {
                    return (
                        <div className="container" key={result.id}>
                        <h2>{result.question}</h2>
                        <div className="option-container">
                            {
                               result.options.map( option => <span className="option" style={{background : (result.answer === option.option  &&  'green') || (option.isSelected && 'red')}} key={option.id} >{option.option}</span> )
                            }
                        </div>
                    </div>
                    )
                })
            }
            <div className="sec">
                <p>correct answers {count}/5</p>
                <button className="start-btn" onClick={restart}>playagain</button>
            </div>
        </div>
    )
}

export default Restart