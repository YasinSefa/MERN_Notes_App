import React, { useEffect, useState } from 'react'
import NoteDetails from '../components/NoteDetails'
import NoteForm from '../components/NoteForm'

export default function Home() {

    const [notes, setNotes] = useState(null)

    useEffect(() => {
        const fetchNotes = async () => {

            const response = await fetch('/api/notes')
            const json = await response.json()

            if (response.ok) {
                setNotes(json)
            }
        }

        fetchNotes()
    }, [])

    const handleNoteAdded = (newNote) => {
        setNotes((prevNotes) => [newNote, ...prevNotes]); // Yeni notu en başa ekler
    };

    const handleDelete = (id) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    };

    const handleUpdate = (updatedNote) => {
        setNotes(prevNotes => prevNotes.map(note =>
            note._id === updatedNote._id ? updatedNote : note
        ));
    };


    return (
        <div class="home">
            <div class="note-form">
                <NoteForm onNoteAdded={handleNoteAdded} />
            </div>
            <div class="notes">
                {notes && notes.map((note) => (
                    <NoteDetails key={note._id} note={note} onDelete={handleDelete} onUpdate={handleUpdate} />
                ))}
            </div>
        </div>
    )
}
