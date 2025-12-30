import { Route,Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import { useLocation } from "react-router-dom"

//private protected route
function RequireAuth({children}){
  const isLoggedIn = Boolean(localStorage.getItem('authToken'));
  const location= useLocation();
if(!isLoggedIn){
  return <Navigate to ='/login' state={{from:location}} replace/>
}
}
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path ="/login" element={<Login />}/>
      <Route path="/signup" element={<Signup/> } /> 
    </Routes>
  )
}
export default App