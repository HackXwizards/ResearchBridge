import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getSession } from "../database/data.js";

export const signup = async (req, res) => {
  const session = getSession();
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const checkUserQuery = `
      MATCH (u:User {email: $email}) 
      RETURN u
    `;
    const existingUser = await session.run(checkUserQuery, { email });
    
    if (existingUser.records.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const createUserQuery = `
      CREATE (u:User {
        name: $name,
        email: $email,
        password: $password,
        createdAt: datetime()
      })
      RETURN u
    `;
    const result = await session.run(createUserQuery, {
      name,
      email,
      password: hashedPassword
    });

    const user = result.records[0].get("u").properties;
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ token, user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  } finally {
    session.close();
  }
};

export const login = async (req, res) => {
  const session = getSession();
  try {
    const { email, password } = req.body;

    const query = `
      MATCH (u:User {email: $email})
      RETURN u
    `;
    const result = await session.run(query, { email });

    if (result.records.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.records[0].get("u").properties;
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token, user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  } finally {
    session.close();
  }
};

export const getUserProfile = async (req, res) => {
  const session = getSession();
  try {
    const { email } = req.user;

    const query = `
      MATCH (u:User {email: $email})
      RETURN u
    `;
    const result = await session.run(query, { email });
    
    if (result.records.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.records[0].get("u").properties;
    delete user.password;

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error: error.message });
  } finally {
    session.close();
  }
};


export const logout = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(400).json({ error: "Token is required for logout" });
  }

  // Blacklist the token
  tokenBlacklist.add(token);
  res.status(200).json({ message: "Logged out successfully" });
};

