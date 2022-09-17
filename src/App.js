
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home'
import Contact from './components/Contact'
import About from './components/About'
import SignupPage from './components/SignupPage';
import SigninPage from './components/SigninPage';
import { UserAuthContextProvider  } from "./components/UserAuthContext";
import ProtectedRoute from './components/ProtectedRoute';
import DataBaseOperations from "./components/DataBaseOperations";

function App() {

  //interface 
  return (
    <>

      <BrowserRouter>
      <UserAuthContextProvider>
        <Routes>
          <Route path="/" element={<ProtectedRoute> <Home/> </ProtectedRoute>}/>       
          <Route path="/About" element={<About/>}/>
          <Route path="/Contact" element={<Contact/>}/>
          <Route path="/SigninPage" element={<SigninPage/>}/>
          <Route path="/SignupPage" element={<SignupPage/>}/>
          <Route path="/dbo" element={<DataBaseOperations/>}/>
        </Routes>
        </UserAuthContextProvider>
      </BrowserRouter>
         
    </>
  );

}

export default App;
