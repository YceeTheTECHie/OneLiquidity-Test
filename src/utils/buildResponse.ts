import { formatJSONResponse } from '@libs/api-gateway';



export const buildResponse =  (statusCode, data,message) => {
  return formatJSONResponse({
    statusCode: statusCode,
    message,
    data
  }
  )}

