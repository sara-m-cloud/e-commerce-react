import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

export default function useCategories() {

    function getAllCategories(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
     }
    
    
     const res=useQuery({
       queryKey:['getAllCategories'],
       queryFn:getAllCategories,
     })
    //  const allCategories=data?.data.data
  return res

}
