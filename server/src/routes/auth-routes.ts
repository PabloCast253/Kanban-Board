import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET as string;
if (!SECRET_KEY) {
  throw new Error("Missing JWT_SECRET in environment variables.");
}

// Define the structure of the request body
interface LoginRequestBody {
  username: string;
  password: string;
}

export const login = async (req: Request<{}, {}, LoginRequestBody>, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Ensure username and password are provided
    if (!username || !password) {
      res.status(400).json({ message: "Username and password are required." });
      return;
    }

    // Check if the user exists in the database
    const user = await User.findOne({ where: { username } });

    if (!user) {
      res.status(401).json({ message: "Invalid username or password." });
      return;
    }

    // Compare provided password with the hashed password in the database
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      res.status(401).json({ message: "Invalid username or password." });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Send the token as a response
    res.status(200).json({ token });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;

