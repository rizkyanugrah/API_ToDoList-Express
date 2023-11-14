const { Todo } = require("../models");

// CREATE TODO
const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validasi title dan description harus ada
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    // Membuat Todo Baru
    const newTodo = await Todo.create({
      title,
      description,
      userId: req.user.id,
    });

    // Respond with a success message
    res
      .status(201)
      .json({ message: "Todo created successfully", todo: newTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET_ALL_TODOS
const getAllTodos = async (req, res) => {
  try {
    // Mengambil semua data todos
    const todos = await Todo.findAll({ where: { userId: req.user.id } });

    // Respond all todos
    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET_TODO_BY_ID
const getTodoById = async (req, res) => {
  try {
    const todoId = req.params.id;

    // Mengambil Todo Berdasarkan ID
    const todo = await Todo.findOne({
      where: { id: todoId, userId: req.user.id },
    });

    // Cek apakah todo nya ada
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    // Respond memberikan todo yang di cari
    res.status(200).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// UPDATE TODO
const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const { title, description } = req.body;

    // Validasi input pengguna
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    // Pastikan Todo dengan ID tertentu milik pengguna yang sedang masuk
    const existingTodo = await Todo.findOne({
      where: { id: todoId, userId: req.user.id },
    });

    if (!existingTodo) {
      return res.status(404).json({
        error: "Todo not found or you don't have permission to update it",
      });
    }

    // Lakukan pembaruan
    await Todo.update({ title, description }, { where: { id: todoId } });

    // Respond dengan pesan keberhasilan
    res.status(200).json({ message: "Todo updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE TODO
const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;

    // Delete todo berdasarkan id
    const deletedRows = await Todo.destroy({
      where: { id: todoId, userId: req.user.id },
    });

    // Check if the todo was deleted
    if (deletedRows === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    // Respond with a success message
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE ALL TODO
const deleteAllTodos = async (req, res) => {
  try {
    // Delete all todos
    await Todo.destroy({ where: { userId: req.user.id } });

    // Respond with a success message
    res.status(200).json({ message: "All todos deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  deleteAllTodos,
};
