import { createContext, useEffect, useState } from "react"
export const CategoryContext = createContext()


function Category ({children}) {

    const [categories , setCategory] = useState()
    
    useEffect( () => {
        async function getCategory () {
            const response = await fetch('https://opentdb.com/api_category.php')
            const data = await response.json()
            setCategory(data.trivia_categories)
        }

        getCategory()
    }, [])

    return (
      <CategoryContext.Provider value={{categories , setCategory}}>
        {children}
      </CategoryContext.Provider>
    )   
}

export {Category} 