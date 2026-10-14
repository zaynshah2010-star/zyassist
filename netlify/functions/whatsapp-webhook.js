exports.handler = async (event) => {
  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

  if (event.httpMethod === "GET") {
    const params = event.queryStringParameters || {};

    if (
      params["hub.mode"] === "subscribe" &&
      params["hub.verify_token"] === verifyToken &&
      params["hub.challenge"]
    ) {
      return {
        statusCode: 200,
        body: params["hub.challenge"]
      };
    }

    return { statusCode: 403, body: "Verification failed" };
  }

  if (event.httpMethod === "POST") {
    console.log("WhatsApp webhook event received");

    return { statusCode: 200, body: "EVENT_RECEIVED" };
  }

  return { statusCode: 405, body: "Method not allowed" };
};
