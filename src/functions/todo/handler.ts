import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { middyfy } from '@libs/lambda';
import { v4 } from "uuid";
import todosService from '../../services'
import { buildResponse } from '../../utils/buildResponse';



export const getAllTodos = middyfy(async (): Promise<APIGatewayProxyResult> => {
    
    try {
       const todos = await todosService.getAllTodos();
        return buildResponse(200,todos,"Todos retrieved successfully!");
   } 
    catch (e) {
        return buildResponse(500, e.message, "An error occured!");
    }
})

export const createTodo = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const id = v4();
        const todo = await todosService.createTodo({
            id,
            label: event.body.label,
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),

        })
        return buildResponse(200,todo,"Todo added successfully!");
    } catch (e) {
        return buildResponse(500, e.message, "An error occured!");
    }
})

export const getTodo = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
        const todo = await todosService.getTodo(id)
        return buildResponse(200, todo, "Todo retrieved successfully!");
    } catch (e) {
        return buildResponse(500, e.message, "An error occured!");
    }
})

export const updateTodo = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    const { label, completed } = event.body; 
    const updatedAt = new Date().toISOString()
    try {
        const todo = await todosService.updateTodo(id, { completed, label, updatedAt });
        return buildResponse(200, todo, "Todo updated successfully!");
    } catch (e) {
        return buildResponse(500, e.message, "An error occured!");
    }
})

export const deleteTodo = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
        const todo = await todosService.deleteTodo(id)
        return buildResponse(200, todo, "Todo deleted successfully!");
    } catch (e) {
        return buildResponse(500, e.message, "An error occured!");
    }
})