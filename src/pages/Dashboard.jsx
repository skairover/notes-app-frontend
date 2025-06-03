import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NoteForm from "../Components/NoteForm.jsx";
import NoteCard from "../Components/NoteCard.jsx";

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchNotes();
    }
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err) {
      alert("Failed to fetch notes");
    }
  };

  const handleAddNote = async (note) => {
    try {
      const res = await axios.post("http://localhost:5000/api/notes", note, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes([...notes, res.data]);
    } catch (err) {
      alert("Failed to add note");
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      alert("Failed to delete note");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* Overlay Note Form for Mobile */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
            <NoteForm
              onAdd={(note) => {
                handleAddNote(note);
                setShowForm(false);
              }}
            />
            <button
              onClick={() => setShowForm(false)}
              className="mt-4 text-blue-600 underline text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div className="min-h-screen w-screen grid grid-cols-1 md:grid-cols-[250px_1fr] bg-gray-900 text-white">
        {/* Left Panel - hidden on mobile */}
        <div className="bg-[#0c1b33] p-4 border-r border-gray-700 hidden md:block">
          <NoteForm onAdd={handleAddNote} />
        </div>

        {/* Right Panel */}
        <div className="p-6">
          <h1 className="text-4xl font-serif font-bold mb-6">Dashboard</h1>

          <div className="flex mb-4 border">
            <button
              onClick={handleLogout}
              className="fixed right-5 top-3 m-[10px] mt-[15px] bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>

          {/* Notes List */}
          <div className="flex flex-wrap gap-4">
            {notes.length === 0 ? (
              <p className="text-gray-400">No notes yet.</p>
            ) : (
              notes.map((note) => (
                <NoteCard key={note._id} note={note} onDelete={handleDeleteNote} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Floating Add Button for Mobile */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white text-9xl rounded-[50px] w-14 h-14 flex items-center justify-center shadow-lg md:hidden z-40"
      >
        +
      </button>
    </>
  );
}
