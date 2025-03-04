import React, { useState } from 'react';

export default function NoteDetails({ note, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(note.title);
    const [editedExplanation, setEditedExplanation] = useState(note.explanation);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);

    const handleUpdate = async () => {
        setError(null);
        try {
            const response = await fetch(`/api/notes/${note._id}`, {
                method: 'PATCH',
                body: JSON.stringify({ title: editedTitle, explanation: editedExplanation }),
                headers: { 'Content-Type': 'application/json' },
            });

            const updatedNote = await response.json();


            if (!response.ok) {
                setError(updatedNote.error || 'Failed to update the note');
                return;
            }

            onUpdate(updatedNote);
            setIsEditing(false);
        } catch (err) {
            console.log(err)
            setError('Something went wrong. Please try again.');
        }
    };

    // Silme işlemi
    const handleDelete = async () => {
        setIsDeleting(true); // Silme işlemi başladığını belirt
        try {
            const response = await fetch(`/api/notes/${note._id}`, { method: 'DELETE' });

            if (!response.ok) {
                throw new Error('Failed to delete the note.');
            }

            onDelete(note._id); // Notu silindikten sonra üst bileşene bildir
        } catch (error) {
            console.error(error.message);
            alert('An error occurred while deleting the note.');
        } finally {
            setIsDeleting(false); // İşlem tamamlandı
        }
    };

    return (
        <div className="note-details">
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        value={editedExplanation}
                        onChange={(e) => setEditedExplanation(e.target.value)}
                    />
                    <button onClick={handleUpdate} disabled={isDeleting}>
                        {isDeleting ? 'Saving...' : 'Save'}
                    </button>
                    <button onClick={() => setIsEditing(false)} disabled={isDeleting}>
                        Cancel
                    </button>
                    {error && <p className="error">{error}</p>}
                </div>
            ) : (
                <div>
                    <h4>{note.title}</h4>
                    <p>{note.explanation}</p>
                    <p>{new Date(note.createdAt).toLocaleString()}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className={`delete-btn ${isDeleting ? 'loading' : ''}`}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            )}
        </div>
    );
}
