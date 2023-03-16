/** @format */

import { Request, Response, NextFunction } from "express";
import UserModel from "../Model/UserModel/UserModel";
import { IuserData } from "../interface/UserInterface";
import { asyncHandler } from "../util/error/asynHandler/asynHandler";
import bcrypt from "bcrypt";
import { AppError, HttpCode } from "../util/error/AppError/appError";

export const SignUpUser = asyncHandler(
  async (
    req: Request<{}, {}, IuserData>,
    res: Response,
    next: NextFunction,
  ) => {
    const { name, email, password, userName } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const createUser = await UserModel.create({
      name,
      email,
      userName,
      password: hashPassword,
    });

    if (!createUser) {
      next(
        new AppError({
          message: "Account Not Created",
          httpCode: HttpCode.BAD_REQUEST,
        }),
      );
    }

    return res.status(HttpCode.CREATED).json({
      message: "Account Created",
      data: createUser,
    });
  },
);

export const SignIn = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const login = await UserModel.findOne({ email });
    const comparePassword = await bcrypt.compare(password, login?.password!);

    if (!login || !comparePassword) {
      next(
        new AppError({
          message: "Account Not Found",
          httpCode: HttpCode.NOT_FOUND,
        }),
      );
    }

    return res.status(HttpCode.OK).json({
      message: "Successfully Login",
      data: login,
    });
  },
);

export const getOneUsUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const getUser = await UserModel.findById(req.params.id);
    if (!getUser) {
      next(
        new AppError({
          message: "User Not Found",
          httpCode: HttpCode.NOT_FOUND,
        }),
      );
    }

    return res.status(HttpCode.OK).json({
      message: "User Found",
      data: getUser,
    });
  },
);
