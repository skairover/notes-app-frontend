import { useState } from "react";

export default function NoteCard({ note, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="w-[200px] bg-white p-4 rounded shadow text-black cursor-pointer flex flex-col transition-all duration-300"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <h3 className="text-lg font-bold mb-2">{note.title}</h3>

      <p
        className="mb-3 transition-all duration-300"
        styles={{overflowWrap: 'break-word', whitespace:'pre-wrap' }}>
        {isExpanded ? note.content : note.content.split("\n")[0]}
      
       
      </p>

      <button
        onClick={(e) => {
          e.stopPropagation(); // prevent card click from toggling
          onDelete(note._id);
        }}
        className="self-end px-4 py-2"
      >
        🗑️
      </button>
    </div>
  );
}
