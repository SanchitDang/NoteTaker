import { React, useState } from 'react'
import Navbar from './Navbar'
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "./UserAuthContext";
import NotesList from './NotesList';
import uniqid from 'uniqid';
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase-cfg";

//*DATA FETCHING from NotesLists.js* 

const Home = () => {
  const [val, setVal] = useState("");

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

  //add note to db
  const addNote = async (text) => {
    const date = new Date();
    await setDoc(doc(
      db, "users", auth.currentUser.uid, "messages", uniqid()),
      { name: text, date: date.toLocaleDateString() });
  };

  //delete note from db
  const deleteNote = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    window.location.reload(false);
  };

  //UI
  return (
    <>
      <Navbar title="Notes Taker" />

      <div className='container mt-4'>
        <div className='header'>
          <h1>Notes</h1>
        </div>
        <NotesList
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>

      <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>

    </>
  )
}

export default Home;