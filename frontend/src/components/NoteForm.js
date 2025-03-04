import React, { useState } from 'react';

export default function NoteForm({ onNoteAdded }) {
    const [title, setTitle] = useState('');
    const [explanation, setExplanation] = useState('');
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const note = { title, explanation };

        try {
            const response = await fetch('/api/notes', {
                method: 'POST',
                body: JSON.stringify(note),
                headers: { 'Content-Type': 'application/json' },
            });

            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.error || 'Something went wrong!');
            }

            // Başarı durumunda formu sıfırla ve üst bileşene bildir
            setTitle('');
            setExplanation('');
            console.log('New Note Added:', json);

            if (onNoteAdded) {
                onNoteAdded(json); // Yeni notu üst bileşene aktar
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="create">
            <h3>Add New Note</h3>
            <div className="create-group">
                <div>
                    <label>Note Title:</label>
                    <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        disabled={isSubmitting}
                    />
                </div>
                <div>
                    <label>Note Explanation:</label>
                    <input
                        type="text"
                        onChange={(e) => setExplanation(e.target.value)}
                        value={explanation}
                        disabled={isSubmitting}
                    />
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Adding...' : 'Add'}
                </button>
                {error && <div className="error">{error}</div>}
            </div>
        </form>
    );
}
