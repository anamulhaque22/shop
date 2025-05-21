import HTTP_CODES from "./constants/http-codes";

async function wrapperFetchJsonResponse(response) {
  const status = response.status;
  return {
    status,
    data: [
      HTTP_CODES.NO_CONTENT,
      HTTP_CODES.SERVICE_UNAVAILABLE,
      HTTP_CODES.INTERNAL_SERVER_ERROR,
      HTTP_CODES.NOT_FOUND,
    ].includes(status)
      ? undefined
      : await response.json(),
  };
}

export default wrapperFetchJsonResponse;
