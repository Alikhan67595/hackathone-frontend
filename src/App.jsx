import { useState, useEffect } from 'react'
import { Route, Routes,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './redux/auth/userSlice.js'
import { api_server_key } from './server.js'
import axios from 'axios'
import Login from "./pages/Auth/Login.jsx"
import Signup from "./pages/Auth/Signup.jsx"
import Authlogin from './pages/Auth/Authlogin.jsx'
import Dashboard from './pages/Dashboard.jsx'

function App() {

   const user = useSelector(state => state.user.user)
  console.log("Current User:", user)
  const dispatch = useDispatch()

  const [loading , setLoading] = useState(true)


   const handelFetchUser = async()=>{
        try {
           let apiRes = await axios.get(`${api_server_key}/api/auth/fetchuser`,{withCredentials:true})
           console.log(apiRes.data.user)
          dispatch(setUser(apiRes.data.user))
          setLoading(false)
        } catch (error) {
           setLoading(false)
        }
      }
  
      useEffect(()=>{
        handelFetchUser()
      },[user?._id])

 let routes;

  if(user){
routes = (<Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path='*' element={<Dashboard/>} />
    </Routes>) 
  } 
  
  else if(!user){
routes = (
  <Routes>
          <Route path="/" element={<Authlogin />} />
        <Route path='/auth/login' element={<Login/>} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="*" element={<Authlogin />} />
     
</Routes>
)}


  return (
    <>
    {
      loading ? (<>Loading...</>) :
    (routes)  
    // routes
    }
  </>
  )
}

export default App
