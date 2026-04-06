export default function handler(_request, response) {
  response.status(200).json({
    status: "ok",
    service: "torres-web-api",
    timestamp: new Date().toISOString()
  });
}
