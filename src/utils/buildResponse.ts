import { formatJSONResponse } from '@libs/api-gateway';



export const buildResponse = (statusCode: number,message:string,error:object,data:object) => {
    switch (statusCode) {
        case 200:
            return formatJSONResponse({ statusCode: statusCode, message, error,data})
            break;
        case 400:
            return formatJSONResponse({ statusCode, message, error,data })
            break;
        // add more cases if need be
        default:
            return formatJSONResponse({ statusCode: statusCode, message, error,data })
    }
  }

