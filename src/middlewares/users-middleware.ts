import { NextFunction, Request, Response } from "express";
import { usersRepository } from "../repositories/users-db-repository";

export const hasUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {

  const email = req.body.email;
  const login = req.body.login;

  const getUserByLogin = await usersRepository.findByLogin(login);

  if (getUserByLogin) {
    return res.status(400).send({
      errorsMessages: [{
        message: "user already exist",
        field: "login"
      }],
    });
  }

  const getUserByEmail = await usersRepository.findUserByEmail(email);

  if (getUserByEmail) {
    return res.status(400).send({
      errorsMessages: [{
        message: "user already exist",
        field: "email"
      }],
    });
  }

  next();
}

export const isUserAlreadyConfirmedMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email;

  const getUserByEmail = await usersRepository.findUserByEmail(email);

  if (getUserByEmail && getUserByEmail.isConfirmed) {
    return res.status(400).send({
      errorsMessages: [{
        message: "user already confirmed email",
        field: "email"
      }]
    })
  }

  next();
  return;

}