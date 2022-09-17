import Note from './Note';
import AddNote from './AddNote';
import { useState, useEffect } from "react";
import { db } from "../firebase-cfg";
import { collection, getDocs } from "firebase/firestore";

const NotesList = ({
	handleAddNote,
	handleDeleteNote,
}) => {

	const [users, setUsers] = useState([]);
	const usersCollectionRef = collection(db, "users");
	useEffect(() => {
		const getUsers = async () => {
			const data = await getDocs(usersCollectionRef);
			setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};

		getUsers();
	}, []);


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