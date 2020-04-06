/* eslint-disable no-useless-catch */
import jwt from 'jsonwebtoken';

export default async function isAuthenticated(request, response, next) {
  try {
    const token = request.headers['x-access-token'];
    const { parentId, type, name } = jwt.verify(token, process.env.JWT_SECRET);
    request.parentId = parentId;
    request.type = type;
    request.name = name;
    next();
  } catch (error) {
    response.status(401).send({ message: 'Unauthorized' });
  }
}
