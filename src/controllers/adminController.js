import prisma from "../config/prisma.js";

export const createService = async (req, res, next) => {
  try {
    const { name } = req.body;
    const trimmedName = name.trim();

    const existingService = await prisma.service.findUnique({
      where: { name: trimmedName },
    });

    if (existingService) {
      res.status(409);
      throw new Error("Service already exists");
    }

    const service = await prisma.service.create({
      data: { name: trimmedName },
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

export const createZone = async (req, res, next) => {
  try {
    const { name } = req.body;
    const trimmedName = name.trim();

    const existingZone = await prisma.zone.findUnique({
      where: { name: trimmedName },
    });

    if (existingZone) {
      res.status(409);
      throw new Error("Zone already exists");
    }

    const zone = await prisma.zone.create({
      data: { name: trimmedName },
    });

    res.status(201).json({
      success: true,
      message: "Zone created successfully",
      data: zone,
    });
  } catch (error) {
    next(error);
  }
};