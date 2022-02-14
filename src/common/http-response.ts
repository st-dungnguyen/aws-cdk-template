const HTTP_OK = 200;
const HTTP_NOT_FOUND = 404; 

export const response = (statusCode: number, body: any) => {
  return {
    statusCode,
    body: JSON.stringify(body),
  };
};

export const success = (body: any) => {
  return response(HTTP_OK, body)
};

export const notFound = (body: any) => {
  return response(HTTP_NOT_FOUND, body)
};
