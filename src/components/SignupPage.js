import React from "react";
import Navbar from './Navbar'
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

import { useState } from "react";
import { useUserAuth } from "./UserAuthContext";

export default function SignupPage() {
  
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  const { logIn, googleSignIn } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };
  
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    
    <>
    <Navbar/>
    <div class="tab-content container">
    <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
    {error && <Alert variant="danger">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <div class="text-center mb-3">
          <p>Sign Up with:</p>
          
          <button type="button" class="btn btn-link btn-floating mx-1">
            <i class="fab fa-google" onClick={handleGoogleSignIn}></i>
          </button>

        </div>

        <p class="text-center">or:</p>



        <div class="form-outline mb-4">
          <input type="email" id="loginName" class="form-control" onChange={(e)=>setEmail(e.target.value)}/>
          <label class="form-label" for="loginName">Email</label>
        </div>


        <div class="form-outline mb-4">
          <input type="password" id="loginName" class="form-control" onChange={(e)=>setPassword(e.target.value)}/>
          <label class="form-label" for="loginName">Password </label>
        </div>


        <div class="row mb-4">
          <div class="col-md-6 d-flex justify-content-center">

            <div class="form-check mb-3 mb-md-0">
              <input class="form-check-input" type="checkbox" value="" id="loginCheck" checked />
              <label class="form-check-label" for="loginCheck"> Remember me </label>
            </div>
          </div>

          <div class="col-md-6 d-flex justify-content-center">

            <a href="#!">Forgot password?</a>
          </div>
        </div>


        <button type="submit" class="btn btn-primary btn-block mb-4" >Sign up</button>


      </form>
    </div>

  </div> 
 
  </>
  );

}