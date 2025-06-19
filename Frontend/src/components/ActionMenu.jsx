import { Check } from "lucide-react";
import { useState } from "react";

const ActionMenu = ({ onEdit, onDelete }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-300 rounded-md shadow-md z-10">
      <ul className="text-sm text-gray-800 font-medium">
        <li
          onClick={onEdit}
          onMouseEnter={() => setHovered("edit")}
          onMouseLeave={() => setHovered(null)}
          className="flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-gray-100"
        >
          <div className="w-4">
            {hovered === "edit" && <Check size={14} />}
          </div>
          <span>Edit</span>
        </li>
        <li
          onClick={onDelete}
          onMouseEnter={() => setHovered("delete")}
          onMouseLeave={() => setHovered(null)}
          className="flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-gray-100"
        >
          <div className="w-4">
            {hovered === "delete" && <Check size={14} />}
          </div>
          <span>Delete</span>
        </li>
      </ul>
    </div>
  );
};

export default ActionMenu;
