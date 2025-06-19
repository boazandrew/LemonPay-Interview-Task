const Todo = require("../models/todo.model");

exports.createTodo = async (req, res) => {
  const { task, description, dueDate } = req.body;
  console.log("CREATE TODO:", { task, description, dueDate, user: req.user });

  try {
    const todo = await Todo.create({
      task,
      description,
      dueDate,
      userId: req.user?.userId, 
    });
    res.status(201).json(todo);
  } catch (err) {
    console.error("Error in createTodo:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.getTodo = async (req, res) => {
  try {
    const todo = await Todo.find({ userId: req.user.userId });
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { task, description, dueDate } = req.body;

  try {
    const updated = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      { task, description, dueDate },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Todo.findOneAndDelete({
      _id: id,
      userId: req.user.userId,
    });
    if (!deleted) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
