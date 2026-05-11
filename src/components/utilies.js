function getAllCategories(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
 }


 const {data,isLoading}=useQuery({
   queryKey:['getAllCategories'],
   queryFn:getAllCategories,
 })
 const allCategories=data?.data.data