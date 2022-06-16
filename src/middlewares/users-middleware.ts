import { NextFunction, Request, Response } from "express";
import { usersRepository } from "../repositories/users-db-repository";

export const hasUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {

  const errors = [];

  const email = req.body.email;
  const login = req.body.login;

  const getUserByLogin = await usersRepository.findByLogin(login);
  const getUserByEmail = await usersRepository.findUserByEmail(email);

  if (getUserByLogin) {
    errors.push({
      message: "user already exist",
      field: "login"
    })
  }

  if (getUserByEmail) {
    errors.push({
      message: "user already exist",
      field: "email"
    })
  }

  if (errors.length > 0) {
    res.status(400).json({
      errorsMessages: errors,
    }).send();
    return;
  }


  next();
}

export const isUserAlreadyConfirmedMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email;

  const getUserByEmail = await usersRepository.findUserByEmail(email);

  if (!getUserByEmail || !getUserByEmail.confirmCode) {
    next();
    return;
  }

  return res.status(400).json({
    errorsMessages: {
      message: "user already exist",
      field: "email"
    }
  }).send()

}