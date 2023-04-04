
import { useState } from 'react'
import ReactConfetti from 'react-confetti'

const Confetti = () => {
  const [dimension , setDimension] = useState({width:window.innerWidth , height:window.innerHeight})

  return (
    <ReactConfetti
      width={dimension.width}
      height={dimension.height}
    />
  )
}

export default Confetti