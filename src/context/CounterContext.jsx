import React, { createContext, useState } from 'react'


export const CounterContextrObj=createContext();

export default function CounterContextProvider({children}) {

    const [counter, setcounter] = useState(0)
  return(
  
  <CounterContextrObj.Provider value={{
    counter:counter
  }}>
  

  {children}
  
  
  </CounterContextrObj.Provider>
  )
}
