/** @format */

import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { AppError, HttpCode } from "../util/error/AppError/appError";
import { errorHandler } from "../util/errorHandler/errorHandler";
import userRouter from "../Routes/UserRoute";
import deviceRouter from "../Routes/DeviceRoute";

const appConfig = (app: Application) => {
  app
    .use(express.json())
    .use(cors())
    .use(morgan("dev")) // middleware Configuration

    // landing route
    .get("/", (req: Request, res: Response, next: NextFunction) => {
      return res.status(200).json({
        message: "Server is up an Runing 😊😊❗✔🚴‍♀️🚴‍♀️",
      });
    })
    // Post Request For User
    .use("/api", userRouter)

    .use("/api", deviceRouter) //  Post Request For Device

    // 404 Routes
    .all("*", (req: Request, res: Response, next: NextFunction) => {
      next(
        new AppError({
          message: `Opps!! Are You Lost??...This Route ${req.originalUrl} is Not Round`,
          httpCode: HttpCode.NOT_FOUND,
        })
      );
    })
    .use(errorHandler);
};

export default appConfig;
