import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import LoaderScreen from '../LoaderScreen/LoaderScreen'
import { cartContext } from './../../context/CartContext';
import toast from 'react-hot-toast'


export default function ProductDetails() {

const {id}=useParams()
const {addProductToCart}=useContext(cartContext)

  function getProductDetails(){
   return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    // .then(function(x){console.log('x',x)
    // }).catch(function(err){console.log('err',err)})
  }

  async function handleAddToCart(){
    const res= await addProductToCart(id)
    if(res){
      // console.log('sucess!!');
      toast.success('Sucess',{duration:3000,position:'top-right'})
    }else{
      // console.log('err');
      toast.error('Error',{duration:3000,position:'top-right'})
    }

  }

  const {data,isError,isLoading}=useQuery({
    queryKey:['productdetails',id],
    queryFn:getProductDetails
  })
   if(isError){
    return <h2>No Product is found with this id</h2>
   }
  if(isLoading){
     return <LoaderScreen/>
  }

  const productdetailsObj=data?.data.data
  return (
    <div className="container mx-auto">
      <div className="grid sm:grid-cols-4 gap-8 items-center bg-white shadow-lg rounded-lg p-6">
        <div className="col-span-1 ms-8">
          <img src={productdetailsObj.imageCover} alt={productdetailsObj.title}  className='w-full rounded-lg shadow-md'/>
        </div>
        <div className="col-span-3 m-20 p-5">
          <h1 className="text-3xl font-bold text-gray-900">{productdetailsObj.title}</h1>
          <p className="text-gray-600 leading-relaxed">{productdetailsObj.description}</p>
          <h5 className="text-xl font-semibold text-blue-600">Price:{productdetailsObj.price}</h5>
          <h5 className="text-xl font-semibold text-green-600">Quantity:{productdetailsObj.quantity}</h5>
          <button onClick={handleAddToCart} className='bg-green-400 py-2 w-full rounded-lg'>+Add to cart</button>
        </div>
      </div>
    </div>
  )


}
