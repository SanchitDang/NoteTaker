import React , {useEffect} from 'react'
import Navbar from './Navbar'
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "./UserAuthContext";
import NotesList from './NotesList';
import Header from './Header';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase-cfg";


const Home = () => {


  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/SigninPage");
    } catch (error) {
      console.log(error.message);
    }

  };

  //db management
  const usersCollectionRef = collection(db, "users");

  //add note to db
  const addNote = async (text) => {
    const date = new Date();
    await addDoc(
      usersCollectionRef,
      {name: text, date: date.toLocaleDateString()} );
  };

  //delete note from db
  const deleteNote = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  //UI
  return (
    <>
      <Navbar title="Notes Taker" />

      <div className='container mt-4'>
        <Header />
        <NotesList
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>

      <div className="d-grid gap-3">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>

    </>
  )
}


export default Home;