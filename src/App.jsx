// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Login from "./components/Login/Login";
import NotFound from './components/NotFound/NotFound';
import Register from "./components/Register/Register";
import Layout from './components/Layout/Layout';
import CounterContextProvider from "./context/counterContext";
import AuthContextProvider from './context/AuthContext';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import Test from './components/Test/Test';
import Home from './components/Home/Home';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './context/CartContext';
import { Toaster } from "react-hot-toast";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";




const router=createBrowserRouter([
  {path:'',element:<Layout/> ,children:[
    {path:'register',element:<Register/>},
    {path:'Home',element:<Home/>},
    {path:'Products',element:<Test><Products/></Test>},
  {path:'Categories',element: <Test><Categories/></Test>},
   {path:'Brands',element:<Test><Brands/></Test>},
  {path:'Cart',element:<Test><Cart/></Test>},
  {path:'ProductDetails/:id',element:<Test><ProductDetails/></Test>},
    {path:'login' ,element:<Login/>},
    {path:"*" ,element:<NotFound/> }
  ]},
  
])


const client=new QueryClient();

export default function App() {
  

  return  ( <>
  <QueryClientProvider client={client}>
  <AuthContextProvider>
    <CartContextProvider>
  <CounterContextProvider>
  <RouterProvider router={router}/>
  <Toaster /> 
  </CounterContextProvider>
  </CartContextProvider>
  </AuthContextProvider>
  </QueryClientProvider>
  
  
  
  </>
  )
}
   
