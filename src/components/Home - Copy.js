import React from 'react'
import Navbar from './Navbar'

import { useState, useEffect } from 'react';

import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "./UserAuthContext";

import { nanoid } from 'nanoid';
import NotesList from './NotesList';
import Search from './Search';
import Header from './Header';


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


  const [notes, setNotes] = useState([
    
    {
      id: nanoid(),
      text: "j",
      date: '10/09/2022',
    },

  ]);


  const [searchText, setSearchText] = useState('');

  //add note to db
  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  //delete note from db
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };


  //UI
  return (
    <>
      <Navbar title="Notes Taker" />

      
        
          <div className='container mt-4'>
            <Header/>
            <Search handleSearchNote={setSearchText} />
            <NotesList
              notes={notes.filter((note) =>
                note.text.toLowerCase().includes(searchText)
              )}
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