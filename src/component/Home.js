import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/noteContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const history = useNavigate();
  const { notes, addNote, delNote, notesss, editNote } = useContext(noteContext);
  const [note, setNote] = useState({ title: "", description: "" });
  const [showAlert, setShowAlert] = useState(false); 

  useEffect(() => {
    if (localStorage.getItem('token')) {
      notesss();
    } else {
      history('/LogIn');
    }
  }, []);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description);
    setNote({ title: "", description: "" });

  };

  const ref = useRef(null);

  const updateNote = (note) => {
    setNote({
      _id: note._id,
      title: note.title,
      description: note.description,
      tag: note.tag
    });
    ref.current.click();
  };

  const handleUpdate = () => {
    editNote(note._id, note.title, note.description, note.tag);
    ref.current.click(); // Close the modal after updating the note
  };

  const handleDelete = (id) => {
    delNote(id);
    setShowAlert(true); 

   
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <div>
    

      <button type="button" ref={ref} className="btn btn-primary" style={{ display: 'none' }} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fs-5" id="exampleModalLabel">Add Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={handleChange}  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea rows="3" type="text" className="form-control" id="description" name="description" value={note.description} onChange={handleChange}  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleUpdate}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <h3>Add Notes</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={handleChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea rows="5" type="text" className="form-control" id="description" name="description" value={note.description} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
           
      {showAlert && (
        <div className="alert alert-danger my-3" role="alert">
          delete successfully!
        </div>
      )}

      <div className='container'>
        <h5>Your Notes</h5>
        <div className='row'>
          {Array.isArray(notes) && notes.map((note) => (
            <div className='col-md-3' key={note._id}>
              <div className="card my-3" style={{ overflow: 'hidden' }}>
                <div className="card-body">
                  <div className='d-flex align-items-center'>
                    <h5 className="card-title">{note.title}</h5>
                    <i style={{ cursor: "pointer" }} className="fa-solid fa-trash mx-3" onClick={() => handleDelete(note._id)}></i>
                    <i style={{ cursor: "pointer" }} className="fa-solid fa-file-circle-plus mx-1" onClick={() => updateNote(note)}></i>
                  </div>
                  <p className="card-text">{note.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
