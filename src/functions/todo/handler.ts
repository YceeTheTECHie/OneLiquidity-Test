import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { middyfy } from '@libs/lambda';
import { v4 } from "uuid";
import todosService from '../../services'
import { buildResponse } from '../../utils/buildResponse';
import { createTodoSchema,updateTodoSchema } from "./schemas";






export const createTodo = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        await createTodoSchema.validate(event.body, { abortEarly: false });
    }
    catch (e) {
        return buildResponse(400, "Validation Failed!",e.errors, {});
    }
    try {
        const id = v4();
        const todo = await todosService.createTodo({
            id, label: JSON.parse(JSON.stringify(event.body)).label, completed: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        })
        return buildResponse(200, "Todo added successfully!", {}, todo);
    }
     catch (e) {
        return buildResponse(500, "An error occured!", e.message,{});
    }
})

export const getTodo = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
        const todo = await todosService.getTodo(id)
        return buildResponse(200, "Todo retrieved successfully!", {},todo);
    }
    catch (e) {
        return buildResponse(500,"An error occured!",e.message, {});
    }
})

export const updateTodo = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    const { label, completed } = JSON.parse(JSON.stringify(event.body));
    const updatedAt = new Date().toISOString();
    try {
        await todosService.getTodo(id);
    }
    catch (e) {
        return buildResponse(400, "Bad request!", e.message, {});
    }
    try {
        await updateTodoSchema.validate(event.body, { abortEarly: false });
        const todo = await todosService.updateTodo(id, { completed, label, updatedAt });
        return buildResponse(200, "Todo updated successfully!", {}, todo);
    }
    catch (e) {
        return buildResponse(400, "Validation Failed!", e.errors, {});
    }
})
  

    export const deleteTodo = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        const id = event.pathParameters.id;
        try { await todosService.getTodo(id); }
        catch (e) { return buildResponse(400, "Bad request", e.message, {}) }
        try {
            const todo = await todosService.deleteTodo(id)
            return buildResponse(200, "Todo deleted successfully!", {}, todo);
        } catch (e) {
            return buildResponse(500, "An error occured!", e.message, {});
        }
    })

    export const getAllTodos = middyfy(async (): Promise<APIGatewayProxyResult> => {
    
    try {
        const todos = await todosService.getAllTodos();
        const data = todos.sort((prev, next) => -prev.updatedAt.localeCompare(next.updatedAt))
        return buildResponse(200, "Todos retrieved successfully!",{},data);
   } 
    catch (e) {
        return buildResponse(500, "An error occured!", e.message, {});
    }
})