import React from 'react'

import { useState, useEffect } from "react";
import { db } from "../firebase-cfg";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";



//firestrom
export default function DataBaseOperations() {

    //db management
    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState(0);

    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "users");

    const createUser = async () => {
        await addDoc(usersCollectionRef, { name: newName, phone: Number(newAge) });
    };

    const updateUser = async (id, phone) => {
        const userDoc = doc(db, "users", id);
        const newFields = { phone: phone + 1 };
        await updateDoc(userDoc, newFields);
    };

    const deleteUser = async (id) => {
        const userDoc = doc(db, "users", id);
        await deleteDoc(userDoc);
    };

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getUsers();
    }, []);



    return (
        <div>
                <input
                    placeholder="Name..."
                    onChange={(event) => {
                        setNewName(event.target.value);
                    }}
                />

                <input
                    type="number"
                    placeholder="phone..."
                    onChange={(event) => {
                        setNewAge(event.target.value);
                    }}
                />

                <button onClick={createUser}> Create User</button>
                
                
                {users.map((user) => {
                    return (
                        <div>
                            {" "}
                            <h1>Name: {user.name}</h1>
                            <h1>phone: {user.phone}</h1>
                            
                            <button
                                onClick={() => {
                                    updateUser(user.id, user.phone);
                                }}
                            >
                                {" "}
                                Increase phone
                            </button>
                            
                            <button
                                onClick={() => {
                                    deleteUser(user.id);
                                }}
                            >
                                {" "}
                                Delete User
                            
                            </button>
                        </div>
                    );
                })}

        </div>
    )
}
