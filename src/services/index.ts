import dynamoDBClient from "../models";
import TodoService from "./todosService"

const todoService = new TodoService(dynamoDBClient());

export default todoService;