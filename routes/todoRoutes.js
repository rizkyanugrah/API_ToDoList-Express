const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware.authenticate); // Middleware untuk autentikasi

router.post("/", todoController.createTodo);
router.get("/", todoController.getAllTodos);
router.get("/:id", todoController.getTodoById);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);
router.delete("/", todoController.deleteAllTodos);

module.exports = router;
