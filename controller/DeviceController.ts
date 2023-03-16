/** @format */

import UserModel from "../Model/UserModel/UserModel";

import { NextFunction, Request, Response } from "express";
import { Idevice } from "../interface/DeviceInterface";
import DeviceModel from "../Model/DeviceModel/DeviceModel";
import { asyncHandler } from "../util/error/asynHandler/asynHandler";
import { AppError, HttpCode } from "../util/error/AppError/appError";

export const postTicket = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      ticketNumber,
      ticketPosition,
      deviceDetails,
      deviceType,
      numberOfDeviceBrought,
    } = req.body;

    const createTicket = await DeviceModel.create({
      ticketNumber,
      ticketPosition,
      deviceDetails,
      deviceType,
      numberOfDeviceBrought: numberOfDeviceBrought ? numberOfDeviceBrought : 0,
      pORb: ticketNumber.charAt(0).toUpperCase(),
    });

    const { email } = req.body;
    const findUser = await UserModel.findOne({ email });

    if (!findUser) {
      next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          message: "User not found",
        }),
      );
    }

    if (!createTicket) {
      next(
        new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          message: "Account Not Created",
        }),
      );
    }

    if (findUser?.role === "user") {
      next(
        new AppError({
          httpCode: HttpCode.UNAUTHORIZED,
          message: "You're not authorised",
        }),
      );
    }
    return res.status(HttpCode.CREATED).json({
      message: "successfully created Ticket",
      data: createTicket,
    });
  },
);

export const findOneDevice = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const findTheDevice = await DeviceModel.findById(req.params.deviceId);
    if (!findTheDevice) {
      next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          message: "Device Not Found",
        }),
      );
    }

    return res.status(HttpCode.NOT_FOUND).json({
      message: "Device Successfully found",
      data: findTheDevice,
    });
  },
);

export const getAllDevice = asyncHandler(
  async (req: Request, res: Response) => {
    const getAll = await DeviceModel.find();
    return res.status(HttpCode.OK).json({
      message: "Succefull",
      data: getAll,
    });
  },
);

export const querySearch = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const search = await DeviceModel.find(req.query);
    if (!search) {
      next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          message: req.query + "Not found",
        }),
      );
    }
    return res.status(HttpCode.OK).json({
      message: "Successfully gotten" + req.query,
      data: search,
    });
  },
);

export const updateDevice = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ticketNumber, ticketPosition, deviceDetails, deviceType } =
      req.body;
    const update = await DeviceModel.findByIdAndUpdate(
      req.params.id,
      {
        ticketNumber,
        ticketPosition,
        deviceDetails,
        deviceType,
      },
      { new: true },
    );

    if (!update) {
      next(
        new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          message: "Not Updated",
        }),
      );
    }

    return res.status(HttpCode.OK).json({
      message: "Successfully updated",
      data: update,
    });
  },
);
