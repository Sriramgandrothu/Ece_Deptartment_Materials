import { ErrorHandlerService } from "../services/index.js";

const authMiddleware = async (req, res, next) => {
  // Removed access token logic
  try {
    // No access token verification here

    req.userData = {}; // If needed, add user data handling here
    next();
  } catch (error) {
    next(ErrorHandlerService.unAuthorized());
  }
};

export default authMiddleware;
