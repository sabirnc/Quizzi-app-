import {  useState , useContext} from "react"
import { CategoryContext } from "../ context/category"

const Start  = ({start , handleChange , handleDiffuculty}) => {
    const {categories} = useContext(CategoryContext)
    return (
        <div className="main">
            <h1>Quizzical</h1>
            <div style={{display:'flex' , alignItems:'center' , justifyContent:'center'}}>
                <p>categories :</p>
                <select className="category" onChange={(e) => handleChange(e.target.value)} >
                {
                    categories && categories.map( (category , index) => <option key={category.name} value={category.id}>{category.name}</option>)
                }
                </select>
            </div>
            <div style={{display:'flex' , alignItems:'center' , justifyContent:'center'}} >
                <p>difficulty :</p>
                <select  className="category" onChange={ (e) => handleDiffuculty(e.target.value)}>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                </select>
            </div>
            <button className="start-btn" onClick={() => start()}>Start</button>
        </div>
    )
}

export default Start