import React, { useEffect } from 'react'
import { useState , useRef } from 'react'
import { Link, useNavigate } from 'react-router'
import {useForm} from 'react-hook-form'
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import {UserIcon, MailIconSign, LockIconSign, EyeIcon, EyeOffIcon, GoogleIcon, UserVerifiedIcon, CheckCircleFilled, CrossCircle} from '../../components/Icons.jsx'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/auth/userSlice.js'
import { api_server_key } from '../../server.js'
  import { toast } from 'react-toastify';



const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [passType ,setPassType] = useState("password")


  const formSchema = yup.object({
    email: yup.string().required("email is required").min(3),
    password: yup.string().required().min(6,'Password must be at least 6 characters long'),
  })


   const {
    handleSubmit,
    register,
    watch,
    reset,
    setValue,
    formState: { errors , isSubmitting}
  } = useForm({
    resolver: yupResolver(formSchema)
  })

const findusername = watch("userName"); 

// handel Login function
  const handelLogin = async(data)=>{
try {

  let createUser = await axios.post(`${api_server_key}/api/auth/login`,data,{
  withCredentials: true
})
toast.success(`${createUser?.data?.user?.name} you are loged in successfully`, {position: "top-center",
autoClose: 3000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: false,
draggable: false,
progress: undefined,
theme: "dark",
})
  console.log(createUser)
  dispatch(setUser(createUser.data.user))
  navigate("/")
} catch (error) {
  console.log(error)
  toast.error(error.response.data.message, {position: "top-right",
autoClose: 3000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
})
}
  }
  
 


  return (
    <>
    
    <div className=' z-100 min-w-[300px]  w-full h-screen text-white flex flex-col items-center justify-center relative' >
    

 <form onSubmit={handleSubmit(handelLogin)} className='min-h-[400px] w-[320px] max-[350px]:w-[90%] p-4  flex flex-col gap-6 items-center justify-center border-[#262626] border-[1px]  bg-[#000000] rounded-[10px]'>

  <div className='w-[100%] flex flex-col justify-center items-center'>
  <h1 className='text-[24px] font-semibold '>Welcome back!</h1>
  <h3 className='text-[13px] text-center text-[#9f9fa9]'>Please enter your details to continue</h3>
  </div>


<div className='w-[100%] flex flex-col gap-3'>

{/* emailOrUserName */}
<div>
<div className={`${errors.email ? 'border-red-600' : 'border-[#262626]'} w-full flex border-[1px] border-[#262626] rounded-[8px]  dark:bg-[#0a0a0a]`}>
  <div className='flex items-center justify-center pl-2'>{<UserIcon/>}</div>
  <input type="text" className='w-full p-[8px] text-[14px] outline-none' {...register('email')} placeholder='email or username' />
</div>
 {errors.email && <span className='text-[12px] text-red-600'>{errors.email.message}</span>}
  </div>




{/* Password Input */}

<div>
  <div className={`${errors.password ? 'border-red-600' : ' border-[#262626]'} w-full flex border-[1px]  border-[#262626]  rounded-[8px]  bg-[#0a0a0a]`}>
    <div className='flex items-center justify-center pl-2'>{<LockIconSign/>}</div>
  <input  type={passType === "password" ? "password" : "text"} className='w-full p-[8px] text-[14px] outline-none' {...register('password')} placeholder='Password' />
<button className='pr-2' type='button' onClick={()=>setPassType(passType === "password" ? "text" : "password")}>{passType === "password" ? <EyeIcon/> : <EyeOffIcon/>}</button>
  </div>
   {errors.password && <span className='text-[12px] text-red-600'>{errors.password.message}</span>}
</div>




{/* ///////////////////////////////////////////////// */}

  <button  type='submit' disabled={isSubmitting}  className='flex justify-center items-center w-full  p-[7px] bg-balck rounded-[8px] max-[400px]:text-[15px] font-semibold text-black bg-white hover:bg-[#cfcfcf]'>Log in</button>
</div>

 <div className='w-[100%] h-[1px] text-[14px] grid place-items-center bg-[#9f9fa9] before:text-[#9f9fa9] before:font-semibold before:content-["OR"] before:absolute before:bg-[black]  before:w-[60px] before:text-center '></div>

<button type='button' className=' max-[400px]:text-[15px] flex justify-center items-center gap-2 w-full p-[7px]  rounded-[8px] font-semibold text-black  bg-white hover:bg-[#cfcfcf]'>
 <GoogleIcon/> 
  continue with Google
  </button>


<div className='text-[13px] text-[#9f9fa9]'>Don't have an account? <Link to={'/auth/signup'} className='underline'> Sign up</Link></div>

 </form>

    </div>
</>

  )
}

export default Login
