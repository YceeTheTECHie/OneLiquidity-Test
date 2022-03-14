require("dotenv").config();
import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
export const dynamoDBClient = (): DocumentClient => {
    if (process.env.LOCAL) {
        return new AWS.DynamoDB.DocumentClient({
            region: `${process.env.REGION}`,
            endpoint: `${process.env.LOCAL_URL}`,
        });
    }
    return new AWS.DynamoDB.DocumentClient();
};




module.exports = { dynamoDBClient }