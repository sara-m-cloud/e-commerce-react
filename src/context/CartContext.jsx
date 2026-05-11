import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContextObj } from './AuthContext'

export const cartContext=createContext()

export default function CartContextProvider({children}) {
    // const{token}=useContext(AuthContextObj)
    
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [products, setProducts] = useState(null);


    function addProductToCart(productId){
        const res= axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
            productId: productId
        },
    {
        headers:{token:localStorage.getItem('tkn')}
    }).then(function(res){
        console.log('res',res.data.numOfCartItems);
        console.log('res',res.data.data.totalCartPrice);
        console.log('res',res.data.data.products);

        setNumOfCartItems(res.data.numOfCartItems)
        setProducts(res.data.data.products)
        setTotalCartPrice(res.data.data.totalCartPrice)
        return true
        
    }).catch(function(err){
        console.log('err',err);
        return false
        
    })
    return res;
    }

    function getUserCart(){
        axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
            headers:{token:localStorage.getItem('tkn')}
        }).then(function(resp){

            console.log('res',resp.data.numOfCartItems);
            console.log('res',resp.data.data.products);
            console.log('res',resp.data.data.totalCartPrice);

        setNumOfCartItems(resp.data.numOfCartItems)
        setProducts(resp.data.data.products)
        setTotalCartPrice(resp.data.data.totalCartPrice)
            
            
        }).catch(function(err){
            console.log('err',err);
            
        })
    }
   

    useEffect(() => {
        if('tkn'){

            getUserCart()
        }
      
    }, ['tkn'])
    
  return (
    <cartContext.Provider value={{
        addProductToCart,
        getUserCart,
        numOfCartItems,
        totalCartPrice,
        products

    }}>{children}</cartContext.Provider>
  )
}
