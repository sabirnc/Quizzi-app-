
const Start  = ({start}) => {
    return (
        <div className="main">
            <h1>Quizzical</h1>
            <button className="start-btn" onClick={() => start()}>Start</button>
        </div>
    )
}

export default Start