import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import Init from './pages/Init'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogOut from './pages/UserLogOut'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapped from './pages/CaptainProtectedWrapped'
import CaptainLogout from './pages/CaptainLogout'
function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignUp />} />
        <Route path="/captain-login" element={<CaptainLogin/>}/>
        <Route path="/captain-signup" element={<CaptainSignUp/>}/>
        <Route path="/home" element={
          <UserProtectedWrapper>
            <Init/>
          </UserProtectedWrapper>
        }/>
        <Route path="/user/logout" element={
          <UserProtectedWrapper>
            <UserLogOut/>
          </UserProtectedWrapper>
        } />
        <Route path="/captain/home" element={
          <CaptainProtectedWrapped>
          <CaptainHome/>
          </CaptainProtectedWrapped>
          }/>
        <Route path="/captain/logout" element={
          <CaptainProtectedWrapped>
          <CaptainLogout/>
          </CaptainProtectedWrapped>
          }/>
      </Routes>
    </div> 
  )
}

export default App
