import { TodoAttributes, TodoInstance } from "./../entities/todo.entities";

export default class TodoService {
  create = async (todo: TodoAttributes) => {
    const newTodo = await TodoInstance.create(todo);
    return newTodo;
  };

  getList = async (limit: number, offset: number) => {
    const listTodo = await TodoInstance.findAll({ where: {}, limit, offset });
    return listTodo;
  };

  getDetail = async (id: string) => {
    const todo = await TodoInstance.findOne({ where: { id: id } });
    return todo;
  };

  update = async (
    id: string,
    infoUpdate: { title: string; completed: boolean }
  ) => {
    const todo = await TodoInstance.update(infoUpdate, { where: { id: id } });
    return todo;
  };

  delete = async (id: string) => {
    const todo = await TodoInstance.destroy({ where: { id: id } });
    return todo;
  };
}
