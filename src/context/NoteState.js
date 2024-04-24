import React, { useState } from 'react';
import noteContext from './noteContext';

const NoteState = (props) => {
    // Initial state for notes
    const allnotetxt = [];
    


    // Function to fetch notes from the server
    const notesss = async () => {
        
            const response = await fetch("http://localhost:5000/api/note/notesss", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                    "auth": localStorage.getItem('token')
                },
            });

            const json = await response.json();
              // Log the response for debugging
            // Set notes state with the fetched data
            setNote(json);
          
        
    };






    // State for notes
    const [notes, setNote] = useState(allnotetxt);








    // Function to add a new note
    const addNote = async (title, description, tag) => {
       
    const data = {
        title : title,
        description : description,
        tag : tag
    }
        
            const response = await fetch("http://localhost:5000/api/note/addNote", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                    "auth": localStorage.getItem('token')
                },
                body: JSON.stringify(data)
            });
    
            if (response.ok) {
                const newNote = await response.json();
                setNote([...notes, newNote]); // Update state with the new note added
            } 
        
    };










    // Function to delete a note
    const delNote = async (id) => {
        // Implement delete note functionality

        const response = await fetch(`http://localhost:5000/api/note/deleteDocument/${id}`, {
            method: "DELETE", 
            headers: {
                "Content-Type": "application/json",
                "auth": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json)
        console.log("Deleting the note with id" + id);
        const newNote = notes.filter((note) => note._id !== id);
        setNote(newNote);
    }






    // Function to edit a note
    const editNote = async (id, title, description, tag) => {
        const data = {
            id: id,
            title: title,
            description: description,
            tag: tag
        };
    
        const response = await fetch(`http://localhost:5000/api/note/updateNote/${id}`, {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json",
                "auth": localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            // Update the local state with the edited note
            const updatedNotes = notes.map(note => {
                if (note._id === id) {
                    return { ...note, title, description, tag };
                }
                return note;
            });
            setNote(updatedNotes);
            return await response.json(); 
        } 
    };












    return (
        <noteContext.Provider value={{ notes, addNote, delNote, editNote, notesss }}>
            {props.children}
        </noteContext.Provider>
    );
}

export default NoteState;
