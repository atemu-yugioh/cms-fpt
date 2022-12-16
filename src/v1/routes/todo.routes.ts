import express from "express";
import TodoController from "../controller/todo.controller";

export const routes = express.Router();

// * Create Todo
routes.post("/todo", TodoController.create);

// * Get list todo
routes.get("/todo", TodoController.getList);

// * Get detail todo
routes.get("/todo/:id", TodoController.getDetail);

// * Update todo
routes.patch("/todo/:id", TodoController.update);

// * Delete todo
routes.delete("/todo/:id", TodoController.delete);
