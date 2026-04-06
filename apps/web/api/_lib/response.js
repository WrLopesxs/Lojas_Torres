export function allowMethods(request, response, methods) {
  response.setHeader("Allow", methods.join(", "));

  if (!methods.includes(request.method)) {
    response.status(405).json({ message: "Método não permitido." });
    return false;
  }

  return true;
}
