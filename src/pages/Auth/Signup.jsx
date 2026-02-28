import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { UserIcon, MailIconSign, LockIconSign, EyeIcon, EyeOffIcon, GoogleIcon, UserVerifiedIcon, CheckCircleFilled, CrossCircle } from '../../components/Icons.jsx'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/auth/userSlice.js'
import { api_server_key } from '../../server.js'
import { toast } from 'react-toastify';



const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [passType, setPassType] = useState("password")

  const formSchema = yup.object({
    name: yup.string().required().min(3, "Your name is at least 3 characters long"),
    email: yup.string().required().email('Invalid email address'),
    password: yup.string().required().min(6, 'Password must be at least 6 characters long'),
  })


  const {
    handleSubmit,
    register,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(formSchema)
  })

  const findusername = watch("userName");

  // handel Signup function
  const handelSignup = async (data) => {
    try {

      let createUser = await axios.post(`${api_server_key}/api/auth/signup`, data, {
        withCredentials: true
      })
      toast.success(`${data?.name} your account is created successfully`, {position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
      className: 'Toastify__toast',
      })
      console.log(createUser.data.user)
      navigate("/")
      dispatch(setUser(createUser.data.user))

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message, {
        position: "top-right",
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
      <div className='max-[768px]:bg-contain object-fill  z-1 opacity-5 absolute w-screen h-screen '>

      </div>
      <div className=' z-100 min-w-[300px]  w-full h-screen text-white flex flex-col items-center justify-center relative' >


        <form onSubmit={handleSubmit(handelSignup)} className='min-h-[450px] w-[320px] max-[350px]:w-[90%] p-4  flex flex-col gap-6 items-center border-[#262626] border-[1px]  bg-[#000000] rounded-[10px]'>

          <div className='w-[100%] flex flex-col justify-center items-center'>
            <h1 className='text-[24px] font-semibold '>Create an account</h1>
            <h3 className='text-[13px] text-center text-[#9f9fa9]'>Enter your details below to create your account</h3>
          </div>


          <div className='w-[100%] flex flex-col gap-2'>

            {/*  Name Input */}
            <div>
              <div className={`${errors.name ? 'border-red-600' : 'border-[#262626]'} w-full flex border-[1px] border-[#262626] rounded-[8px]  dark:bg-[#0a0a0a]`}>
                <div className='flex items-center justify-center pl-2'>{<UserIcon />}</div>
                <input autoComplete='name' type="text" className='w-full p-[8px] text-[14px] outline-none' {...register('name')} placeholder='Full Name' />
              </div>
              {errors.name && <span className='text-[12px] text-red-600'>{errors.name.message}</span>}
            </div>

            

            {/* Email Input */}

            <div>
              <div className={`${errors.email ? 'border-red-600' : 'border-[#262626]'} w-full flex border-[1px] border-[#262626] rounded-[8px]  bg-[#0a0a0a]`}>
                <div className='flex items-center justify-center pl-2'>{<MailIconSign />}</div>
                <input autoComplete='email' type="text" className='w-full p-[8px] text-[14px] outline-none' {...register('email')} placeholder='Email' />
              </div>
              {errors.email && <span className='text-[12px] text-red-600'>{errors.email.message}</span>}
            </div>

            {/* Password Input */}

            <div>
              <div className={`${errors.password ? 'border-red-600' : ' border-[#262626]'} w-full flex border-[1px]  border-[#262626]  rounded-[8px]  bg-[#0a0a0a]`}>
                <div className='flex items-center justify-center pl-2'>{<LockIconSign />}</div>
                <input autoComplete='new-password' type={passType === "password" ? "password" : "text"} className='w-full p-[8px] text-[14px] outline-none' {...register('password')} placeholder='Password' />
                <button className='pr-2' type='button' onClick={() => setPassType(passType === "password" ? "text" : "password")}>{passType === "password" ? <EyeIcon /> : <EyeOffIcon />}</button>
              </div>
              {errors.password && <span className='text-[12px] text-red-600'>{errors.password.message}</span>}
            </div>




            {/* ///////////////////////////////////////////////// */}

            <button disabled={isSubmitting} type='submit'  className='flex justify-center items-center w-full  p-[7px]  rounded-[8px] max-[400px]:text-[15px] font-semibold text-black bg-white hover:bg-[#cfcfcf]'>Create Account</button>
          </div>

          <div className='w-[100%] h-[1px] text-[14px] grid place-items-center bg-[#9f9fa9] before:text-[#9f9fa9] before:font-semibold before:content-["OR"] before:absolute  before:bg-[black]  before:w-[60px] before:text-center '></div>

          <button type='button' className=' max-[400px]:text-[15px] flex justify-center items-center gap-2 w-full p-[7px] bg-balck rounded-[8px] font-semibold text-white bg-black dark:text-black  dark:bg-white dark:hover:bg-[#cfcfcf]'>
            <GoogleIcon />
            continue with Google
          </button>


          <div className='text-[13px] text-[#9f9fa9]'>Already have an account? <Link to={'/auth/login'} className='underline'> Log in</Link></div>

        </form>

      </div>
    </>

  )
}

export default Signup
