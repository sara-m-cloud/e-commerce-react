import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { data, useNavigate } from 'react-router-dom'




import * as yup from"yup" 
import Login from './../Login/Login';
import { CounterContextrObj } from '../../context/counterContext'








async function registerUser(values) {
  
  try {
    const res =await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)

    console.log('res',res.data);
    
  } catch (error) {
    console.log('error',error);
  }
}




export default function Register() {

  

  const navigate=useNavigate()
  const [errorMessage, seterrorMessage] = useState(null)
  const [isSucess, setisSucess] = useState(false)


  const registerFormik=useFormik({
    initialValues:{
      name:'',
      phone:'',
      password:'',
      rePassword:'',
      email:''
    },
    onSubmit: function(values){
      // console.log('submited..',values);
      axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
      .then(function(x){
        console.log('sa7',x.response)
        setisSucess(true)
        setTimeout(() => {
          navigate('/Login')
        },2000);
      })
      .catch(function(x){
        // console.log('8lt',x.response)
        seterrorMessage(x.response.data.message)

        setTimeout(() => {
          seterrorMessage(null)
        }, 2000);
      })
      
      // console.log('res',res.data);
      // console.log(data.response.data.message);
      
      
      
      
    },
    // ***********************************Validation************************************************
    // validate:function(allData){
    //   const errors={};
    //   const nameRegex=/^[A-Z][a-z]{3,8}$/
    //   const phoneRegex=/^(20)?010[0125][0-9]{8}$/

    //   if(!nameRegex.test(allData.name)){
    //     errors.name='Name start with capital';
    //   }

    //   if(phoneRegex.test(allData.phone)==false){
    //     errors.phone='phone must be egyptian number'

    //   }

    //   if(allData.email.includes('@')==false ||allData.email.includes('.com')==false ){
    //     errors.email="Invalid Email"
    //   }

    //   if(allData.password.length<6||allData.password.length>12 ){
    //     errors.password=" Password must be from 6-12"
    //   }
    //   if(allData.password !== allData.repassword ){
    //     errors.repassword=" Notmatched pass"
    //   }
    //   console.log(errors);
      
    //   return errors;
    // }


    validationSchema:yup.object().shape({
      name:yup.string().min(3,'a2l 7aga').max(10,"altr 7aga").required('Name is req'),
      phone:yup.string().required('phone req').matches(/^01[125][0-9]{8}$/),
      password:yup.string().min(6).max(12),
      rePassword:yup.string().oneOf([yup.ref('password')]),
      email:yup.string().email('Invalid Email')
    })
  })

  const value=useContext(CounterContextrObj)

  return <>
  

<div className='p-5 '>
  {errorMessage?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{errorMessage}</div>:''}
  {isSucess?<div className="p-4 mb-4 text-sm text-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-500" role="alert">congratulations</div>:''}
  <h2 className='text-center'>Register Now</h2>
<form  onSubmit={registerFormik.handleSubmit} className="max-w-md mx-auto">
  <div className="relative z-0 w-full mb-5 group">
      <input  value={registerFormik.values.name } onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
      {registerFormik.errors.name && registerFormik.touched.name ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {registerFormik.errors.name}
</div>:''}
      
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input  value={registerFormik.values.email } onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
      {registerFormik.errors.email && registerFormik.touched.email? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {registerFormik.errors.email}
</div>:''}
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input  value={registerFormik.values.phone } onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur}type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
      {registerFormik.errors.phone && registerFormik.touched.phone ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {registerFormik.errors.phone}
</div>:''}
  </div>

  <div className="relative z-0 w-full mb-5 group">
      <input value={registerFormik.values.password } onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur}  type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
      {registerFormik.errors.password && registerFormik.touched.password ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {registerFormik.errors.password}
</div>:''}
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input value={registerFormik.values.rePassword } onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur}  type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="repassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">repassword</label>
      {registerFormik.errors.rePassword && registerFormik.touched.rePassword? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {registerFormik.errors.rePassword}
</div>:''}
  </div>

  
  
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit

{/* <p>counter:{value.counter}</p> */}

  </button>
</form>
</div>

  
  
  </>
}
