import React, { useContext } from 'react';
import noteContext from './noteContext';

const SomeComponent = () => {
    const { notes } = useContext(noteContext);

    return (
        <div>
            {notes.map((note) => (
                <div key={note._id}>{note.title}</div>
            ))}
        </div>
    );
}

export default SomeComponent;
