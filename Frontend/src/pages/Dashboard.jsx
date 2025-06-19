import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Plus, MoreVertical } from "lucide-react";
import AddTask from "../components/AddTask";
import ActionMenu from "../components/ActionMenu"; // 👈 Create this component as explained below

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showMenuId, setShowMenuId] = useState(null);
  const [editTask, setEditTask] = useState(null);

  const tasksPerPage = 5;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/todo`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  };

  useEffect(() => {
    if (!token) return navigate("/");
    fetchTasks();
  }, [navigate, token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/todo/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
      setShowMenuId(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setShowAddTask(true);
    setShowMenuId(null);
  };

  const indexOfLast = currentPage * tasksPerPage;
  const indexOfFirst = indexOfLast - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  return (
    <div className="min-h-screen bg-white px-4 md:px-10 py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl md:text-2xl font-semibold text-blue-900">
          Tasks Management
        </h1>
        <button
          onClick={() => {
            setEditTask(null);
            setShowAddTask(true);
          }}
          className="bg-blue-800 text-white px-4 py-2 rounded-full text-sm flex items-center mb-1"
        >
          <Plus className="mr-1 w-4 h-4" /> Add Task
        </button>
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <div className="grid grid-cols-5 font-medium text-blue-900 text-sm px-4 py-2 border-b">
          <div>No</div>
          <div>Date & Time</div>
          <div>Task</div>
          <div>Description</div>
          <div className="text-right">Action</div>
        </div>
        <div className="space-y-3 mt-2 relative">
          {currentTasks.map((task, idx) => (
            <div
              key={task._id}
              className="grid grid-cols-5 items-center px-4 py-3 bg-white rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 relative"
            >
              <div>{indexOfFirst + idx + 1}</div>
              <div>{new Date(task.dueDate).toLocaleString()}</div>
              <div>{task.task}</div>
              <div>{task.description}</div>
              <div className="text-right relative">
                <MoreVertical
                  className="inline-block cursor-pointer"
                  onClick={() =>
                    setShowMenuId(showMenuId === task._id ? null : task._id)
                  }
                />
                {showMenuId === task._id && (
                  <ActionMenu
                    onEdit={() => handleEdit(task)}
                    onDelete={() => handleDelete(task._id)}
                    onClose={() => setShowMenuId(null)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-4">
        {currentTasks.map((task) => (
          <div
            key={task._id}
            className="border rounded-md p-4 shadow-sm flex justify-between items-start"
          >
            <div>
              <h3 className="font-semibold text-sm">{task.task}</h3>
              <p className="text-xs text-gray-500">{task.description}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(task.dueDate).toLocaleString()}
              </p>
            </div>
            <MoreVertical
              className="w-4 h-4 text-gray-600 mt-1"
              onClick={() =>
                setShowMenuId(showMenuId === task._id ? null : task._id)
              }
            />
            {showMenuId === task._id && (
              <ActionMenu
                onEdit={() => handleEdit(task)}
                onDelete={() => handleDelete(task._id)}
                onClose={() => setShowMenuId(null)}
              />
            )}
          </div>
        ))}
      </div>

      {/* Add/Edit */}
      {showAddTask && (
        <AddTask
          onClose={() => setShowAddTask(false)}
          onTaskAdded={fetchTasks}
          initialData={editTask}
        />
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-2 py-1 rounded bg-gray-100 disabled:opacity-50"
        >
          &lt;
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-2 py-1 rounded ${
              currentPage === i + 1 ? "bg-blue-800 text-white" : "bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-2 py-1 rounded bg-gray-100 disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
