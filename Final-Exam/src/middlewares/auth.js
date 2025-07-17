import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../controllers/user.js";


class AuthMiddlewares {
  /**
   * User AuthMiddlewares
   */

  // Middleware to validate user login
  static isAuthenticated = (req, res, next) => {
    try {
      // Extract token from Authorization header
      const authHeader = req.headers['authorization'] || req.get('Authorization');

      // Check if token exists, else return 401
      if (!authHeader) {
        return res.status(401).json({ error: "Authorization header is required" });
      }

      // Extract token from "Bearer token_data" format
      const token = authHeader.split(' ')[1]; // Remove "Bearer"

      if (!token) {
        return res.status(401).json({ error: "Token is required" });
      }

      // Verify token using jwt and TOKEN_SECRET
      const payload = jwt.verify(token, TOKEN_SECRET);

      // Attach decoded user info to req.user
      req.user = payload;

      // Call next() if successful
      next();
    } catch (error) {
      // Return error if token verification fails
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: "Invalid token" });
      } else if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: "Token expired" });
      } else {
        return res.status(500).json({ error: "Authentication failed" });
      }
    }
  }
}

export default AuthMiddlewares;