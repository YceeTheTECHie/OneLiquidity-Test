import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'oneliquidity-test',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild','serverless-offline', 'serverless-dynamodb-local'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iam: {
      role: {
        statements: [{
          Effect: "Allow",
          "Action": [
            "dynamoDB:DescribeTable",
            "dynamoDB:Query",
            "dynamoDB:Scan",
            "dynamoDB:GetItem",
            "dynamoDB:PutItem",
            "dynamodb:UpdateItem",
            "dynamodb:DeleteItem"
          ],
        Resource: "arn:aws:dynamodb:us-west-2:*:table/Todo",
        }]
      }
    }
  },
  // import the function via paths
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
      dynamodb: {
        start:{
          port: 5000,
          inMemory: true,
          migrate: true,
        },
        stages: "dev"
      }
  },
  resources: {
    Resources: {
      Todo: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "Todo",
          AttributeDefinitions: [{
            AttributeName: "Id",
            AttributeType: "S",
          }],
          KeySchema: [{
            AttributeName: "Id",
            KeyType: "HASH"
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          },

        }
      }
    }
  },
};

module.exports = serverlessConfiguration;
