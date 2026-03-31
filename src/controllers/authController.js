import bcrypt from "bcryptjs";
import prisma from "../config/prisma.js";
import generateToken from "../utils/generateToken.js";

export const signupProvider = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      res.status(409);
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const provider = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: "PROVIDER",
      },
    });

    const token = generateToken(provider);

    res.status(201).json({
      success: true,
      message: "Provider registered successfully",
      token,
      user: {
        id: provider.id,
        name: provider.name,
        email: provider.email,
        role: provider.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        providerId: user.providerId,
      },
    });
  } catch (error) {
    next(error);
  }
};