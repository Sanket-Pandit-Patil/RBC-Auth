import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
      res.status(401);
      throw new Error("Unauthorized: token missing");
    }

    token = token.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        providerId: true,
      },
    });

    if (!user) {
      res.status(401);
      throw new Error("Unauthorized: user not found");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default protect;