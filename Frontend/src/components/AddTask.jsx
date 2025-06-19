import { useEffect, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

const AddTask = ({ onClose, onTaskAdded, initialData }) => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (initialData) {
      setTask(initialData.task || "");
      setDescription(initialData.description || "");
      setDueDate(new Date(initialData.dueDate).toISOString().slice(0, 16)); // format for datetime-local input
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialData && initialData._id) {
        await axios.put(
          `http://localhost:4000/api/todo/${initialData._id}`,
          { task, description, dueDate },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        
        await axios.post(
          "http://localhost:4000/api/todo",
          { task, description, dueDate },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      onTaskAdded(); 
      onClose(); 
    } catch (err) {
      console.error("Failed to save task:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-lg p-6 shadow-lg">
        <div className="relative mb-4 text-center">
          <h2 className="text-lg font-semibold">{initialData ? "Edit Task" : "Add Task"}</h2>
          <X
            className="absolute right-0 top-1 cursor-pointer"
            onClick={onClose}
          />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter Task Name"
            className="w-full px-3 py-2 rounded bg-gray-100"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            className="w-full px-3 py-2 rounded bg-gray-100"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="datetime-local"
            className="w-full px-3 py-2 rounded bg-gray-100"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          <div className="flex flex-col justify-center gap-4 pt-2">
            <button
              type="submit"
              className="bg-blue-800 text-white px-6 py-2 rounded-full"
            >
              {initialData ? "Update" : "Save"}
            </button>
            <button type="button" onClick={onClose} className="text-black">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
