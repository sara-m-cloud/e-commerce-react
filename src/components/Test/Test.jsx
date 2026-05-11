import React from 'react'
import { Navigate } from 'react-router-dom'
import Login from './../Login/Login';

export default function Test({children}) {

    if(localStorage.getItem('tkn')==null){
       return <Navigate to={'/Login'}/>
    }
    return<div>{children}</div>
  
}
