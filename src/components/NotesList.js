import Note from './Note';
import AddNote from './AddNote';
import { useState, useEffect } from "react";
import { db, auth } from "../firebase-cfg";
import { collection, getDocs, doc } from "firebase/firestore";

const NotesList = ({ handleAddNote, handleDeleteNote, }) => {
	const [users, setUsers] = useState([]);
	const usersCollectionRef = collection(db, "users");
	
	//fetching DATA
	useEffect(() => {
		const getUsers = async () => {
			const dataRef = doc(db, "users", auth.currentUser.uid);
			const data = await getDocs(collection(dataRef, "messages"));
			setUsers(data.docs.map((doc) => ({...doc.data(), id : doc.id })));
		};
		getUsers();
	}                 );
	//before [] above

	//UI
	return (
		<div className='notes-list'>
			{users.map((user) => (
				<Note
					id={user.id}
					text={user.name}
					date={user.date}
					handleDeleteNote={handleDeleteNote}
				/>
			))}

			<AddNote handleAddNote={handleAddNote} />
		</div>
	);
};

export default NotesList;