const HTTP_OK = 200;
export const HTTP_CREATED = 201;
export const HTTP_UPDATED = 204;
export const HTTP_BAD_REQUEST = 400;
const HTTP_NOT_FOUND = 404; 
export const HTTP_INTERNAL_SERVER_ERROR = 500;

export const response = (statusCode: number, body: any) => {
  return {
    statusCode,
    body: JSON.stringify(body),
  };
};

export const successResponse = (body: any) => {
  return response(HTTP_OK, body)
};

export const notFoundResponse = (body: any) => {
  return response(HTTP_NOT_FOUND, body)
};
