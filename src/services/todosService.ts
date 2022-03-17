import { DocumentClient } from "aws-sdk/clients/dynamodb";

import Todo from "../models/todo";

export default class TodoService {

    private Tablename: string = "Todo";

    constructor(private docClient: DocumentClient) { }

    async getAllTodos(): Promise<Todo[]> {
        const todos = await this.docClient.scan({
            TableName: this.Tablename,
        }).promise()
        return todos.Items as Todo[];
    }

    async createTodo(todo: Todo): Promise<Todo> {
        await this.docClient.put({
            TableName: this.Tablename,
            Item: todo
        }).promise()
        return todo as Todo;

    }

    async getTodo(id: string): Promise<any> {

        const todo = await this.docClient.get({
            TableName: this.Tablename,
            Key: {
                id
            }
        }).promise()
        if (!todo.Item) {
            throw new Error("Id does not exist");
        }
        return todo.Item as Todo;

    }

    async updateTodo(id: string, todo: Partial<Todo>): Promise<Todo> {
     
        const todoObj = {
            label: todo.label,
            completed: todo.completed,
            updatedAt: new Date().toISOString()
     };
  let updateExpression='set';
  let ExpressionAttributeNames={};
  let ExpressionAttributeValues = {};
        for (const property in todoObj) {
            if (property != undefined) {
                updateExpression += ` #${property} = :${property} ,`;
                ExpressionAttributeNames['#' + property] = property;
                ExpressionAttributeValues[':' + property] = todoObj[property];
            }
  }

        updateExpression = updateExpression.slice(0, -1);
        
        const updated = await this.docClient
            .update({
                TableName: this.Tablename,
                Key: {id },
                UpdateExpression: updateExpression,
                ExpressionAttributeNames:ExpressionAttributeNames,
                ExpressionAttributeValues:ExpressionAttributeValues,
                ReturnValues: "ALL_NEW",
            })
            .promise();

        return updated.Attributes as Todo;
    }


    async deleteTodo(id: string): Promise<any> {
        return await this.docClient.delete({
            TableName: this.Tablename,
            Key: {
            id
            }
        }).promise()

    }
}
