import bcrypt from "bcryptjs";
import prisma from "../config/prisma.js";

export const selectServicesAndZones = async (req, res, next) => {
  try {
    const { serviceIds = [], zoneIds = [] } = req.body;
    const providerId = req.user.id;

    const provider = await prisma.user.findUnique({
      where: { id: providerId },
    });

    if (!provider || provider.role !== "PROVIDER") {
      res.status(403);
      throw new Error("Only providers can update services and zones");
    }

    const serviceRecords = serviceIds.length
      ? await prisma.service.findMany({
          where: { id: { in: serviceIds } },
          select: { id: true },
        })
      : [];

    const zoneRecords = zoneIds.length
      ? await prisma.zone.findMany({
          where: { id: { in: zoneIds } },
          select: { id: true },
        })
      : [];

    if (serviceIds.length !== serviceRecords.length) {
      res.status(400);
      throw new Error("One or more service IDs are invalid");
    }

    if (zoneIds.length !== zoneRecords.length) {
      res.status(400);
      throw new Error("One or more zone IDs are invalid");
    }

    await prisma.$transaction(async (tx) => {
      await tx.providerService.deleteMany({
        where: { providerId },
      });

      await tx.providerZone.deleteMany({
        where: { providerId },
      });

      if (serviceIds.length > 0) {
        await tx.providerService.createMany({
          data: serviceIds.map((serviceId) => ({
            providerId,
            serviceId,
          })),
          skipDuplicates: true,
        });
      }

      if (zoneIds.length > 0) {
        await tx.providerZone.createMany({
          data: zoneIds.map((zoneId) => ({
            providerId,
            zoneId,
          })),
          skipDuplicates: true,
        });
      }
    });

    const updatedProvider = await prisma.user.findUnique({
      where: { id: providerId },
      include: {
        providerServices: {
          include: { service: true },
        },
        providerZones: {
          include: { zone: true },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Services and zones updated successfully",
      data: {
        id: updatedProvider.id,
        name: updatedProvider.name,
        email: updatedProvider.email,
        role: updatedProvider.role,
        services: updatedProvider.providerServices.map((item) => item.service),
        zones: updatedProvider.providerZones.map((item) => item.zone),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createHandyman = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const providerId = req.user.id;
    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      res.status(409);
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const handyman = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: "HANDYMAN",
        providerId,
      },
    });

    res.status(201).json({
      success: true,
      message: "Handyman created successfully",
      data: {
        id: handyman.id,
        name: handyman.name,
        email: handyman.email,
        role: handyman.role,
        providerId: handyman.providerId,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        provider: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        handymen: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        providerServices: {
          include: { service: true },
        },
        providerZones: {
          include: { zone: true },
        },
      },
    });

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        providerId: user.providerId,
        provider: user.provider,
        handymen: user.handymen,
        services: user.providerServices.map((item) => item.service),
        zones: user.providerZones.map((item) => item.zone),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};