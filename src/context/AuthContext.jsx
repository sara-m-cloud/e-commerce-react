import React, { createContext, useEffect, useState } from 'react'
// import { useState } from 'react';



export const AuthContextObj=createContext();


export default function AuthContextProvider({children}) {
    const [userToken, setuserToken] = useState(null)


    useEffect(function(){
        console.log('Refreshed');
        
        const tkn=localStorage.getItem('tkn')
        if (tkn!=null){
            setuserToken(tkn)
        }
    },[])
    
  return <>
    
    <AuthContextObj.Provider value={{setuserToken,userToken}}>
    {children}
    </AuthContextObj.Provider>
    </>
}
